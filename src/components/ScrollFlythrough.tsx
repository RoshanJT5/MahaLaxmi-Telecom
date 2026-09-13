'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './ScrollFlythrough.module.css';

const DESKTOP_COUNT = 255;
const MOBILE_COUNT = 128;
const pad = (n: number) => String(n).padStart(3, '0');
const desktopUrl = (i: number) => `/page-section2/frames/ezgif-frame-${pad(i + 1)}.jpg`;
const mobileUrl = (i: number) => {
  const srcIndex = Math.min(254, i * 2);
  return `/page-section2/frames-mobile/ezgif-frame-${pad(srcIndex + 1)}.jpg`;
};

const GROW_FRAMES = 5;
const ZERO_SRC = '/store_img.png';
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

    const isMobile = window.matchMedia('(max-width: 860px), (pointer: coarse)').matches;
    const count = isMobile ? MOBILE_COUNT : DESKTOP_COUNT;
    const url = isMobile ? mobileUrl : desktopUrl;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let lastImg: HTMLImageElement | null = null;
    const drawCover = (img: HTMLImageElement) => {
      const cw = canvas.width;
      const ch = canvas.height;
      if (!cw || !ch || !img.naturalWidth) return;
      const s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const dw = img.naturalWidth * s;
      const dh = img.naturalHeight * s;
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
      lastImg = img;
    };
    const sizeCanvas = () => {
      // Canvas fills the morph stage; clientWidth is unaffected by layout,
      // so the backing store tracks the stage exactly as it grows.
      const w = canvas.clientWidth || canvas.getBoundingClientRect().width;
      const h = canvas.clientHeight || canvas.getBoundingClientRect().height;
      const dpr = Math.min(1.75, window.devicePixelRatio || 1);
      const W = Math.max(2, Math.round(w * dpr));
      const H = Math.max(2, Math.round(h * dpr));
      if (canvas.width !== W || canvas.height !== H) {
        canvas.width = W;
        canvas.height = H;
        if (lastImg?.naturalWidth) drawCover(lastImg);
      }
    };
    sizeCanvas();
    window.addEventListener('resize', sizeCanvas);

    const imgs: (HTMLImageElement | undefined)[] = new Array(count);
    let done = 0;

    let target = 0;
    let current = -1;
    let raf = 0;
    // Zeroth frame = the image div content (page.tsx #about-zero-frame).
    // Display idx 0 draws ZERO_SRC, display idx d>0 draws flythrough frame d.
    const zeroImg = new Image();
    zeroImg.src = ZERO_SRC;
    // Display idx d>0 draws flythrough frame d (frame-001 is skipped — the
    // zeroth frame already covers the exterior establishing shot).
    const flyUrl = (j: number) => url(Math.max(0, Math.min(count - 1, j + 1)));
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
        // Only trust the measured box while the source is actually on screen
        // (e.g. not after a mid-page reload); otherwise use the fallback.
        if (b.width > 2 && b.height > 2 && b.top > -window.innerHeight && b.top < window.innerHeight) {
          let r = 3;
          try { r = parseFloat(getComputedStyle(src).borderRadius) || 3; } catch { /* noop */ }
          start = { l: b.left, t: b.top, w: b.width, h: b.height, r };
          return start;
        }
      }
      // Fallback: centered card if the source image div is missing/off-screen.
      start = fallback();
      return start;
    };
    // Pull the tall driver up so the sticky pins at the exact moment the
    // source image card sits 12vh from the viewport top — then the canvas
    // stage can take over at identical coordinates.
    const placeWrap = () => {
      if (placed || !takeover) return;
      const src = getSource();
      if (!src) return;
      if (wrap.getBoundingClientRect().top < window.innerHeight) return; // approaching: freeze layout
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
    // Morph the stage from the source image rect (frame 0) to fullscreen
    // (frame GROW_FRAMES). Same pixels, same box — then it grows.
    // 'after' holds the last frame fullscreen while the sticky scrolls out,
    // so no blank gap flashes between the animation and the next section.
    const layoutStage = (frameFloat: number, phase: Phase) => {
      const stage = stageRef.current;
      const sticky = stickyRef.current;
      if (!takeover || !stage || !sticky) return;
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
    const render = () => {
      raf = requestAnimationFrame(render);
      if (Math.abs(target - current) < 0.0005) return;
      current += (target - current) * 0.16;
      const frameFloat = frameFloatFromP(current, count);
      const idx = Math.max(0, Math.min(count - 1, Math.round(frameFloat)));
      layoutStage(frameFloat, phaseCache);
      const img = idx === 0 ? zeroImg : imgs[idx - 1];
      if (img && img.complete && img.naturalWidth) {
        drawCover(img);
        const beat = Math.min(BEATS.length - 1, Math.floor((idx / (count - 1)) * BEATS.length));
        setActive((p) => (p === beat ? p : beat));
      } else if (idx > 0 && !imgs[idx - 1]) {
        const im = new Image();
        im.src = flyUrl(idx - 1);
        imgs[idx - 1] = im;
        im.onload = () => drawCover(im);
      }
    };

    const loadOne = (j: number): Promise<void> =>
      new Promise((res) => {
        if (j < 0 || j >= count - 1 || imgs[j]) return res();
        const im = new Image();
        imgs[j] = im;
        im.onload = () => {
          done += 1;
          setLoaded(Math.round((done / count) * 100));
          res();
        };
        im.onerror = () => res();
        im.src = flyUrl(j);
      });

    const onScroll = () => {
      placeWrap();
      const rect = wrap.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total <= 0 ? 0 : Math.max(0, Math.min(1, -rect.top / total));
      target = p;
      if (takeover) {
        phaseCache = getPhase();
        layoutStage(frameFloatFromP(p, count), phaseCache);
      }
    };

    (async () => {
      await new Promise<void>((res) => {
        if (zeroImg.complete && zeroImg.naturalWidth) return res();
        zeroImg.onload = () => res();
        zeroImg.onerror = () => res();
      });
      for (let j = 0; j < Math.min(12, count - 1); j++) await loadOne(j);
      drawCover(zeroImg);
      setReady(true);
      placeWrap();
      onScroll();
      current = target;
      const ff0 = frameFloatFromP(current, count);
      const idx0 = Math.round(ff0);
      const img0 = idx0 === 0 ? zeroImg : imgs[idx0 - 1];
      if (img0?.naturalWidth) drawCover(img0 as HTMLImageElement);
      layoutStage(ff0, phaseCache);
      render();
      if (!reduced) {
        for (let j = 12; j < count - 1; j += 4) {
          await Promise.all([loadOne(j), loadOne(j + 1), loadOne(j + 2), loadOne(j + 3)]);
          const r = wrap.getBoundingClientRect();
          if (r.bottom < -2500 || r.top > window.innerHeight + 2500) break;
        }
      }
    })();

    window.addEventListener('scroll', onScroll, { passive: true });
    const onResize = () => {
      placed = false;
      placeWrap();
      sizeCanvas();
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
          {/* Morph stage: starts at the exact rect of #about-zero-frame
              (frame 0 = same image), grows to fullscreen by frame 5. */}
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
        {!ready && <img src="/page-section2/poster.jpg" alt="" className={styles.embedPoster} aria-hidden="true" />}
      </div>
    );
  }

  return (
    <div ref={wrapRef} className={styles.wrap} id="flythrough">
      <div className={styles.sticky}>
        <canvas ref={canvasRef} className={styles.canvas} aria-label="Scroll-driven flythrough of Jagyasi Mobiles store" />
        {!ready && <img src="/page-section2/poster.jpg" alt="" className={styles.poster} aria-hidden="true" />}
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
