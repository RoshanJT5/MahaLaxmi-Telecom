'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './CoverflowCarousel.module.css';

export type CoverflowSlide = {
  name: string;
  logo: string;
  color?: string;
  kind: 'svg' | 'image';
  symbol?: boolean;
  treatment?: 'invert-blend' | 'blend' | 'banner';
};

export function CoverflowCarousel({ slides }: { slides: CoverflowSlide[] }) {
  const count = slides.length;
  const frameRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const positionRef = useRef(0);
  const targetRef = useRef(0);
  const widthRef = useRef(0);
  const animationRef = useRef<number | null>(null);
  const autoFrameRef = useRef<number | null>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resumeAtRef = useRef(0);
  const stopAutoRef = useRef<() => void>(() => {});
  const scheduleAutoRef = useRef<() => void>(() => {});
  const dragRef = useRef<{ id: number; x: number; y: number; position: number; velocity: number; time: number; moved: boolean; startedOnCard: boolean } | null>(null);
  const [selected, setSelected] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const indexAt = useCallback((position: number) => ((Math.round(position) % count) + count) % count, [count]);

  const paint = useCallback(() => {
    if (!widthRef.current) return;
    const pitch = widthRef.current * 0.82;
    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      let offset = ((index - positionRef.current) % count + count) % count;
      if (offset > count / 2) offset -= count;
      const distance = Math.abs(offset);
      const ramp = Math.pow(distance, 0.62);
      const tilt = Math.min(36 * ramp, 76) * Math.sign(offset);
      card.style.transform = `translateX(calc(-50% + ${offset * pitch}px)) translateZ(${-widthRef.current * 0.42 * ramp}px) rotateY(${-tilt}deg)`;
      // Keep neighboring cards opaque; fade only the far edge before it wraps around.
      card.style.opacity = String(Math.min(1, Math.max(0, (count / 2 - distance) / 1.5)));
      card.style.zIndex = String(1000 - Math.round(distance * 100));
    });
  }, [count]);

  const settle = useCallback((target: number, onComplete?: () => void) => {
    if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
    targetRef.current = target;
    setSelected(indexAt(target));
    if (reducedMotion) {
      positionRef.current = target;
      paint();
      animationRef.current = null;
      onComplete?.();
      return;
    }
    const step = () => {
      const remaining = target - positionRef.current;
      if (Math.abs(remaining) < 0.0004) {
        positionRef.current = target;
        paint();
        animationRef.current = null;
        onComplete?.();
        return;
      }
      positionRef.current += remaining * 0.16;
      paint();
      animationRef.current = requestAnimationFrame(step);
    };
    animationRef.current = requestAnimationFrame(step);
  }, [indexAt, paint, reducedMotion]);

  const pauseAuto = useCallback(() => {
    resumeAtRef.current = Date.now() + 10_000;
    stopAutoRef.current();
    scheduleAutoRef.current();
  }, []);

  const goTo = useCallback((index: number) => {
    pauseAuto();
    const nearest = index + Math.round((targetRef.current - index) / count) * count;
    settle(nearest);
  }, [count, pauseAuto, settle]);

  const nudge = useCallback((direction: number) => {
    pauseAuto();
    settle(Math.round(targetRef.current) + direction);
  }, [pauseAuto, settle]);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    if (/Firefox\//.test(navigator.userAgent)) frame.dataset.firefox = 'true';
    const measure = () => {
      widthRef.current = cardRefs.current[0]?.offsetWidth ?? 0;
      paint();
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [paint]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => {
      media.removeEventListener('change', update);
      if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  useEffect(() => {
    let lastTime = 0;
    const stop = () => {
      if (autoFrameRef.current !== null) cancelAnimationFrame(autoFrameRef.current);
      if (resumeTimerRef.current !== null) clearTimeout(resumeTimerRef.current);
      autoFrameRef.current = null;
      resumeTimerRef.current = null;
      lastTime = 0;
    };
    const tick = (now: number) => {
      if (lastTime) {
        // About one brand every three seconds, independent of display refresh rate.
        positionRef.current += Math.min(now - lastTime, 64) * 0.00033;
        targetRef.current = positionRef.current;
        paint();
        const current = indexAt(positionRef.current);
        setSelected((previous) => previous === current ? previous : current);
      }
      lastTime = now;
      autoFrameRef.current = requestAnimationFrame(tick);
    };
    const schedule = () => {
      stop();
      if (document.hidden || reducedMotion) return;
      const wait = resumeAtRef.current - Date.now();
      if (wait > 0) {
        resumeTimerRef.current = setTimeout(schedule, wait);
      } else {
        if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
        autoFrameRef.current = requestAnimationFrame(tick);
      }
    };
    stopAutoRef.current = stop;
    scheduleAutoRef.current = schedule;
    document.addEventListener('visibilitychange', schedule);
    schedule();
    return () => {
      document.removeEventListener('visibilitychange', schedule);
      stop();
      stopAutoRef.current = () => {};
      scheduleAutoRef.current = () => {};
    };
  }, [indexAt, paint, reducedMotion]);

  return <div className={styles.carousel} role="region" aria-roledescription="carousel" aria-label="Authorized brand partners">
    <div
      ref={frameRef}
      className={styles.frame}
      tabIndex={0}
      onPointerDown={(event) => {
        if (event.pointerType === 'mouse' && event.button !== 0) return;
        const card = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-coverflow-card]') : null;
        stopAutoRef.current();
        if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
        (card ?? event.currentTarget).setPointerCapture(event.pointerId);
        targetRef.current = positionRef.current;
        dragRef.current = { id: event.pointerId, x: event.clientX, y: event.clientY, position: positionRef.current, velocity: 0, time: performance.now(), moved: false, startedOnCard: Boolean(card) };
      }}
      onPointerMove={(event) => {
        const drag = dragRef.current;
        if (!drag || drag.id !== event.pointerId || !widthRef.current) return;
        if (Math.hypot(event.clientX - drag.x, event.clientY - drag.y) > 8) drag.moved = true;
        const now = performance.now();
        const previous = positionRef.current;
        positionRef.current = drag.position - (event.clientX - drag.x) / (widthRef.current * 0.82);
        drag.velocity = (positionRef.current - previous) / Math.max(now - drag.time, 1) * 1000;
        drag.time = now;
        setSelected(indexAt(positionRef.current));
        paint();
      }}
      onPointerUp={(event) => {
        const drag = dragRef.current;
        if (!drag || drag.id !== event.pointerId) return;
        dragRef.current = null;
        if (drag.startedOnCard && !drag.moved && Math.hypot(event.clientX - drag.x, event.clientY - drag.y) <= 8) {
          pauseAuto();
        } else if (!drag.moved) {
          scheduleAutoRef.current();
        } else {
          settle(Math.round(positionRef.current + Math.max(-2, Math.min(2, drag.velocity * 0.18))), () => scheduleAutoRef.current());
        }
      }}
      onPointerCancel={() => {
        if (!dragRef.current) return;
        dragRef.current = null;
        settle(Math.round(positionRef.current), () => scheduleAutoRef.current());
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') { event.preventDefault(); nudge(-1); }
        if (event.key === 'ArrowRight') { event.preventDefault(); nudge(1); }
      }}
    >
      <div className={styles.stage}>
        {slides.map((slide, index) => <div
          key={slide.name}
          ref={(node) => { cardRefs.current[index] = node; }}
          data-coverflow-card
          className={`${styles.card}${index === selected ? ` ${styles.active}` : ''}`}
          role="group"
          aria-roledescription="slide"
          aria-label={`${slide.name}, ${index + 1} of ${count}`}
          aria-hidden={index !== selected}
        >
          <div className={styles.logoSurface}>
            {slide.kind === 'svg'
              ? <span className={`${styles.logoMask}${slide.symbol ? ` ${styles.logoSymbol}` : ''}`} style={{ backgroundColor: slide.color, maskImage: `url('${slide.logo}')`, WebkitMaskImage: `url('${slide.logo}')` }} aria-hidden="true" />
              : <img
                  className={`${styles.logoImage}${slide.treatment === 'invert-blend' ? ` ${styles.logoImageInverted}` : ''}${slide.treatment === 'blend' ? ` ${styles.logoImageBlended}` : ''}${slide.treatment === 'banner' ? ` ${styles.logoImageBanner}` : ''}`}
                  src={slide.logo}
                  alt=""
                  draggable={false}
                  loading="lazy"
                />}
          </div>
          <div className={styles.cardCaption}><strong>{slide.name}</strong><span>Authorized partner</span></div>
        </div>)}
      </div>
    </div>
    <div className={styles.controls}>
      <button type="button" onClick={() => nudge(-1)} aria-label="Previous brand"><ChevronLeft size={19} /></button>
      <p aria-live={autoFrameRef.current === null ? 'polite' : 'off'}><strong>{slides[selected].name}</strong><span>{String(selected + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}</span></p>
      <button type="button" onClick={() => nudge(1)} aria-label="Next brand"><ChevronRight size={19} /></button>
    </div>
    <div className={styles.pagination} aria-label="Choose a brand">
      {slides.map((slide, index) => <button key={slide.name} type="button" aria-label={`Show ${slide.name}`} aria-current={index === selected ? 'true' : undefined} onClick={() => goTo(index)} />)}
    </div>
  </div>;
}
