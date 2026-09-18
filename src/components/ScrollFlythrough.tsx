'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './ScrollFlythrough.module.css';
import {
  frameStore,
  detectVariant,
  drawFrameSlice,
  ZERO_URL,
  type Slice,
  type Variant,
} from '@/lib/asset-loader';

const GROW_FRAMES = 5;
const ZERO_SRC = ZERO_URL;
// First 6 frames (0-5) dwell over this share of scroll so the
// image-div -> fullscreen grow is actually visible (not 90px).
const GROW_SPLIT = 0.22;
const frameFloatFromP = (p: number, count: number) => {
  const c = Math.max(0, Math.min(1, p));
  if (c <= GROW_SPLIT) return (c / GROW_SPLIT) * GROW_FRAMES;
  return GROW_FRAMES + ((c - GROW_SPLIT) / (1 - GROW_SPLIT)) * (count - 1 - GROW_FRAMES);
};

const BEATS = [  { eyebrow: 'From the street', title: 'It starts outside.', body: 'Jagyasi Mobiles by Mahalaxmi Telecom — evening lights on, doors open.', tags: ['Flagship Store', 'Nandurbar'] },
  { eyebrow: 'Step closer', title: 'Glass doors, warm light.', body: 'Keep scrolling — the camera glides straight through the entrance.', tags: ['Physical-first'] },
  { eyebrow: 'Inside the showroom', title: 'Every screen, live.', body: 'Samsung, LG, Sony walls — test everything before you buy.', tags: ['Samsung', 'LG', 'Sony'] },
  { eyebrow: 'Take your time', title: 'Sit. Compare. Decide.', body: 'Lounge seating, honest advice, no rush — this is retail that breathes.', tags: ['Hands-on', 'No Targets'] },
  { eyebrow: 'Your turn', title: 'Come walk it for real.', body: 'Or bring this trusted format to your town as a franchise partner.', tags: [], cta: true },
];

export default function ScrollFlythrough({ embedded = false, takeover = false }: { embedded?: boolean; takeover?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const variant: Variant = detectVariant();
    let mobile = variant === 'mobile';
    let stacked = window.matchMedia('(max-width: 1100px)').matches;
    // Display idx 0 = the opening still; idx d>0 = video frame d-1.
    let count = 256;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let lastSlice: Slice | null = null;
    let showingZero = true;
    let zeroImg: HTMLImageElement | null = frameStore.zeroImg;
    const containFrame = () => mobile || (takeover && stacked);
    const drawCover = (img: HTMLImageElement) => {
      if (!img.naturalWidth) return;
      drawFrameSlice(ctx, canvas, {
        img, sx: 0, sy: 0, sw: img.naturalWidth, sh: img.naturalHeight,
      }, containFrame());
      showingZero = true;
      lastSlice = null;
    };
    const redraw = () => {
      if (showingZero) {
        if (zeroImg?.naturalWidth) drawCover(zeroImg);
      } else if (lastSlice) {
        drawFrameSlice(ctx, canvas, lastSlice, containFrame());
      }
    };
    const sizeCanvas = () => {
      // Canvas fills the morph stage; clientWidth is unaffected by layout,
      // so the backing store tracks the stage exactly as it grows.
      const w = canvas.clientWidth || canvas.getBoundingClientRect().width;
      const h = canvas.clientHeight || canvas.getBoundingClientRect().height;
      const deviceDpr = window.devicePixelRatio || 1;
      const { width: frameWidth, height: frameHeight } = frameStore.frameSize;
      // Rendering past the source resolution upscales the frame, then the
      // browser downsamples the canvas again. This matters on high-density
      // desktop and mobile screens, especially now that both use cover.
      const sourceDpr = Math.max(1, Math.min(frameWidth / Math.max(1, w), frameHeight / Math.max(1, h)));
      const dpr = Math.min(deviceDpr, sourceDpr, mobile ? 2.5 : Number.POSITIVE_INFINITY);
      const W = Math.max(2, Math.round(w * dpr));
      const H = Math.max(2, Math.round(h * dpr));
      if (canvas.width !== W || canvas.height !== H) {
        canvas.width = W;
        canvas.height = H;
        redraw();
      }
    };
    sizeCanvas();
    window.addEventListener('resize', sizeCanvas);

    let target = 0;
    let current = -1;
    let raf = 0;
    let paintedIndex = -1;
    type StartRect = { l: number; t: number; w: number; h: number; r: number };
    let start: StartRect | null = null;
    let placed = false;
    const getSource = () => document.querySelector<HTMLElement>('#about-zero-frame');
    const captureStart = (): StartRect | null => {
      const fallback = (): StartRect => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        return { l: vw * 0.1, t: vh * 0.15, w: vw * 0.8, h: vh * 0.7, r: 28 };
      };
      const src = getSource();
      if (src) {
        const b = src.getBoundingClientRect();
        if (b.width > 2 && b.height > 2 && b.top > -window.innerHeight && b.top < window.innerHeight) {
          let r = 3;
          try { r = parseFloat(getComputedStyle(src).borderRadius) || 3; } catch { /* noop */ }
          start = { l: b.left, t: b.top, w: b.width, h: b.height, r };
          return start;
        }
      }
      start = fallback();
      return start;
    };
    const placeWrap = () => {
      if (placed || !takeover) return;
      // The first flythrough frame is the still image on stacked layouts.
      // Keep its section after the company copy without desktop overlap.
      if (stacked) {
        wrap.style.marginTop = '0px';
        placed = true;
        return;
      }
      const src = getSource();
      if (!src) return;
      if (wrap.getBoundingClientRect().top < window.innerHeight) return;
      const gap = wrap.getBoundingClientRect().top - src.getBoundingClientRect().top;
      const cur = parseFloat(getComputedStyle(wrap).marginTop) || 0;
      const m = Math.max(0, gap - cur + window.innerHeight * 0.12);
      wrap.style.marginTop = `${Math.round(-m)}px`;
      placed = true;
    };
    const setSourceHidden = (hidden: boolean) => {
      const src = getSource();
      if (!src) return;
      src.style.transition = 'opacity .25s linear';
      src.style.opacity = hidden ? '0' : '1';
    };
    type Phase = 'before' | 'pinned' | 'after';
    const getPhase = (): Phase => {
      const rect = wrap.getBoundingClientRect();
      if (rect.top > 0) return 'before';
      if (rect.bottom >= window.innerHeight) return 'pinned';
      return 'after';
    };
    const layoutStage = (frameFloat: number, phase: Phase) => {
      const stage = stageRef.current;
      const sticky = stickyRef.current;
      if (!takeover || !stage || !sticky) return;
      if (stacked) {
        // Keep frame zero visible as this section enters, then reveal the
        // scroll copy only once the sticky animation reaches the viewport.
        stage.style.opacity = '1';
        stage.style.left = '0px';
        stage.style.top = '0px';
        stage.style.width = `${(sticky.clientWidth || window.innerWidth).toFixed(1)}px`;
        stage.style.height = `${(sticky.clientHeight || window.innerHeight).toFixed(1)}px`;
        stage.style.borderRadius = '0px';
        stage.style.pointerEvents = phase === 'before' ? 'none' : 'auto';
        setSourceHidden(false);
        if (copyRef.current) {
          copyRef.current.style.opacity = phase === 'before' ? '0' : '1';
          copyRef.current.style.transform = 'translateY(0px)';
        }
        sizeCanvas();
        return;
      }
      if (phase === 'before') {
        stage.style.opacity = '0';
        stage.style.pointerEvents = 'none';
        start = null;
        setSourceHidden(false);
        if (copyRef.current) copyRef.current.style.opacity = '0';
        return;
      }
      if (phase === 'after') {
        const vw = sticky.clientWidth || window.innerWidth;
        const vh = sticky.clientHeight || window.innerHeight;
        stage.style.opacity = '1';
        stage.style.left = '0px';
        stage.style.top = '0px';
        stage.style.width = `${vw.toFixed(1)}px`;
        stage.style.height = `${vh.toFixed(1)}px`;
        stage.style.borderRadius = '0px';
        stage.style.pointerEvents = 'auto';
        setSourceHidden(true);
        if (copyRef.current) {
          copyRef.current.style.opacity = '1';
          copyRef.current.style.transform = 'translateY(0px)';
        }
        sizeCanvas();
        return;
      }
      const s = start ?? captureStart();
      if (!s) return;
      const vw = sticky.clientWidth || window.innerWidth;
      const vh = sticky.clientHeight || window.innerHeight;
      const g = reduced ? 1 : Math.max(0, Math.min(1, frameFloat / GROW_FRAMES));
      const e = g * g * (3 - 2 * g);
      stage.style.opacity = '1';
      stage.style.left = `${(s.l + (0 - s.l) * e).toFixed(1)}px`;
      stage.style.top = `${(s.t + (0 - s.t) * e).toFixed(1)}px`;
      stage.style.width = `${(s.w + (vw - s.w) * e).toFixed(1)}px`;
      stage.style.height = `${(s.h + (vh - s.h) * e).toFixed(1)}px`;
      stage.style.borderRadius = `${Math.round(s.r * (1 - e))}px`;
      stage.style.pointerEvents = e > 0.9 ? 'auto' : 'none';
      setSourceHidden(true);
      if (copyRef.current) {
        const reveal = Math.max(0, Math.min(1, (e - 0.55) / 0.45));
        copyRef.current.style.opacity = reveal.toFixed(3);
        copyRef.current.style.transform = `translateY(${Math.round((1 - reveal) * 18)}px)`;
      }
      sizeCanvas();
    };
    let phaseCache: Phase = 'before';
    const drawFrame = (idx: number) => {
      if (idx === paintedIndex) return;
      if (idx === 0) {
        if (zeroImg?.complete && zeroImg.naturalWidth) {
          showingZero = true;
          lastSlice = null;
          drawCover(zeroImg);
          paintedIndex = idx;
        }
        return;
      }
      const slice = frameStore.getSlice(idx - 1);
      if (slice) {
        showingZero = false;
        lastSlice = slice;
        drawFrameSlice(ctx, canvas, slice, containFrame());
        paintedIndex = idx;
        return;
      }
      // Frame still decoding — paint it the moment it arrives, if still current.
      const wanted = idx;
      frameStore
        .ensureFrame(idx - 1)
        ?.then(() => {
          if (Math.round(frameFloatFromP(current, count)) !== wanted) return;
          const s2 = frameStore.getSlice(wanted - 1);
          if (s2) {
            showingZero = false;
            lastSlice = s2;
            drawFrameSlice(ctx, canvas, s2, containFrame());
            paintedIndex = wanted;
          }
        })
        .catch(() => {});
    };
    const render = () => {
      raf = 0;
      if (Math.abs(target - current) < 0.0005) {
        current = target;
        const finalFrame = frameFloatFromP(current, count);
        drawFrame(Math.max(0, Math.min(count - 1, Math.round(finalFrame))));
        return;
      }
      current += (target - current) * 0.16;
      const frameFloat = frameFloatFromP(current, count);
      const idx = Math.max(0, Math.min(count - 1, Math.round(frameFloat)));
      layoutStage(frameFloat, phaseCache);
      drawFrame(idx);
      const beat = Math.min(BEATS.length - 1, Math.floor((idx / (count - 1)) * BEATS.length));
      setActive((p) => (p === beat ? p : beat));
      raf = requestAnimationFrame(render);
    };

    const requestRender = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };

    const onScroll = () => {
      placeWrap();
      const rect = wrap.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total <= 0 ? 0 : Math.max(0, Math.min(1, -rect.top / total));
      target = p;
      requestRender();
      if (takeover) {
        phaseCache = getPhase();
        layoutStage(frameFloatFromP(p, count), phaseCache);
      }
    };

    (async () => {
      setLoaded(5);
      try {
        // Shares the home-page preload (no double download); runs it standalone otherwise.
        await frameStore.ensure(variant);
      } catch {
        /* sheets decode lazily at runtime */
      }
      count = frameStore.flyTotal > 0 ? frameStore.flyTotal + 1 : count;
      if (!zeroImg || !zeroImg.naturalWidth) {
        const fromStore = frameStore.zeroImg;
        if (fromStore?.naturalWidth) {
          zeroImg = fromStore;
        } else {
          await new Promise<void>((res) => {
            if (!zeroImg) return res();
            if (zeroImg.complete && zeroImg.naturalWidth) return res();
            zeroImg.onload = () => res();
            zeroImg.onerror = () => res();
          });
        }
      }
      if (zeroImg?.naturalWidth) {
        showingZero = true;
        drawCover(zeroImg);
      }
      setLoaded(100);
      setReady(true);
      placeWrap();
      onScroll();
      current = target;
      const ff0 = frameFloatFromP(current, count);
      drawFrame(Math.round(ff0));
      layoutStage(ff0, phaseCache);
      requestRender();
    })();

    window.addEventListener('scroll', onScroll, { passive: true });
    const onResize = () => {
      mobile = detectVariant() === 'mobile';
      stacked = window.matchMedia('(max-width: 1100px)').matches;
      placed = false;
      placeWrap();
      sizeCanvas();
      redraw();
      onScroll();
    };
    window.addEventListener('resize', onResize);
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && stageRef.current) {
      ro = new ResizeObserver(() => sizeCanvas());
      ro.observe(stageRef.current);
    }
    onScroll();
    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', sizeCanvas);
      window.removeEventListener('resize', onResize);
      setSourceHidden(false);
    };
  }, [embedded, takeover]);

  if (takeover) {
    return (
      <div ref={wrapRef} className={styles.takeoverWrap}>
        <div ref={stickyRef} className={styles.takeoverSticky}>
          {/* Desktop grows from #about-zero-frame; stacked layouts use this
              opening frame as the sole storefront image. */}
          <div ref={stageRef} className={styles.morphStage}>
          <canvas ref={canvasRef} className={ready ? styles.canvasOn : styles.canvas} aria-label="Scroll-driven flythrough of Jagyasi Mobiles store" />
          {/* Zeroth frame — same asset as the image div above, so frame 0 matches exactly */}
          <img src={ZERO_SRC} alt="" className={styles.poster} aria-hidden="true" style={{ opacity: ready ? 0 : 1, transition: 'opacity .7s ease' }} />
          <div className={styles.scrim} aria-hidden="true" />
          <div className={styles.progress} aria-hidden="true">
            <span style={{ transform: `scaleX(${loaded / 100})` }} />
          </div>
          <div className={styles.rail} aria-hidden="true">
            {BEATS.map((_, i) => (
              <span key={i} className={i <= active ? styles.dotOn : styles.dot} />
            ))}
          </div>
          <div ref={copyRef} className={styles.copy} style={{ opacity: 0 }}>
            <p className={styles.kicker}>Keep scrolling — walking you in · {loaded}% ready</p>
            {BEATS.map((b, i) => (
              <div key={b.title} className={i === active ? styles.beatOn : styles.beat}>
                <p className={styles.eyebrow}>{b.eyebrow}</p>
                <h2 className={styles.title}>{b.title}</h2>
                <p className={styles.body}>{b.body}</p>
                {b.tags.length > 0 && (
                  <div className={styles.tags}>
                    {b.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                )}
                {b.cta && (
                  <div className={styles.ctaRow}>
                    <a href="/franchise" className={styles.ctaPrimary}>Open a franchise</a>
                    <a href="/brands" className={styles.ctaGhost}>Explore brands</a>
                  </div>
                )}
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
    );
  }

  if (embedded) {
    return (
      <div ref={wrapRef} className={styles.embedWrap}>
        <canvas ref={canvasRef} className={styles.embedCanvas} aria-label="Scroll-driven flythrough of Jagyasi Mobiles store" />
        {!ready && <img src={ZERO_SRC} alt="" className={styles.embedPoster} aria-hidden="true" />}
      </div>
    );
  }

  return (
    <div ref={wrapRef} className={styles.wrap} id="flythrough">
      <div className={styles.sticky}>
        <canvas ref={canvasRef} className={styles.canvas} aria-label="Scroll-driven flythrough of Jagyasi Mobiles store" />
        {!ready && <img src={ZERO_SRC} alt="" className={styles.poster} aria-hidden="true" />}
        <div className={styles.scrim} aria-hidden="true" />
        <div className={styles.progress} aria-hidden="true">
          <span style={{ transform: `scaleX(${loaded / 100})` }} />
        </div>
        <div className={styles.rail} aria-hidden="true">
          {BEATS.map((_, i) => (
            <span key={i} className={i <= active ? styles.dotOn : styles.dot} />
          ))}
        </div>
        <div className={styles.copy}>
          <p className={styles.kicker}>Scroll to walk in · {loaded}% ready</p>
          {BEATS.map((b, i) => (
            <div key={b.title} className={i === active ? styles.beatOn : styles.beat}>
              <p className={styles.eyebrow}>{b.eyebrow}</p>
              <h2 className={styles.title}>{b.title}</h2>
              <p className={styles.body}>{b.body}</p>
              {b.tags.length > 0 && (
                <div className={styles.tags}>
                  {b.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              )}
              {b.cta && (
                <div className={styles.ctaRow}>
                  <a href="/franchise" className={styles.ctaPrimary}>Open a franchise</a>
                  <a href="/brands" className={styles.ctaGhost}>Explore brands</a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
