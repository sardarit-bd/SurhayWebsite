"use client";

import { useEffect, useRef, useState } from "react";
import { withBase } from "@/i18n/utils";

const photos = [
  "/images/hero/image1.avif",
  "/images/hero/image2.avif",
  "/images/hero/image3.avif",
  "/images/hero/image4.avif",
];

function Slot({ offset, active, eager = false }: { offset: number; active: number; eager?: boolean }) {
  const current = (active + offset) % photos.length;
  return (
    <>
      {photos.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={withBase(src)}
          alt=""
          loading={eager && i === current ? "eager" : "lazy"}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </>
  );
}

export default function HeroCollage() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      if (reduced.current) return;
      setActive((i) => (i + 1) % photos.length);
    }, 4000);
    return () => window.clearInterval(id);
  }, [paused]);

  const card =
    "overflow-hidden rounded-3xl border border-white/15 bg-ink-2 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.8)]";

  return (
    <div
      className="animate-fade-up relative mx-auto aspect-[4/5] w-full max-w-[480px] [animation-delay:300ms] lg:max-w-none"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div
        aria-hidden="true"
        className="absolute inset-[10%] rounded-full bg-accent-600/30 blur-[90px]"
      />

      {/* Main card */}
      <div className={`${card} absolute inset-x-[10%] bottom-[10%] top-0`}>
        <div className="relative h-full w-full">
          <Slot offset={0} active={active} eager />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
        </div>
      </div>

      {/* Lower left card */}
      <div className="absolute bottom-0 left-0 w-[40%] -rotate-6">
        <div className="animate-float-delayed">
          <div className={`${card} relative aspect-[4/5] w-full rounded-2xl`}>
            <Slot offset={1} active={active} />
          </div>
        </div>
      </div>

      {/* Upper right card */}
      <div className="absolute right-0 top-[8%] w-[30%] rotate-6">
        <div className="animate-float">
          <div className={`${card} relative aspect-square w-full rounded-2xl`}>
            <Slot offset={2} active={active} />
          </div>
        </div>
      </div>

      {/* Floating logo chips */}
      <div className="animate-float absolute left-[2%] top-[14%] flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-ink-2/80 backdrop-blur-md">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={withBase("/images/logos/figma.svg")} alt="" className="h-6 w-auto brightness-0 invert" />
      </div>
      <div className="animate-float-delayed absolute bottom-[26%] right-[2%] flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-ink-2/80 backdrop-blur-md">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={withBase("/images/logos/wordpress.svg")} alt="" className="h-6 w-auto brightness-0 invert" />
      </div>
    </div>
  );
}