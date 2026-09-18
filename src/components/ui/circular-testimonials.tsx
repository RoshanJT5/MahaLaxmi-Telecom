"use client";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import "./CircularTestimonials.css";
import { motion, AnimatePresence } from "framer-motion";

type Legacy = { quote: string; name: string; designation: string; src: string };
type NewT = {
  name: string;
  role: string;
  message: string;
  image: string;
};

function normalize(input: any[]): NewT[] {
  if (!input || !input.length) return [];
  if (input[0]?.quote) {
    const legacy = input as Legacy[];
    return legacy.map((t) => ({
      name: t.name,
      role: t.designation,
      message: t.quote,
      image: t.src,
    }));
  }
  return input as NewT[];
}

export function CircularTestimonials({
  testimonials,
  autoplay = true,
  colors,
  fontSizes,
}: any) {
  const normalized: NewT[] = useMemo(
    () => normalize(testimonials || []),
    [testimonials],
  );
  const data: NewT[] = normalized.length
    ? normalized
    : [
        {
          name: "Jagyasi Mobile",
          role: "Flagship Format — JM",
          message: "Our flagship, company-operated format focused on full-range mobile retail and premium in-store experience.",
          image: "/jm-showroom-hero.png",
        },
        {
          name: "MM Mobile",
          role: "Standard Format — MM",
          message:
            "A standard-format store built for consistent, everyday mobile and accessory retail.",
          image: "/page-section1/store-detail.jpg",
        },
        {
          name: "Phone Café",
          role: "Compact Format — PC",
          message:
            "A compact, neighbourhood-friendly format for accessible mobile shopping.",
          image: "/page-section1/hero-store.jpg",
        },
        {
          name: "Mobile Point",
          role: "Emerging-Market Format — MP",
          message:
            "A focused retail point for devices and accessories in emerging markets.",
          image: "/store_img.png",
        },
      ];
  const n = data.length;
  const [index, setIndex] = useState(0);
  const [isTouchLayout, setIsTouchLayout] = useState(false);
  const [isTouchPaused, setIsTouchPaused] = useState(false);
  const pauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStart = useRef<{ pointerId: number; x: number; y: number } | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1100px)");
    const updateLayout = () => {
      setIsTouchLayout(media.matches);
      if (!media.matches) {
        if (pauseTimer.current) clearTimeout(pauseTimer.current);
        pauseTimer.current = null;
        touchStart.current = null;
        setIsTouchPaused(false);
      }
    };
    updateLayout();
    media.addEventListener("change", updateLayout);
    return () => {
      media.removeEventListener("change", updateLayout);
      if (pauseTimer.current) clearTimeout(pauseTimer.current);
    };
  }, []);

  const pauseForTouch = useCallback(() => {
    if (!window.matchMedia("(max-width: 1100px)").matches) return;
    setIsTouchPaused(true);
    if (pauseTimer.current) clearTimeout(pauseTimer.current);
    pauseTimer.current = setTimeout(() => {
      pauseTimer.current = null;
      setIsTouchPaused(false);
    }, 10_000);
  }, []);

  useEffect(() => {
    if (!autoplay || isTouchPaused) return;
    const id = setInterval(() => setIndex((p) => (p + 1) % n), 7000);
    return () => clearInterval(id);
  }, [autoplay, n, isTouchPaused]);
  const prev = () => { pauseForTouch(); setIndex((p) => (p - 1 + n) % n); };
  const next = () => { pauseForTouch(); setIndex((p) => (p + 1) % n); };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isTouchLayout || touchStart.current?.pointerId !== event.pointerId) return;
    const distanceX = event.clientX - touchStart.current.x;
    const distanceY = event.clientY - touchStart.current.y;
    touchStart.current = null;
    pauseForTouch();
    if (Math.abs(distanceX) < 38 || Math.abs(distanceX) < Math.abs(distanceY) * 1.2) return;
    setIndex((current) => (current + (distanceX < 0 ? 1 : -1) + n) % n);
  };

  // stack configs desktop
  const stack = data
    .map((t, i) => {
      const depth = (i - index + n) % n;
      return { t, depth, i };
    })
    .sort((a, b) => a.depth - b.depth);

  // offsets for depths 0..3
  const getStyle = (depth: number, isCompact: boolean) => {
    if (isCompact) {
      return [
        { left: "0%", top: "0%", w: "100%", h: "100%", z: 10, scale: 1, opacity: 1, rotate: 0 },
        { left: "105%", top: "0%", w: "100%", h: "100%", z: 7, scale: 1, opacity: 0, rotate: 0 },
        { left: "-105%", top: "0%", w: "100%", h: "100%", z: 5, scale: 1, opacity: 0, rotate: 0 },
        { left: "-105%", top: "0%", w: "100%", h: "100%", z: 6, scale: 1, opacity: 0, rotate: 0 },
      ][depth];
    }

    return [
      // ==========================================
      // DEPTH 0 — FRONT
      // ==========================================
      {
        left: 45,
        top: 35,
        w: 470,
        h: 480,
        z: 10,
        scale: 1,
        opacity: 1,
        rotate: 0,
      },

      // ==========================================
      // DEPTH 1 — RIGHT
      // ==========================================
      {
        left: 170,
        top: 55,
        w: 470,
        h: 480,
        z: 7,
        scale: 0.8,
        opacity: 0.55,
        rotate: 6,
      },

      // ==========================================
      // DEPTH 2 — LEFT
      // ==========================================
      {
        left: -70,
        top: 55,
        w: 470,
        h: 480,
        z: 6,
        scale: 0.8,
        opacity: 0.55,
        rotate: -6,
      },

      // ==========================================
      // DEPTH 3 — HIDDEN / BACK
      // ==========================================
      {
        left: 45,
        top: 100,
        w: 470,
        h: 100,
        z: 5,
        scale: 0.7,
        opacity: 0,
        rotate: 0,
      },
    ][depth];
  };

  return (
    <section className="testimonial-section">
      <div className="testimonial-wrapper">
        <div
          className="testimonial-images"
          onPointerDown={(event) => {
            if (!isTouchLayout) return;
            touchStart.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY };
            event.currentTarget.setPointerCapture(event.pointerId);
            pauseForTouch();
          }}
          onPointerMove={(event) => {
            if (touchStart.current?.pointerId === event.pointerId) pauseForTouch();
          }}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => { touchStart.current = null; pauseForTouch(); }}
        >
          {stack.map(({ t, depth }) => {
            const s = getStyle(depth, isTouchLayout)!;
            const isFront = depth === 0;
            return (
              <motion.div
                key={t.name}
                className={
                  depth === 0
                    ? "testimonial-main-image"
                    : depth === 3
                      ? "testimonial-back-image"
                      : "testimonial-stack-image"
                }
                initial={false}
                animate={{ left: s.left, top: s.top, scale: s.scale, opacity: s.opacity, zIndex: s.z, rotate: s.rotate, }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} style={{
                  position: "absolute",
                  width: s.w,
                  height: s.h,
                  borderRadius: depth === 3 ? 24 : 28,
                  overflow: "hidden",
                  boxShadow: isFront
                    ? "0 18px 35px rgba(0,0,0,0.14)"
                    : "0 12px 30px rgba(0,0,0,0.10)",
                  background: "#151a1d",
                }}
>
                <img src={t.image} alt="" aria-hidden="true" className="testimonial-image-backdrop" />
                <img
                  src={t.image}
                  alt={t.name}
                  className="testimonial-image-photo"
                />
              </motion.div>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="testimonial-content"
          >
            <h2
              className="testimonial-name"
              style={
                colors?.name
                  ? { color: colors.name, fontSize: fontSizes?.name }
                  : undefined
              }
            >
              {data[index].name}
            </h2>
            <span
              className="testimonial-role"
              style={
                colors?.designation
                  ? {
                      color: colors.designation,
                      fontSize: fontSizes?.designation,
                    }
                  : undefined
              }
            >
              {data[index].role}
            </span>
            <p
              className="testimonial-message"
              style={
                colors?.testimony
                  ? { color: colors.testimony, fontSize: fontSizes?.quote }
                  : undefined
              }
            >
              {data[index].message}
            </p>
          </motion.div>
        </AnimatePresence>
        <div className="testimonial-controls">
          <button
            className="testimonial-button"
            onClick={prev}
            aria-label="Previous testimonial"
          >
            ‹
          </button>
          <button
            className="testimonial-button"
            onClick={next}
            aria-label="Next testimonial"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
