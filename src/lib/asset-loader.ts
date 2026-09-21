'use client';

// Full-HD WebP frames extracted directly from the source video. A small group
// is decoded for first paint; remaining bytes are cached in the background.
export type Variant = 'desktop' | 'mobile';

export interface Slice {
  img: HTMLImageElement;
  sx: number;
  sy: number;
  sw: number;
  sh: number;
}

interface FrameManifest {
  total: number;
  width: number;
  height: number;
}

const CACHE_NAME = 'mahalaxmi-flythrough-hd-v1';
const MANIFEST_URL = '/page-section2/hires/manifest.json';
const FRAME_BASE = '/page-section2/hires/';
const LOGO_URL = '/mahalaxmi-logo.png';
export const ZERO_URL = `${FRAME_BASE}frame-000.webp`;
const HERO_URLS = [
  '/page-section1/hero-store.jpg',
  '/page-section1/products.jpg',
  '/page-section1/accessories.jpg',
  '/page-section1/store-detail.jpg',
  '/page-section1/store-hero.jpg',
];

export const detectVariant = (): Variant =>
  typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
    ? 'mobile'
    : 'desktop';

const frameUrl = (index: number) => `${FRAME_BASE}frame-${String(index).padStart(3, '0')}.webp`;

const getCache = async (): Promise<Cache | null> => {
  try {
    return typeof caches === 'undefined' ? null : await caches.open(CACHE_NAME);
  } catch {
    return null;
  }
};

async function fetchBytes(url: string, cache: Cache | null): Promise<ArrayBuffer> {
  try {
    const hit = await cache?.match(url);
    if (hit) return hit.arrayBuffer();
  } catch {
    // Private browsing can disable Cache Storage.
  }

  const response = await fetch(url);
  if (!response.ok) throw new Error(`Asset fetch failed: ${url}`);
  const bytes = await response.arrayBuffer();
  try {
    await cache?.put(url, new Response(bytes.slice(0)));
  } catch {
    // The in-memory bytes remain usable if the device has no cache quota.
  }
  return bytes;
}

const decodeBlob = (bytes: ArrayBuffer): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const url = URL.createObjectURL(new Blob([bytes], { type: 'image/webp' }));
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Frame decode failed'));
    };
    image.src = url;
  });

export const preloadLogo = async (): Promise<void> => {
  try {
    await new Promise<void>((resolve) => {
      const image = new Image();
      image.onload = image.onerror = () => resolve();
      image.src = LOGO_URL;
    });
  } catch {
    // The text lockup is still available if the logo is offline.
  }
};

class FrameStore {
  private manifest: FrameManifest | null = null;
  private cache: Cache | null = null;
  private buffers = new Map<number, ArrayBuffer>();
  private bufferTasks = new Map<number, Promise<ArrayBuffer>>();
  private images = new Map<number, HTMLImageElement>();
  private imageTasks = new Map<number, Promise<HTMLImageElement>>();
  private readyPromise: Promise<void> | null = null;
  zeroImg: HTMLImageElement | null = null;

  get flyTotal(): number {
    return this.manifest?.total ?? 0;
  }

  get frameSize(): { width: number; height: number } {
    return this.manifest
      ? { width: this.manifest.width, height: this.manifest.height }
      : { width: 1920, height: 1080 };
  }

  ensure(variant: Variant = 'desktop', onProgress: (fraction: number) => void = () => {}): Promise<void> {
    if (!this.readyPromise) {
      this.readyPromise = this.start(variant, onProgress).catch((error) => {
        this.readyPromise = null;
        throw error;
      });
    }
    return this.readyPromise;
  }

  private async start(variant: Variant, onProgress: (fraction: number) => void): Promise<void> {
    this.cache = await getCache();

    if (variant === 'mobile') {
      try {
        const [zeroBytes] = await Promise.all([
          fetchBytes(ZERO_URL, this.cache),
          ...HERO_URLS.map((url) => fetchBytes(url, this.cache).catch(() => null)),
        ]);
        if (zeroBytes) this.zeroImg = await decodeBlob(zeroBytes);
      } catch {
        /* non-fatal */
      }
      onProgress(1);
      return;
    }

    const response = await fetch(MANIFEST_URL);
    if (!response.ok) throw new Error('Flythrough manifest unavailable');
    this.manifest = (await response.json()) as FrameManifest;
    if (!this.manifest.total || this.manifest.width < 1 || this.manifest.height < 1) {
      throw new Error('Invalid flythrough manifest');
    }
    onProgress(0.08);

    const initial = Math.min(12, this.manifest.total);
    let fetched = 0;
    await Promise.all(Array.from({ length: initial }, (_, index) =>
      this.getBuffer(index).then(() => onProgress(0.08 + (++fetched / initial) * 0.67)),
    ));
    const openingFrame = this.ensureFrame(0);
    if (openingFrame) this.zeroImg = await openingFrame;
    await Promise.all(HERO_URLS.map((url) => fetchBytes(url, this.cache).catch(() => null)));
    onProgress(1);

    // Fetch compressed bytes while the visitor reads the opening sections.
    // Decoding stays limited to nearby frames to protect mobile memory.
    void this.prefetchRemaining(initial);
  }

  private async prefetchRemaining(start: number): Promise<void> {
    let next = start;
    const worker = async () => {
      while (next < this.flyTotal) {
        const index = next++;
        try {
          await this.getBuffer(index);
        } catch {
          // On-demand loading retries frames that failed in the background.
        }
      }
    };
    await Promise.all(Array.from({ length: 3 }, worker));
  }

  private getBuffer(index: number): Promise<ArrayBuffer> {
    if (index < 0 || index >= this.flyTotal) return Promise.reject(new Error('Frame out of range'));
    const existing = this.buffers.get(index);
    if (existing) return Promise.resolve(existing);
    const pending = this.bufferTasks.get(index);
    if (pending) return pending;
    const task = fetchBytes(frameUrl(index), this.cache)
      .then((bytes) => {
        this.bufferTasks.delete(index);
        this.buffers.set(index, bytes);
        return bytes;
      })
      .catch((error) => {
        this.bufferTasks.delete(index);
        throw error;
      });
    this.bufferTasks.set(index, task);
    return task;
  }

  ensureFrame(index: number): Promise<HTMLImageElement> | null {
    if (index < 0 || index >= this.flyTotal) return null;
    const image = this.images.get(index);
    if (image) return Promise.resolve(image);
    const pending = this.imageTasks.get(index);
    if (pending) return pending;
    const task = this.getBuffer(index)
      .then(decodeBlob)
      .then((decoded) => {
        this.imageTasks.delete(index);
        this.images.set(index, decoded);
        return decoded;
      })
      .catch((error) => {
        this.imageTasks.delete(index);
        throw error;
      });
    this.imageTasks.set(index, task);
    return task;
  }

  private evict(current: number): void {
    for (const [index, image] of this.images) {
      if (index !== 0 && Math.abs(index - current) > 5) {
        image.src = '';
        this.images.delete(index);
      }
    }
  }

  getSlice(frameIndex: number): Slice | null {
    if (frameIndex < 0 || frameIndex >= this.flyTotal || !this.manifest) return null;
    const image = this.images.get(frameIndex);
    if (!image) {
      void this.ensureFrame(frameIndex)?.catch(() => {});
      return null;
    }
    for (let offset = -2; offset <= 4; offset++) {
      if (offset !== 0) void this.ensureFrame(frameIndex + offset)?.catch(() => {});
    }
    this.evict(frameIndex);
    return { img: image, sx: 0, sy: 0, sw: this.manifest.width, sh: this.manifest.height };
  }
}

export const frameStore = new FrameStore();

export function drawFrameSlice(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  slice: Slice,
  containInUpperArea = false,
): void {
  const cw = canvas.width;
  const ch = canvas.height;
  if (!cw || !ch) return;
  ctx.fillStyle = containInUpperArea ? '#302923' : '#0a0a0b';
  ctx.fillRect(0, 0, cw, ch);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  const imageAreaHeight = containInUpperArea ? ch * 0.58 : ch;
  const scale = containInUpperArea
    ? Math.min(cw / slice.sw, imageAreaHeight / slice.sh)
    : Math.max(cw / slice.sw, ch / slice.sh);
  const width = slice.sw * scale;
  const height = slice.sh * scale;
  ctx.drawImage(slice.img, slice.sx, slice.sy, slice.sw, slice.sh,
    (cw - width) / 2, (imageAreaHeight - height) / 2, width, height);
}
