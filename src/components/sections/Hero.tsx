"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import type { LangProp } from '../../lib/props';
const SLIDE_TRANSITION_S = 1.1;
const POST_SLIDE_DELAY_MS = 500;
const TEXT_ENTER_S = 0.8;
const TEXT_ENTER_STAGGER_S = 0.12;
const TEXT_HOLD_MS = 1000;
const TEXT_EXIT_S = 0.6;
const TEXT_EXIT_STAGGER_S = 0.1;
const POST_EXIT_DELAY_MS = 200;
const CYCLE_DURATION_S =
  POST_SLIDE_DELAY_MS / 1000 +
  (TEXT_ENTER_S + TEXT_ENTER_STAGGER_S * 2) +
  TEXT_HOLD_MS / 1000 +
  (TEXT_EXIT_S + TEXT_EXIT_STAGGER_S * 2) +
  POST_EXIT_DELAY_MS / 1000;

type Slide = {
  id: string;
  image: string;
  alt: string;
  titleTop: string;
  titleBottom: string;
  description: string;
};

const SLIDES: Slide[] = [
  {
    id:"1",
    image:
      "images/hero/image1.avif",
    alt: "Craftsmen ",
    titleTop: "Craftsmen ",
    titleBottom: "Construction Companies",
    description:
      "High-quality construction documentation, transparent service offerings and automated preliminary inquiries: We present your craftsmanship as precisely and masterfully as your work on site.",
  },
  {
    id:"2",
    image:
      "images/hero/image2.avif",
    alt: "Carved wooden lounge chair beside a warm textured wall",
    titleTop: "Medical Practices",
    titleBottom: "HEALTHCARE",
    description:
      "A calm, confidence-building practice design with barrier-free patient guidance, digital appointment scheduling and clear structuring of the specialist disciplines.",
  },
  {
    id:"3",
    image:
      "images/hero/image3.avif",
    alt: "Modern oak cabinet in a minimal, sunlit living space",
    titleTop: "Lawyers",
    titleBottom: "Tax Advisors",
    description:
      "A confident legal presence with excellent typography and clear profiling of your legal areas — optimized for discerning private and business clients.",
  },
  {
    id:"4",
    image:
      "images/hero/image4.avif",
    alt: "Artisan dining set with wooden chairs around a long table",
    titleTop: "real estate agent",
    titleBottom: "REAL ESTATE UI",
    description:
      "Exclusive property presentations with interactive floor plans, filter functions and automatic OpenImmo import for maximum marketing speed.",
  },
    {
    id:"5",
    image:
      "images/hero/image5.avif",
    alt: "Artisan dining set with wooden chairs around a long table",
    titleTop: "Motor vehicles",
    titleBottom: "Automotive",
    description:
      "Dynamic vehicle presentation, transparent workshop services and direct online test drive bookings in a modern premium ambience.",
  },
    {
    id:"6",
    image:
      "images/hero/image6.avif",
    alt: "Artisan dining set with wooden chairs around a long table",
    titleTop: "Small & large ",
    titleBottom: "companies",
    description:
      "Scalable corporate identities that combine brand, employer branding and sales — coded for high performance and easy for employees to maintain.",
  },
   {
    id:"7",
    image:
      "images/hero/image7.jpg",
    alt: "Artisan dining set with wooden chairs around a long table",
    titleTop: "Individual solutions",
    titleBottom: "DINING SETS",
    description:
      "Tailor-made web applications, individual portals and customized interfaces — perfectly suited to specific digital business models.",
  },
];

const TRACK_SLIDES: Slide[] = [...SLIDES, SLIDES[0]];

const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export default function HeroSection({ lang }: LangProp) {
  const [activeIndex, setActiveIndex] = useState(0);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const topRef = useRef<HTMLHeadingElement | null>(null);
  const descTextRef = useRef<HTMLParagraphElement | null>(null);
  const bottomRef = useRef<HTMLHeadingElement | null>(null);
  const loaderFillRef = useRef<HTMLDivElement | null>(null);


  const trackPositionRef = useRef(0);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mql.matches;
    const onChange = () => {
      reducedMotionRef.current = mql.matches;
    };
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const xPercentForPosition = (position: number) =>
      -(position * 100) / TRACK_SLIDES.length;

    const startLoader = () => {
      if (!loaderFillRef.current) return;
      gsap.killTweensOf(loaderFillRef.current);
      if (reducedMotionRef.current) {
        gsap.set(loaderFillRef.current, { scaleX: 1 });
        return;
      }
      gsap.set(loaderFillRef.current, { scaleX: 0 });
      gsap.to(loaderFillRef.current, {
        scaleX: 1,
        duration: CYCLE_DURATION_S,
        ease: "none", 
      });
    };

    const writeSlideText = (index: number) => {
      const slide = SLIDES[index];
      if (topRef.current) topRef.current.textContent = slide.titleTop;
      if (descTextRef.current) descTextRef.current.textContent = slide.description;
      if (bottomRef.current) bottomRef.current.textContent = slide.titleBottom;
      setActiveIndex(index); 
      startLoader();
    };

    const slideTransition = (nextContentIndex: number) =>
      new Promise<void>((resolve) => {
        if (!trackRef.current) return resolve();

        const wrapping =
          nextContentIndex === 0 && trackPositionRef.current === SLIDES.length - 1;
        const targetPosition = wrapping
          ? SLIDES.length
          : trackPositionRef.current + 1;

        gsap.to(trackRef.current, {
          xPercent: xPercentForPosition(targetPosition),
          duration: reducedMotionRef.current ? 0 : SLIDE_TRANSITION_S,
          ease: "power3.inOut",
          overwrite: "auto",
          onComplete: () => {
            if (wrapping && trackRef.current) {
              gsap.set(trackRef.current, { xPercent: xPercentForPosition(0) });
              trackPositionRef.current = 0;
            } else {
              trackPositionRef.current = targetPosition;
            }
            resolve();
          },
        });
      });

    const animateTextEnter = () =>
      new Promise<void>((resolve) => {
        const els = [topRef.current, descTextRef.current, bottomRef.current];
        if (reducedMotionRef.current) {
          gsap.set(els, { opacity: 1, y: 0 });
          return resolve();
        }
        gsap.timeline({ onComplete: resolve, defaults: { overwrite: "auto" } }).fromTo(
          els,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: TEXT_ENTER_S,
            ease: "power3.out",
            stagger: TEXT_ENTER_STAGGER_S,
          }
        );
      });

    const animateTextExit = () =>
      new Promise<void>((resolve) => {
        const els = [topRef.current, descTextRef.current, bottomRef.current];
        if (reducedMotionRef.current) {
          gsap.set(els, { opacity: 0 });
          return resolve();
        }
        gsap.timeline({ onComplete: resolve, defaults: { overwrite: "auto" } }).to(els, {
          opacity: 0,
          y: -30,
          duration: TEXT_EXIT_S,
          ease: "power2.in",
          stagger: TEXT_EXIT_STAGGER_S,
        });
      });

    async function run() {
      writeSlideText(0);
      let current = 0;

      while (!cancelled) {
        await delay(POST_SLIDE_DELAY_MS);
        if (cancelled) return;

        await animateTextEnter();
        if (cancelled) return;

        await delay(TEXT_HOLD_MS);
        if (cancelled) return;

        await animateTextExit();
        if (cancelled) return;

        await delay(POST_EXIT_DELAY_MS);
        if (cancelled) return;

        const next = (current + 1) % SLIDES.length;
        await slideTransition(next);
        if (cancelled) return;

        writeSlideText(next);
        current = next;
      }
    }
    gsap.set([topRef.current, descTextRef.current, bottomRef.current], {
      opacity: 0,
      y: 30,
    });

    run();

    return () => {
      cancelled = true;
      gsap.killTweensOf(trackRef.current);
      gsap.killTweensOf([topRef.current, descTextRef.current, bottomRef.current]);
      gsap.killTweensOf(loaderFillRef.current);
    };
  }, []);

  return (
    <section className="relative flex h-svh w-full flex-col overflow-hidden bg-[#241812] text-[#f4ede3]">
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={trackRef}
          className="flex h-full"
          style={{
            width: `${TRACK_SLIDES.length * 100}%`,
            transform: "translateX(0%)",
            willChange: "transform",
          }}
        >
          {TRACK_SLIDES.map((s, i) => (
            <div
              key={`${s.image}-${i}`}
              className="relative h-full shrink-0"
              style={{ width: `${100 / TRACK_SLIDES.length}%` }}
            >
              <Image
                src={s.image}
                alt={s.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/55 via-black/25 to-black/60" />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-between px-5 pb-6 pt-24 sm:px-8 sm:pb-10 sm:pt-28 md:pt-24 lg:px-12 lg:pb-12 lg:pt-40">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-start">
          <h1
            ref={topRef}
            className="font-serif leading-[0.85] tracking-tight text-[#f4ede3]"
            style={{ fontSize: "clamp(2.5rem, min(11vw, 12vh), 8.5rem)" }}
          />

          <div className="max-w-xs font-sans text-[0.8rem] leading-relaxed text-[#f4ede3]/90 md:pt-3 md:text-right">
            <p ref={descTextRef} />
            <a
              href="#"
              className="mt-4 inline-block text-[0.7rem] tracking-[0.2em] text-[#f4ede3] underline decoration-[#f4ede3]/40 underline-offset-4 transition-colors duration-200 hover:decoration-[#f4ede3]"
            >
              EXPLORE THE SELECTION
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-6 sm:mt-12 md:mt-16 md:flex-row md:items-end md:gap-4 lg:mt-24">
          <div
            className="flex items-center gap-4 font-sans text-xs tracking-widest text-[#f4ede3]/80"
            role="status"
            aria-live="polite"
            aria-label={`Slide ${activeIndex + 1} of ${SLIDES.length}`}
          >

            <div className="flex items-center gap-3">
              {SLIDES.map((s, i) => (
                <span
                  key={s.image}
                  className={`inline-block w-4 text-center transition-colors duration-500 ease-out ${
                    i === activeIndex ? "text-[#f4ede3]" : "text-[#f4ede3]/45"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              ))}
            </div>

            <div className="h-px w-14 overflow-hidden rounded-full bg-[#f4ede3]/25 sm:w-20">
              <div
                ref={loaderFillRef}
                className="h-full w-full origin-left rounded-full bg-[#f4ede3]"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
          </div>

          <h2
            ref={bottomRef}
            className="self-end font-serif leading-[0.85] tracking-tight text-[#f4ede3] md:text-right"
            style={{ fontSize: "clamp(2.25rem, min(10vw, 11vh), 7.5rem)" }}
          />
        </div>
      </div>
    </section>
  );
}
