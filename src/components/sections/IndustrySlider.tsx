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
      <div className="absolute inset-0 bg-linear-to-br from-ink via-accent-800 to-accent-600 flex items-end p-6">
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
      className="py-8 sm:py-20 lg:py-28 bg-paper border-b border-ink/10 relative select-none overflow-hidden"
    >
      <style>{`@keyframes industryProgress{from{width:0}to{width:100%}}`}</style>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-4 sm:mb-10 lg:mb-14">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <span className="w-2 h-2 rounded-full bg-accent-600" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-mute">
              {c.eyebrow}
            </span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl text-ink tracking-[-0.03em] leading-tight sm:leading-normal sm:mb-4">
            {c.title}
          </h2>
          <p className="hidden sm:block font-body text-base sm:text-lg text-mute leading-relaxed">
            {c.sub}
          </p>
        </div>
        <div
          role="tablist"
          aria-label={c.tabsLabel}
          className="flex items-center gap-2 mb-3 sm:mb-6 overflow-x-auto scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {slides.map((s, i) => {
            const active = i === index;
            return (
              <button
                key={s.tab}
                role="tab"
                aria-selected={active}
                onClick={() => go(i)}
                className={`shrink-0 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 sm:px-4 sm:py-2 text-sm whitespace-nowrap transition-all duration-300 ${
                  active
                    ? "bg-ink text-white border-ink shadow-md"
                    : "bg-white text-mute border-ink/10 hover:text-ink hover:border-ink/30"
                }`}
              >
                <span
                  className={`font-mono text-[11px] tracking-wider ${
                    active ? "text-accent-400" : "text-mute/60"
                  }`}
                >
                  {pad(i + 1)}
                </span>
                <span className="font-display tracking-tight">{s.tab}</span>
              </button>
            );
          })}
        </div>
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
                <div className="relative order-1 lg:order-2 lg:col-span-7 h-36 sm:h-auto sm:aspect-video lg:aspect-auto lg:min-h-140 overflow-hidden bg-ink">
                  <SlideImage
                    src={withBase(industryImages[i])}
                    alt={s.title}
                    label={s.tag}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-ink/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-linear-to-r from-white/10 to-transparent pointer-events-none hidden lg:block" />

                  {s.badge && (
                    <div className="absolute bottom-2 left-2 right-2 sm:bottom-5 sm:left-5 sm:right-5 flex items-center justify-between gap-4 rounded-2xl border border-white/20 bg-ink/60 backdrop-blur-xl p-2.5 sm:p-4 text-white">
                      <div className="min-w-0">
                        <span className="block text-[10px] sm:text-[11px] font-mono text-accent-400 uppercase tracking-wider truncate">
                          {s.badge.label}
                        </span>
                        <span className="hidden sm:block text-xs text-white/70 mt-0.5">
                          {s.badge.sub}
                        </span>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="block text-[9px] sm:text-[10px] uppercase font-mono text-mute-dark">
                          {s.badge.statLabel}
                        </span>
                        <span className="font-display font-extrabold text-xl sm:text-2xl text-accent-400 leading-none">
                          {s.badge.stat}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="relative order-2 lg:order-1 lg:col-span-5 flex flex-col justify-between p-4 sm:p-10 lg:p-12">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-2 right-6 hidden sm:block font-display font-extrabold text-[96px] sm:text-[120px] leading-none text-ink/4"
                  >
                    {pad(i + 1)}
                  </span>

                  <div className="relative">
                    <span className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold text-accent-600 bg-accent-600/10 px-3 py-1 rounded-full mb-5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-600" />
                      {s.tag}
                    </span>
                    <h3 className="font-display font-extrabold text-[22px] sm:text-4xl text-ink tracking-[-0.03em] leading-[1.1] sm:leading-[1.05] mb-2 sm:mb-4">
                      {s.title}
                    </h3>
                    <p className="font-body text-[15px] sm:text-base text-mute leading-[1.45] sm:leading-relaxed mb-3 sm:mb-6">
                      {s.description}
                    </p>
                    <ul className="space-y-2 sm:space-y-3">
                      {s.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2.5 sm:gap-3 text-sm leading-snug sm:leading-normal text-ink/85"
                        >
                          <CircleCheck
                            size={18}
                            className="text-accent-600 shrink-0 mt-px"
                            aria-hidden="true"
                          />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="relative mt-4 sm:mt-8 sm:pt-6 sm:border-t sm:border-ink/10">
                    <a
                      href={contactHref}
                      tabIndex={i === index ? 0 : -1}
                      className="group inline-flex items-center gap-3 rounded-full bg-ink text-white pl-5 pr-1.5 py-1.5 sm:pr-2 sm:py-2 text-sm font-semibold leading-tight transition-all duration-300 hover:bg-accent-600 hover:shadow-lg hover:shadow-accent-600/25"
                    >
                      <span>{c.cta}</span>
                      <span className="w-8 h-8 shrink-0 rounded-full bg-white/15 flex items-center justify-center">
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

        <div className="mt-3 sm:mt-6 flex items-center gap-3 sm:gap-6">
          <span className="hidden sm:block font-mono text-sm tracking-widest text-mute shrink-0">
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
                <span className="relative block h-0.75 w-full rounded-full bg-ink/10 overflow-hidden group-hover/seg:bg-ink/20 transition-colors">
                  {i < index && <span className="absolute inset-0 bg-accent-600" />}
                  {i === index && (
                    <span
                      key={index}
                      className="absolute left-0 top-0 h-full bg-accent-600"
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
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-ink/20 bg-white hover:bg-ink hover:text-white hover:border-ink flex items-center justify-center transition-all duration-200 text-ink"
            >
              <ArrowLeft size={16} aria-hidden="true" />
            </button>
            <button
              onClick={next}
              aria-label={c.next}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-ink/20 bg-white hover:bg-ink hover:text-white hover:border-ink flex items-center justify-center transition-all duration-200 text-ink"
            >
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}