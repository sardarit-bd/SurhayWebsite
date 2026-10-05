"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCardVertical from "./ProjectCardVertical";
import { getWorkProjects } from "./Work.data";
import { useTranslations } from "../../i18n/utils";
import type { LangProp } from '../../lib/props';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WorkSection({ lang }: LangProp) {
  const t = useTranslations(lang);
  const projects = getWorkProjects(lang);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, [lang]); // Re-run if lang changes

  return (
    <section className="w-full px-6 sm:px-10 lg:px-16 py-16 md:py-24 bg-neutral-50 dark:bg-neutral-950">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 lg:gap-10 w-full">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase leading-tight text-neutral-900 dark:text-white">
              {t("work.title.a")}{" "}
              <span className="text-neutral-400">{t("work.title.mark")}</span>
              <br />
              {t("work.title.b")}
            </h2>

            <p className="text-sm text-neutral-500 max-w-55 lg:mb-2 lg:text-left mx-auto lg:mx-0">
              {t("work.sub")}
            </p>
          </div>
        </div>

        {/* Project cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
            >
              <ProjectCardVertical {...project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}