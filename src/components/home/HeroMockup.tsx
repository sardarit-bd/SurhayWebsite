"use client";

import { useEffect, useRef, useState } from "react";
import { withBase } from "@/i18n/utils";

const shots = [
  "/images/cases/bergmann-cover.webp",
  "/images/cases/lichtblick-cover.webp",
  "/images/cases/weber-cover.webp",
];

export default function HeroMockup() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const tiltRef = useRef<HTMLDivElement>(null);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      if (reduced.current) return;
      setActive((i) => (i + 1) % shots.length);
    }, 4000);
    return () => window.clearInterval(id);
  }, [paused]);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = tiltRef.current;
    if (!el || reduced.current || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 7).toFixed(2)}deg)`;
  };

  const onLeave = () => {
    if (tiltRef.current) tiltRef.current.style.transform = "";
    setPaused(false);
  };

  return (
    <div
      className="animate-fade-up mt-14 w-full max-w-250 [animation-delay:500ms] [perspective:1400px]"
      onPointerMove={onMove}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={onLeave}
    >
      <div
        ref={tiltRef}
        className="max-h-85 overflow-hidden rounded-t-2xl border border-white/15 bg-ink-2 shadow-[0_-10px_80px_-10px_rgb(34_211_238/0.25)] transition-transform duration-300 ease-out [mask-image:linear-gradient(to_bottom,black_65%,transparent)] sm:max-h-115 lg:max-h-135"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="flex items-center gap-2 border-b border-white/10 bg-ink-3/70 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <div className="mx-auto h-5 w-1/3 rounded-md bg-white/[0.07]" />
          <div className="flex items-center gap-1.5">
            {shots.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`${i + 1} / ${shots.length}`}
                aria-current={i === active}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === active ? "w-5 bg-accent-400" : "w-1.5 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="relative aspect-[16/10] w-full">
          {shots.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={withBase(src)}
              alt=""
              loading={i === 0 ? "eager" : "lazy"}
              className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700 ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}