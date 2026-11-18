"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCardVertical from "./ProjectCardVertical";
import { getWorkProjects } from "./Work.data";
import { useTranslations, path } from "../../i18n/utils";
import type { LangProp } from "../../lib/props";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WorkSection({ lang }: LangProp) {
  const t = useTranslations(lang);
  const projects = getWorkProjects(lang);
  const sectionRef = useRef<HTMLElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.1,
            ease: "power3.inOut",
            transformOrigin: "left center",
            scrollTrigger: { trigger: lineRef.current, start: "top 90%" },
          }
        );
      }

      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
          }
        );
      }

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay: (index % 3) * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section
      ref={sectionRef}
      className="dark-section w-full px-6 py-20 sm:px-10 md:py-32 lg:px-16"
    >
      <div className="container mx-auto">
        <div className="mb-14 md:mb-20">
          {/* <div
            ref={lineRef}
            className="mb-8 h-px w-full bg-(--line-dark)"
          /> */}
          <div
            ref={headerRef}
            className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end"
          >
            <h2 className="h2 text-paper lg:col-span-7">
              {t("work.title.a")}
              <span className="text-mute-dark">{t("work.title.mark")}</span>
              <br />
              {t("work.title.b")}
            </h2>
            <p className="max-w-xs text-sm leading-relaxed text-mute-dark lg:col-span-3 lg:justify-self-end lg:pb-2">
              {t("work.sub")}
            </p>
          </div>
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {projects.map((project, index) => (
              <div
                key={project.title}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="h-full"
              >
                <ProjectCardVertical {...project} index={index} />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-(--line-dark) bg-ink-2 p-8 md:p-12">
            <p className="font-display text-2xl font-semibold leading-tight tracking-tight text-paper md:text-3xl">
              {t("work.pending.title")}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-mute-dark md:text-base">
              {t("work.pending.sub")}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href={path(lang, "configurator")} className="btn btn-primary">
                {t("work.pending.cta")}
                <svg className="btn-arrow h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href={path(lang, "pricing")} className="btn btn-ghost">
                {t("work.pending.ctaSecondary")}
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}