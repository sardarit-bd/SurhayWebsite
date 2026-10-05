"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ServiceRow from "./Servicerow";
import { getServices } from "./Services.data";
import { useTranslations } from "../../i18n/utils";
import type { LangProp } from '../../lib/props';
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ServicesSection({ lang }: LangProp) {
  const t = useTranslations(lang);
  const services = getServices(lang);
  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full  px-6 sm:px-10 lg:px-16 py-16 md:py-24">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 lg:gap-10 w-full">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase leading-tight">
              {t("svc.title.a")}{" "}
              <span className="text-neutral-300">{t("svc.title.mark")}</span>
              <br />
              {t("svc.title.b")}
            </h2>

            <p className="text-sm text-neutral-500 max-w-55 lg:mb-2 lg:text-left mx-auto lg:mx-0">
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