"use client";

import { useEffect, useState, useRef } from "react";
import { ArrowLeft, ArrowRight, CircleCheck } from "lucide-react";
import { industries, industryImages } from "../../data/industries";
import { path, withBase } from "../../i18n/utils";
import type { LangProp } from "../../lib/props";

const AUTOPLAY_MS = 6000;
const pad = (n: number) => String(n).padStart(2, "0");

function SlideImage({ src, alt, label }: { src: string; alt: string; label: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="absolute inset-0 bg-linear-to-br from-[#0A0A0B] via-[#0B2F38] to-[#0E7490] flex items-end p-6">
        <span className="font-display font-extrabold text-2xl sm:text-3xl text-white/90 tracking-[-0.02em]">
          {label}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      draggable={false}
      onError={() => setFailed(true)}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-600 ease-out group-hover/card:scale-105"
    />
  );
}

export default function IndustrySlider({ lang }: LangProp) {
  const c = industries[lang];
  const slides = c.slides;
  const contactHref = path(lang, "contact");

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const total = slides.length;

  const go = (i: number) => setIndex((i + total) % total);
  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % total), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, paused, reduceMotion, total]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
    touchStartX.current = null;
  };

  return (
    <section
      id="branchen"
      lang={lang}
      className="py-20 lg:py-28 bg-paper border-b border-ink/10 relative select-none overflow-hidden"
    >
      <style>{`@keyframes industryProgress{from{width:0}to{width:100%}}`}</style>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-10 lg:mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#0E7490]" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#686759]">
              {c.eyebrow}
            </span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-ink tracking-[-0.03em] mb-4">
            {c.title}
          </h2>
          <p className="font-body text-base sm:text-lg text-[#686759] leading-relaxed">
            {c.sub}
          </p>
        </div>

        {/* Pill tabs */}
        <div
          role="tablist"
          aria-label={c.tabsLabel}
          className="flex items-center gap-2 mb-6 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {slides.map((s, i) => {
            const active = i === index;
            return (
              <button
                key={s.tab}
                role="tab"
                aria-selected={active}
                onClick={() => go(i)}
                className={`shrink-0 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm whitespace-nowrap transition-all duration-300 ${
                  active
                    ? "bg-ink text-white border-ink shadow-md"
                    : "bg-white text-[#686759] border-ink/10 hover:text-ink hover:border-ink/30"
                }`}
              >
                <span
                  className={`font-mono text-[11px] tracking-wider ${
                    active ? "text-accent-400" : "text-[#686759]/60"
                  }`}
                >
                  {pad(i + 1)}
                </span>
                <span className="font-display tracking-tight">{s.tab}</span>
              </button>
            );
          })}
        </div>

        {/* Slider card */}
        <div
          className="group/card bg-white rounded-3xl border border-ink/10 overflow-hidden shadow-[0_24px_60px_-24px_rgba(10,10,11,0.2)]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
          }}
          tabIndex={0}
          aria-roledescription="carousel"
        >
          <div
            className="flex transition-transform duration-700"
            style={{
              transform: `translateX(-${index * 100}%)`,
              transitionTimingFunction: "cubic-bezier(0.65, 0, 0.35, 1)",
            }}
          >
            {slides.map((s, i) => (
              <article
                key={s.title}
                aria-hidden={i !== index}
                className="min-w-full grid grid-cols-1 lg:grid-cols-12"
              >
                {/* Image */}
                <div className="relative order-1 lg:order-2 lg:col-span-7 aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:min-h-[560px] overflow-hidden bg-[#0A0A0B]">
                  <SlideImage
                    src={withBase(industryImages[i])}
                    alt={s.title}
                    label={s.tag}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B]/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none hidden lg:block" />

                  {s.badge && (
                    <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 flex items-center justify-between gap-4 rounded-2xl border border-white/20 bg-[#0A0A0B]/60 backdrop-blur-xl p-3 sm:p-4 text-white">
                      <div className="min-w-0">
                        <span className="block text-[10px] sm:text-[11px] font-mono text-[#22D3EE] uppercase tracking-wider truncate">
                          {s.badge.label}
                        </span>
                        <span className="hidden sm:block text-xs text-white/70 mt-0.5">
                          {s.badge.sub}
                        </span>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="block text-[9px] sm:text-[10px] uppercase font-mono text-[#A3A29A]">
                          {s.badge.statLabel}
                        </span>
                        <span className="font-display font-extrabold text-xl sm:text-2xl text-[#22D3EE] leading-none">
                          {s.badge.stat}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Text */}
                <div className="relative order-2 lg:order-1 lg:col-span-5 flex flex-col justify-between p-6 sm:p-10 lg:p-12">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-2 right-6 font-display font-extrabold text-[96px] sm:text-[120px] leading-none text-[#0A0A0B]/[0.04]"
                  >
                    {pad(i + 1)}
                  </span>

                  <div className="relative">
                    <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#0E7490] bg-[#0E7490]/10 px-3 py-1 rounded-full mb-5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0E7490]" />
                      {s.tag}
                    </span>
                    <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0A0A0B] tracking-[-0.03em] leading-[1.05] mb-4">
                      {s.title}
                    </h3>
                    <p className="font-body text-base text-[#686759] leading-relaxed mb-6">
                      {s.description}
                    </p>
                    <ul className="space-y-3">
                      {s.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-3 text-sm text-[#0A0A0B]/85"
                        >
                          <CircleCheck
                            size={18}
                            className="text-[#0E7490] shrink-0 mt-px"
                            aria-hidden="true"
                          />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="relative mt-8 pt-6 border-t border-[#0A0A0B]/10">
                    <a
                      href={contactHref}
                      tabIndex={i === index ? 0 : -1}
                      className="group inline-flex items-center gap-3 rounded-full bg-[#0A0A0B] text-white pl-5 pr-2 py-2 text-sm font-semibold transition-all duration-300 hover:bg-[#0E7490] hover:shadow-lg hover:shadow-[#0E7490]/25"
                    >
                      <span>{c.cta}</span>
                      <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                        <ArrowRight
                          size={14}
                          className="transition-transform group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Controls: segmented progress + arrows */}
        <div className="mt-6 flex items-center gap-4 sm:gap-6">
          <span className="font-mono text-sm tracking-widest text-[#686759] shrink-0">
            {pad(index + 1)} / {pad(total)}
          </span>

          <div className="flex flex-1 items-center gap-1.5 sm:gap-2">
            {slides.map((s, i) => (
              <button
                key={s.tab}
                onClick={() => go(i)}
                aria-label={c.goTo.replace("{name}", s.tag)}
                className="group/seg relative h-6 flex-1 flex items-center"
              >
                <span className="relative block h-[3px] w-full rounded-full bg-[#0A0A0B]/10 overflow-hidden group-hover/seg:bg-[#0A0A0B]/20 transition-colors">
                  {i < index && <span className="absolute inset-0 bg-[#0E7490]" />}
                  {i === index && (
                    <span
                      key={index}
                      className="absolute left-0 top-0 h-full bg-[#0E7490]"
                      style={
                        reduceMotion
                          ? { width: "100%" }
                          : {
                              animation: `industryProgress ${AUTOPLAY_MS}ms linear forwards`,
                              animationPlayState: paused ? "paused" : "running",
                            }
                      }
                    />
                  )}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={prev}
              aria-label={c.prev}
              className="w-11 h-11 rounded-full border border-[#0A0A0B]/20 bg-white hover:bg-[#0A0A0B] hover:text-white hover:border-[#0A0A0B] flex items-center justify-center transition-all duration-200 text-[#0A0A0B]"
            >
              <ArrowLeft size={16} aria-hidden="true" />
            </button>
            <button
              onClick={next}
              aria-label={c.next}
              className="w-11 h-11 rounded-full border border-[#0A0A0B]/20 bg-white hover:bg-[#0A0A0B] hover:text-white hover:border-[#0A0A0B] flex items-center justify-center transition-all duration-200 text-[#0A0A0B]"
            >
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}