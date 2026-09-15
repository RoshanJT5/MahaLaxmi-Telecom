'use client';

// Production asset pipeline for the scroll flythrough.
// - First paint asset (Mahalaxmi logo) is preloaded before the loader UI appears.
// - Flythrough frames ship as 6 spritesheets per variant; bytes are streamed with
//   real progress and persisted in Cache Storage, so repeat visits never
//   re-download them (only decode on demand with a ±1 sheet memory window).

export interface SheetInfo {
  file: string;
  start: number;
  count: number;
}

export interface SheetManifest {
  cellW: number;
  cellH: number;
  cols: number;
  rows: number;
  total: number;
  sheets: SheetInfo[];
}

export interface FlyManifest {
  desktop: SheetManifest;
  mobile: SheetManifest;
}

export type Variant = 'desktop' | 'mobile';

export interface Slice {
  img: HTMLImageElement;
  sx: number;
  sy: number;
  sw: number;
  sh: number;
}

const CACHE_NAME = 'mahalaxmi-assets-v1';
const MANIFEST_URL = '/page-section2/sheets/manifest.json';
const SHEET_BASE = '/page-section2/';
const LOGO_URL = '/mahalaxmi-logo.png';
export const ZERO_URL = '/store_img.png';
const HERO_URLS = [
  '/page-section1/hero-store.jpg',
  '/page-section1/products.jpg',
  '/page-section1/accessories.jpg',
  '/page-section1/store-detail.jpg',
  '/page-section1/store-hero.jpg',
];

export const detectVariant = (): Variant =>
  typeof window !== 'undefined' &&
  window.matchMedia('(max-width: 860px), (pointer: coarse)').matches
    ? 'mobile'
    : 'desktop';

const getCache = async (): Promise<Cache | null> => {
  try {
    if (typeof caches !== 'undefined') return await caches.open(CACHE_NAME);
  } catch {
    /* storage unavailable (private mode) — fall through to network */
  }
  return null;
};

const decodeBlob = (buffer: ArrayBuffer, mime = 'image/jpeg'): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const url = URL.createObjectURL(new Blob([buffer], { type: mime }));
    const im = new Image();
    im.onload = () => {
      URL.revokeObjectURL(url);
      resolve(im);
    };
    im.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('decode failed'));
    };
    im.src = url;
  });

const decodeImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const im = new Image();
    im.onload = () => resolve(im);
    im.onerror = () => reject(new Error(`decode failed: ${src}`));
    im.src = src;
  });

/** First-paint asset: the Mahalaxmi logo shown on the loading screen. */
export const preloadLogo = async (): Promise<void> => {
  try {
    await decodeImage(LOGO_URL);
  } catch {
    /* loader still shows (text lockup renders regardless) */
  }
};

type ByteState = { loaded: number; total: number };

async function fetchBytes(
  url: string,
  cache: Cache | null,
  onBytes: (loaded: number, total: number | null) => void,
): Promise<ArrayBuffer> {
  try {
    const hit = await cache?.match(url);
    if (hit) {
      const buffer = await hit.arrayBuffer();
      onBytes(buffer.byteLength, buffer.byteLength);
      return buffer;
    }
  } catch {
    /* ignore cache errors */
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error(`fetch failed: ${url}`);
  const total = Number(res.headers.get('content-length')) || 0;
  if (!res.body) {
    const buffer = await res.arrayBuffer();
    onBytes(buffer.byteLength, buffer.byteLength);
    return buffer;
  }
  const reader = res.body.getReader();
  const chunks: Uint8Array[] = [];
  let loaded = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) {
      chunks.push(value);
      loaded += value.byteLength;
      onBytes(loaded, total || null);
    }
  }
  const merged = new Uint8Array(loaded);
  let off = 0;
  for (const c of chunks) {
    merged.set(c, off);
    off += c.byteLength;
  }
  const buffer = merged.buffer as ArrayBuffer;
  try {
    await cache?.put(
      url,
      new Response(buffer.slice(0), { headers: { 'content-length': String(loaded) } }),
    );
  } catch {
    /* quota / private mode — page still works, just refetches */
  }
  onBytes(loaded, loaded);
  return buffer;
}

async function fetchGroup(
  urls: string[],
  cache: Cache | null,
  estimate: number,
  onGroup: (fraction: number) => void,
): Promise<Map<string, ArrayBuffer>> {
  const state = new Map<string, ByteState>(urls.map((u) => [u, { loaded: 0, total: 0 }]));
  const emit = () => {
    let loaded = 0;
    let total = 0;
    for (const [, s] of state) {
      loaded += s.loaded;
      total += s.total || estimate;
    }
    onGroup(total > 0 ? Math.min(1, loaded / total) : 0);
  };
  const results = new Map<string, ArrayBuffer>();
  await Promise.all(
    urls.map(async (url) => {
      const st = state.get(url)!;
      const buffer = await fetchBytes(url, cache, (l, t) => {
        st.loaded = l;
        st.total = t || estimate;
        emit();
      });
      results.set(url, buffer);
      emit();
    }),
  );
  return results;
}

class SheetStore {
  manifest: FlyManifest | null = null;
  variant: Variant = 'desktop';
  zeroImg: HTMLImageElement | null = null;
  sheetBuffers = new Map<string, ArrayBuffer>();
  private sheetImgs = new Map<number, HTMLImageElement>();
  private sheetTasks = new Map<number, Promise<HTMLImageElement>>();
  private lastServed = 0;
  private readyPromise: Promise<void> | null = null;

  ensure(variant: Variant, onProgress?: (fraction: number) => void): Promise<void> {
    this.variant = variant;
    if (!this.readyPromise) this.readyPromise = this.run(variant, onProgress ?? (() => {}));
    return this.readyPromise;
  }

  get ready(): Promise<void> | null {
    return this.readyPromise;
  }

  get flyTotal(): number {
    return this.manifest?.[this.variant].total ?? 0;
  }

  private async run(variant: Variant, onProgress: (fraction: number) => void): Promise<void> {
    const emit = (p: number) => onProgress(Math.max(0, Math.min(1, p)));
    const cache = await getCache();

    const manifest: FlyManifest = await (await fetch(MANIFEST_URL)).json();
    this.manifest = manifest;
    emit(0.04);

    const m = manifest[variant];
    const sheetUrls = m.sheets.map((s) => SHEET_BASE + s.file);
    const sheetBufs = await fetchGroup(sheetUrls, cache, 2_000_000, (f) => emit(0.04 + f * 0.62));
    for (const [url, buf] of sheetBufs) this.sheetBuffers.set(url, buf);

    const smallUrls = [ZERO_URL, ...HERO_URLS];
    const smallBufs = await fetchGroup(smallUrls, cache, 250_000, (f) => emit(0.66 + f * 0.26));

    const zeroBuf = smallBufs.get(ZERO_URL);
    if (zeroBuf) {
      try {
        this.zeroImg = await decodeBlob(zeroBuf);
      } catch {
        this.zeroImg = null;
      }
    }
    // Decode sheet 0 now so first scroll paints instantly; the rest decode on demand.
    try {
      await this.ensureSheet(0);
    } catch {
      /* sheets decode lazily at runtime */
    }
    await Promise.all(
      HERO_URLS.map(async (u) => {
        const buf = smallBufs.get(u);
        if (buf) {
          try {
            await decodeBlob(buf);
          } catch {
            /* non-fatal */
          }
        }
      }),
    );
    emit(1);
  }

  private sheetUrl(index: number): string | null {
    const m = this.manifest?.[this.variant];
    const info = m?.sheets[index];
    return info ? SHEET_BASE + info.file : null;
  }

  private async decodeFromBuffer(url: string): Promise<HTMLImageElement> {
    const buf = this.sheetBuffers.get(url);
    if (buf) return decodeBlob(buf);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`sheet fetch failed: ${url}`);
    return decodeBlob(await res.arrayBuffer());
  }

  ensureSheet(index: number): Promise<HTMLImageElement> | null {
    const url = this.sheetUrl(index);
    if (!url) return null;
    const have = this.sheetImgs.get(index);
    if (have) return Promise.resolve(have);
    const pending = this.sheetTasks.get(index);
    if (pending) return pending;
    const task = this.decodeFromBuffer(url)
      .then((img) => {
        this.sheetTasks.delete(index);
        this.sheetImgs.set(index, img);
        if (Math.abs(index - this.lastServed) > 1) this.evict(index);
        return img;
      })
      .catch((err) => {
        this.sheetTasks.delete(index);
        throw err;
      });
    this.sheetTasks.set(index, task);
    return task;
  }

  private evict(except: number): void {
    for (const [key, img] of this.sheetImgs) {
      if (Math.abs(key - except) > 1) {
        try {
          img.src = '';
        } catch {
          /* noop */
        }
        this.sheetImgs.delete(key);
      }
    }
  }

  /** Sheet index containing a flythrough frame, or null if out of range. */
  sheetIndexOf(flyIndex: number): number | null {
    const m = this.manifest?.[this.variant];
    if (!m || flyIndex < 0 || flyIndex >= m.total) return null;
    for (let i = 0; i < m.sheets.length; i++) {
      const info = m.sheets[i];
      if (flyIndex >= info.start && flyIndex < info.start + info.count) return i;
    }
    return null;
  }

  /** Synchronous slice for a flythrough frame index (0-based into the sheet set). */
  getSlice(flyIndex: number): Slice | null {
    const m = this.manifest?.[this.variant];
    if (!m || flyIndex < 0 || flyIndex >= m.total) return null;
    let sheet = 0;
    for (let i = 0; i < m.sheets.length; i++) {
      const info = m.sheets[i];
      if (flyIndex >= info.start && flyIndex < info.start + info.count) {
        sheet = i;
        break;
      }
    }
    const info = m.sheets[sheet];
    const local = flyIndex - info.start;
    const col = local % m.cols;
    const row = Math.floor(local / m.cols);
    const img = this.sheetImgs.get(sheet);
    if (!img) {
      this.ensureSheet(sheet);
      this.ensureSheet(sheet + 1);
      return null;
    }
    this.lastServed = sheet;
    this.ensureSheet(sheet + 1);
    this.evict(sheet);
    return { img, sx: col * m.cellW, sy: row * m.cellH, sw: m.cellW, sh: m.cellH };
  }
}

export const sheetStore = new SheetStore();

export function drawCoverSlice(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  slice: Slice,
): void {
  const cw = canvas.width;
  const ch = canvas.height;
  if (!cw || !ch) return;
  const k = Math.max(cw / slice.sw, ch / slice.sh);
  const dw = slice.sw * k;
  const dh = slice.sh * k;
  ctx.drawImage(slice.img, slice.sx, slice.sy, slice.sw, slice.sh, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
}
