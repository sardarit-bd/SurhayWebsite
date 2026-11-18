"use client";

import { useEffect, useRef } from "react";

export default function HeroBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(hover: hover)").matches
    ) {
      return;
    }
    const move = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    host.addEventListener("pointermove", move);
    return () => host.removeEventListener("pointermove", move);
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="hero-bg pointer-events-none absolute inset-0 -z-10">
      <div className="hero-aurora" />
      <div className="hero-grid" />
      <div className="hero-grid hero-grid--spot" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
    </div>
  );
}