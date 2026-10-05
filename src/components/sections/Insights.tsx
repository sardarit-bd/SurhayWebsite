"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";
import { t, path } from "../../i18n/utils";
import type { Lang, UiKey } from "../../i18n/ui";
import type { LangProp } from '../../lib/props';

type ServiceItem = {
  id: string;
  slug: string;
  title: string;
  label: string;
  shortTitle: string;
  description: string;
  detailedDescription: string;
  features: string[];
  deliverables: string[];
  image: string;
  fallbackImage: string;
  imageSrc: string;
  href: string;
  bgClass: string;
  color: string;
  isBtnWhite: boolean;
  bthIsWhite: boolean;
  badgeTitle: string;
  stats: { label: string; value: string }[];
  processSteps: { step: string; title: string; description: string }[];
};

function getServicesData(lang: Lang): ServiceItem[] {
  const k = (key: string) => `svcShow.${key}` as UiKey;
  
  return [
    {
      id: "brand-identity",
      slug: "brand-identity",
      title: t(k("p1.title"), lang),
      label: t(k("p1.label"), lang),
      shortTitle: t(k("p1.shortTitle"), lang),
      description: t(k("p1.description"), lang),
      detailedDescription: t(k("p1.detailedDescription"), lang),
      features: [t(k("p1.f1"), lang), t(k("p1.f2"), lang), t(k("p1.f3"), lang), t(k("p1.f4"), lang)],
      deliverables: [t(k("p1.d1"), lang), t(k("p1.d2"), lang), t(k("p1.d3"), lang), t(k("p1.d4"), lang)],
      image: "/images/project/CASA.webp",
      fallbackImage: "/images/project/CASA.webp",
      imageSrc: "/images/project/CASA.webp",
      href: lang === "de" ? "/leistungen/brand-identity" : "/en/services/brand-identity",
      bgClass: "bg-white border border-neutral-200/80",
      color: "text-neutral-900",
      isBtnWhite: false,
      bthIsWhite: false,
      badgeTitle: t(k("p1.badgeTitle"), lang),
      stats: [
        { label: t(k("stat1"), lang), value: "500+" },
        { label: t(k("stat2"), lang), value: "99%" },
        { label: t(k("stat3"), lang), value: "60+" },
        { label: t(k("stat4"), lang), value: "100%" },
      ],
      processSteps: [
        { step: "01", title: t(k("p1.ps1.title"), lang), description: t(k("p1.ps1.desc"), lang) },
        { step: "02", title: t(k("p1.ps2.title"), lang), description: t(k("p1.ps2.desc"), lang) },
        { step: "03", title: t(k("p1.ps3.title"), lang), description: t(k("p1.ps3.desc"), lang) },
        { step: "04", title: t(k("p1.ps4.title"), lang), description: t(k("p1.ps4.desc"), lang) },
      ],
    },
    {
      id: "web-mobile-development",
      slug: "web-mobile-development",
      title: t(k("p2.title"), lang),
      label: t(k("p2.label"), lang),
      shortTitle: t(k("p2.shortTitle"), lang),
      description: t(k("p2.description"), lang),
      detailedDescription: t(k("p2.detailedDescription"), lang),
      features: [t(k("p2.f1"), lang), t(k("p2.f2"), lang), t(k("p2.f3"), lang), t(k("p2.f4"), lang)],
      deliverables: [t(k("p2.d1"), lang), t(k("p2.d2"), lang), t(k("p2.d3"), lang), t(k("p2.d4"), lang)],
      image: "/images/services/web-performance.webp",
      fallbackImage: "/images/services/web-performance.webp",
      imageSrc: "/images/services/mobile-dual-mockup.webp",
      href: lang === "de" ? "/leistungen/web-mobile-development" : "/en/services/web-mobile-development",
      bgClass: "bg-[#0B1120]",
      color: "text-white",
      isBtnWhite: true,
      bthIsWhite: true,
      badgeTitle: t(k("p2.badgeTitle"), lang),
      stats: [
        { label: t(k("stat1"), lang), value: "500+" },
        { label: t(k("stat3"), lang), value: "60+" },
        { label: t(k("p2.stat3"), lang), value: "99.99%" },
        { label: t(k("p2.stat4"), lang), value: "98/100" },
      ],
      processSteps: [
        { step: "01", title: t(k("p2.ps1.title"), lang), description: t(k("p2.ps1.desc"), lang) },
        { step: "02", title: t(k("p2.ps2.title"), lang), description: t(k("p2.ps2.desc"), lang) },
        { step: "03", title: t(k("p2.ps3.title"), lang), description: t(k("p2.ps3.desc"), lang) },
        { step: "04", title: t(k("p2.ps4.title"), lang), description: t(k("p2.ps4.desc"), lang) },
      ],
    },
    {
      id: "ai-automation-solutions",
      slug: "ai-automation-solutions",
      title: t(k("p3.title"), lang),
      label: t(k("p3.label"), lang),
      shortTitle: t(k("p3.shortTitle"), lang),
      description: t(k("p3.description"), lang),
      detailedDescription: t(k("p3.detailedDescription"), lang),
      features: [t(k("p3.f1"), lang), t(k("p3.f2"), lang), t(k("p3.f3"), lang), t(k("p3.f4"), lang)],
      deliverables: [t(k("p3.d1"), lang), t(k("p3.d2"), lang), t(k("p3.d3"), lang), t(k("p3.d4"), lang)],
      image: "/images/services/isometric-ai-core.png",
      fallbackImage: "/images/services/isometric-ai-core.png",
      imageSrc: "/images/services/isometric-ai-core.png",
      href: lang === "de" ? "/leistungen/ai-automation-solutions" : "/en/services/ai-automation-solutions",
      bgClass: "bg-[#133BD4]",
      color: "text-white",
      isBtnWhite: true,
      bthIsWhite: true,
      badgeTitle: t(k("p3.badgeTitle"), lang),
      stats: [
        { label: t(k("stat1"), lang), value: "500+" },
        { label: t(k("stat3"), lang), value: "60+" },
        { label: t(k("p3.stat3"), lang), value: "85%+" },
        { label: t(k("p2.stat3"), lang), value: "99.99%" },
      ],
      processSteps: [
        { step: "01", title: t(k("p3.ps1.title"), lang), description: t(k("p3.ps1.desc"), lang) },
        { step: "02", title: t(k("p3.ps2.title"), lang), description: t(k("p3.ps2.desc"), lang) },
        { step: "03", title: t(k("p3.ps3.title"), lang), description: t(k("p3.ps3.desc"), lang) },
        { step: "04", title: t(k("p3.ps4.title"), lang), description: t(k("p3.ps4.desc"), lang) },
      ],
    },
    {
      id: "digital-marketing",
      slug: "digital-marketing",
      title: t(k("p4.title"), lang),
      label: t(k("p4.label"), lang),
      shortTitle: t(k("p4.shortTitle"), lang),
      description: t(k("p4.description"), lang),
      detailedDescription: t(k("p4.detailedDescription"), lang),
      features: [t(k("p4.f1"), lang), t(k("p4.f2"), lang), t(k("p4.f3"), lang), t(k("p4.f4"), lang)],
      deliverables: [t(k("p4.d1"), lang), t(k("p4.d2"), lang), t(k("p4.d3"), lang), t(k("p4.d4"), lang)],
      image: "/images/services/digital-marketing.png",
      fallbackImage: "/images/services/digital-marketing.png",
      imageSrc: "/images/services/digital-marketing.png",
      href: lang === "de" ? "/leistungen/digital-marketing" : "/en/services/digital-marketing",
      bgClass: "bg-[#F1F5F9]",
      color: "text-neutral-900",
      isBtnWhite: false,
      bthIsWhite: false,
      badgeTitle: t(k("p4.badgeTitle"), lang),
      stats: [
        { label: t(k("p4.stat1"), lang), value: "2.5x" },
        { label: t(k("p4.stat2"), lang), value: "+210%" },
        { label: t(k("p4.stat3"), lang), value: "4.2x" },
      ],
      processSteps: [
        { step: "01", title: t(k("p4.ps1.title"), lang), description: t(k("p4.ps1.desc"), lang) },
        { step: "02", title: t(k("p4.ps2.title"), lang), description: t(k("p4.ps2.desc"), lang) },
        { step: "03", title: t(k("p4.ps3.title"), lang), description: t(k("p4.ps3.desc"), lang) },
        { step: "04", title: t(k("p4.ps4.title"), lang), description: t(k("p4.ps4.desc"), lang) },
      ],
    },
  ];
}

export function ServiceShowcaseCard({ lang }: LangProp) {
  const services = getServicesData(lang);

  return (
    <section className="flex flex-col gap-8 sm:gap-10 lg:gap-14 w-full items-center justify-center px-6 md:px-10 py-10 sm:py-12 lg:py-16">
      <div className="container mx-auto px-6 md:px-12" />

      <div className="w-full container mx-auto flex flex-col gap-4 sm:gap-6 md:gap-10 lg:gap-12 relative pb-10 sm:pb-14 lg:pb-20">
        {services.map((service, index) => {
          const isDark = service.color === "text-white";
          const isBlue = service.bgClass?.includes("#133BD4");

          return (
            <div
              key={service.id}
              style={{ top: `calc(100px + ${index * 30}px)` }}
              className={`sticky max-h-[85dvh] sm:max-h-[80dvh] lg:max-h-none w-full flex flex-col lg:flex-row overflow-hidden shadow transition-all duration-300 rounded-2xl sm:rounded-3xl ${
                !isDark ? "border border-neutral-200/80" : "border border-neutral-800"
              }`}
            >
              <motion.div
                initial={{ opacity: 1, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`flex flex-1 flex-col justify-between gap-4 sm:gap-6 lg:gap-10 p-4 sm:p-6 lg:basis-[55%] lg:p-12 ${service.bgClass} ${service.color || "text-neutral-900"}`}
              >
                <div className="flex flex-col gap-3 sm:gap-4 lg:gap-6">
                  <div className="flex items-center justify-between">
                    <h3 className={`text-lg font-bold leading-snug sm:text-2xl sm:leading-tight lg:text-4xl ${isDark ? "text-white" : "text-neutral-900"}`}>
                      {service.title}
                    </h3>
                  </div>

                  <p className={`text-xs font-normal leading-relaxed sm:text-sm lg:text-lg ${isDark ? (isBlue ? "text-blue-100" : "text-neutral-300") : "text-neutral-600"}`}>
                    {service.description}
                  </p>

                  <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 sm:gap-x-4 sm:gap-y-2.5">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex flex-row items-center gap-1.5 sm:gap-2">
                        <GoDotFill className={`shrink-0 text-[10px] sm:text-sm ${isDark ? (isBlue ? "text-blue-200" : "text-[#133BD4]") : "text-[#133BD4]"}`} />
                        <span className={`text-[11px] font-medium leading-snug sm:text-sm lg:text-base ${isDark ? (isBlue ? "text-white" : "text-neutral-200") : "text-neutral-700"}`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={service.href}
                  className={`group w-full sm:w-fit justify-center inline-flex items-center gap-2 sm:gap-3 px-4 py-2 sm:px-5 sm:py-3 rounded-full ${
                    (service.isBtnWhite ?? service.bthIsWhite)
                      ? "bg-white text-neutral-950 hover:bg-neutral-100"
                      : "bg-neutral-950 text-white hover:bg-neutral-800"
                  } font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 hover:scale-[1.02] shadow-sm`}
                >
                  <span>{t("svcShow.cta" as UiKey, lang)}</span>
                  <span className={`flex items-center justify-center size-6 sm:size-7 rounded-full ${
                    (service.isBtnWhite ?? service.bthIsWhite) ? "bg-neutral-100 text-neutral-950" : "bg-neutral-800 text-white"
                  } transition-all duration-300`}>
                    <FiArrowUpRight className="text-sm sm:text-base transition-transform duration-300 group-hover:rotate-45" />
                  </span>
                </Link>
              </motion.div>

              <div className="relative flex w-full flex-1 lg:w-7/12 lg:basis-[45%] min-h-32 sm:min-h-56 lg:min-h-105 bg-neutral-100 overflow-hidden">
                <Image
                  src={service.imageSrc || service.image || service.fallbackImage || "/images/project/CASA.webp"}
                  alt={`${service.title} showcase`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                  priority={index < 2}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ServiceShowcaseCard;