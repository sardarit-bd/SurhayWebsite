"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ServiceRow from "./Servicerow";
import { getServices } from "./Services.data";
import { useTranslations } from "../../i18n/utils";
import type { LangProp } from "../../lib/props";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ServicesSection({ lang }: LangProp) {
  const t = useTranslations(lang);
  const services = getServices(lang);
  const sectionRef = useRef<HTMLElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);

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

      rowRefs.current.forEach((row) => {
        if (!row) return;

        gsap.fromTo(
          row,
          { x: -60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-paper px-6 py-section text-ink sm:px-10 lg:px-16"
    >
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-14 md:mb-20">
          <div ref={lineRef} className="mb-8 h-px w-full bg-(--line)" />

          <div
            ref={headerRef}
            className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end"
          >
            <span className="font-mono text-xs tracking-widest text-mute lg:col-span-2 lg:pb-3">
              (02)
            </span>

            <h2 className="h2 lg:col-span-7">
              {t("svc.title.a")}{" "}
              <span className="text-mute">{t("svc.title.mark")}</span>
              <br />
              {t("svc.title.b")}
            </h2>

            <p className="max-w-xs text-sm leading-relaxed text-mute lg:col-span-3 lg:justify-self-end lg:pb-2">
              {t("svc.sub")}
            </p>
          </div>
        </div>

        {/* Service rows */}
        <div>
          {services.map((service, index) => (
            <ServiceRow
              key={service.number}
              service={service}
              isLast={index === services.length - 1}
              ref={(el) => {
                rowRefs.current[index] = el;
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}