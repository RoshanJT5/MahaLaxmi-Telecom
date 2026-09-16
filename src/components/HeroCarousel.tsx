"use client";

import { useEffect, useState } from "react";

const images = [
  { src: "/page-section1/hero-store.jpg", position: "center" },
  { src: "/page-section1/products.jpg", position: "center" },
  { src: "/page-section1/accessories.jpg", position: "center" },
  { src: "/page-section1/store-detail.jpg", position: "center" },
  { src: "/page-section1/store-hero.jpg", position: "center" },
];

export default function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;
    const timer = window.setInterval(
      () => setActive((index) => (index + 1) % images.length),
      6500,
    );
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="home-hero__image" aria-hidden="true">
      {images.map((image, index) => (
        <img
          key={image.src}
          src={image.src}
          alt=""
          className={index === active ? "is-active" : ""}
          style={{ objectPosition: image.position }}
          fetchPriority={index === 0 ? "high" : undefined}
          loading={index === 0 ? "eager" : "lazy"}
        />
      ))}
    </div>
  );
}
