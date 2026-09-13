"use client";
import { useState, useEffect, useMemo } from "react";
import "./CircularTestimonials.css";
import { motion, AnimatePresence } from "framer-motion";

type Legacy = { quote: string; name: string; designation: string; src: string };
type NewT = {
  name: string;
  role: string;
  message: string;
  image: string;
  backgroundImage: string;
};

function normalize(input: any[]): NewT[] {
  if (!input || !input.length) return [];
  if (input[0]?.quote) {
    const legacy = input as Legacy[];
    const bgs = [
      "/page-section1/store-detail.jpg",
      "/page-section1/hero-store.jpg",
      "/store_img.png",
      "/jm-showroom-hero.png",
    ];
    return legacy.map((t, i) => ({
      name: t.name,
      role: t.designation,
      message: t.quote,
      image: t.src,
      backgroundImage: bgs[(i + 1) % bgs.length],
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
          name: "Martina Edelweist",
          role: "Satisfied Customer",
          message:
            "Shining Yam is a hidden gem! The impeccable service and overall attention to detail created a memorable experience. I highly recommend it!",
          image: "/jm-showroom-hero.png",
          backgroundImage: "/page-section1/store-detail.jpg",
        },
        {
          name: "MM Mobile",
          role: "Standard Format — MM",
          message:
            "A standard-format store built for consistent, everyday mobile and accessory retail.",
          image: "/page-section1/store-detail.jpg",
          backgroundImage: "/page-section1/hero-store.jpg",
        },
        {
          name: "Phone Café",
          role: "Compact Format — PC",
          message:
            "A compact, neighbourhood-friendly format for accessible mobile shopping.",
          image: "/page-section1/hero-store.jpg",
          backgroundImage: "/store_img.png",
        },
        {
          name: "Mobile Point",
          role: "Emerging-Market Format — MP",
          message:
            "A focused retail point for devices and accessories in emerging markets.",
          image: "/store_img.png",
          backgroundImage: "/jm-showroom-hero.png",
        },
      ];
  const n = data.length;
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(() => setIndex((p) => (p + 1) % n), 7000);
    return () => clearInterval(id);
  }, [autoplay, n]);
  const prev = () => setIndex((p) => (p - 1 + n) % n);
  const next = () => setIndex((p) => (p + 1) % n);

  // stack configs desktop
  const stack = data
    .map((t, i) => {
      const depth = (i - index + n) % n;
      return { t, depth, i };
    })
    .sort((a, b) => a.depth - b.depth);

  // offsets for depths 0..3
  const getStyle = (depth: number, isMobile: boolean) => {
    if (isMobile) {
      return [
        // 0 = ACTIVE / FRONT
        {
          left: "8%",
          top: "8%",
          w: "84%",
          h: "84%",
          z: 10,
          scale: 1,
          opacity: 1,
        },

        // 1 = RIGHT
        {
          left: "25%",
          top: "3%",
          w: "84%",
          h: "84%",
          z: 7,
          scale: 0.9,
          opacity: 1,
        },

        // 2 = LEFT
        {
          left: "-8%",
          top: "3%",
          w: "84%",
          h: "84%",
          z: 6,
          scale: 0.9,
          opacity: 1,
        },

        // 3 = TOP / BACK
        {
          left: "8%",
          top: "-8%",
          w: "84%",
          h: "84%",
          z: 5,
          scale: 0.84,
          opacity: 1,
        },
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
        <div className="testimonial-images">
          {stack.map(({ t, depth }) => {
            const s: any = getStyle(depth, false);
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
                animate={{ left: typeof s.left === "number" ? s.left : s.left, top: typeof s.top === "number" ? s.top : s.top, scale: s.scale, opacity: s.opacity, zIndex: s.z, rotate: s.rotate, }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} style={{
                  position: "absolute",
                  width: typeof s.w === "number" ? s.w : s.w,
                  height: typeof s.h === "number" ? s.h : s.h,
                  borderRadius: depth === 3 ? 24 : 28,
                  overflow: "hidden",
                  boxShadow: isFront
                    ? "0 18px 35px rgba(0,0,0,0.14)"
                    : "0 12px 30px rgba(0,0,0,0.10)",
                  background: "#151a1d",
                }}
>
                <img
                  src={t.image}
                  alt={t.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
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
