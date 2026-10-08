"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import { t } from "../../i18n/utils";
import type { Lang, UiKey } from "../../i18n/ui";
import type { LangProp } from "../../lib/props";

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
      features: [
        t(k("p1.f1"), lang),
        t(k("p1.f2"), lang),
        t(k("p1.f3"), lang),
        t(k("p1.f4"), lang),
      ],
      deliverables: [
        t(k("p1.d1"), lang),
        t(k("p1.d2"), lang),
        t(k("p1.d3"), lang),
        t(k("p1.d4"), lang),
      ],
      image: "/images/project/image4.webp",
      fallbackImage: "/images/project/image4.webp",
      imageSrc: "/images/project/image4.webp",
      href:
        lang === "de"
          ? "/leistungen/brand-identity"
          : "/en/services/brand-identity",
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
        {
          step: "01",
          title: t(k("p1.ps1.title"), lang),
          description: t(k("p1.ps1.desc"), lang),
        },
        {
          step: "02",
          title: t(k("p1.ps2.title"), lang),
          description: t(k("p1.ps2.desc"), lang),
        },
        {
          step: "03",
          title: t(k("p1.ps3.title"), lang),
          description: t(k("p1.ps3.desc"), lang),
        },
        {
          step: "04",
          title: t(k("p1.ps4.title"), lang),
          description: t(k("p1.ps4.desc"), lang),
        },
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
      features: [
        t(k("p2.f1"), lang),
        t(k("p2.f2"), lang),
        t(k("p2.f3"), lang),
        t(k("p2.f4"), lang),
      ],
      deliverables: [
        t(k("p2.d1"), lang),
        t(k("p2.d2"), lang),
        t(k("p2.d3"), lang),
        t(k("p2.d4"), lang),
      ],
      image: "/images/project/image5.avif",
      fallbackImage: "/images/project/image5.avif",
      imageSrc: "/images/project/image5.avif",
      href:
        lang === "de"
          ? "/leistungen/web-mobile-development"
          : "/en/services/web-mobile-development",
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
        {
          step: "01",
          title: t(k("p2.ps1.title"), lang),
          description: t(k("p2.ps1.desc"), lang),
        },
        {
          step: "02",
          title: t(k("p2.ps2.title"), lang),
          description: t(k("p2.ps2.desc"), lang),
        },
        {
          step: "03",
          title: t(k("p2.ps3.title"), lang),
          description: t(k("p2.ps3.desc"), lang),
        },
        {
          step: "04",
          title: t(k("p2.ps4.title"), lang),
          description: t(k("p2.ps4.desc"), lang),
        },
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
      features: [
        t(k("p3.f1"), lang),
        t(k("p3.f2"), lang),
        t(k("p3.f3"), lang),
        t(k("p3.f4"), lang),
      ],
      deliverables: [
        t(k("p3.d1"), lang),
        t(k("p3.d2"), lang),
        t(k("p3.d3"), lang),
        t(k("p3.d4"), lang),
      ],
      image: "/images/project/image6.avif",
      fallbackImage: "/images/project/image6.avif",
      imageSrc: "/images/project/image6.avif",
      href:
        lang === "de"
          ? "/leistungen/ai-automation-solutions"
          : "/en/services/ai-automation-solutions",
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
        {
          step: "01",
          title: t(k("p3.ps1.title"), lang),
          description: t(k("p3.ps1.desc"), lang),
        },
        {
          step: "02",
          title: t(k("p3.ps2.title"), lang),
          description: t(k("p3.ps2.desc"), lang),
        },
        {
          step: "03",
          title: t(k("p3.ps3.title"), lang),
          description: t(k("p3.ps3.desc"), lang),
        },
        {
          step: "04",
          title: t(k("p3.ps4.title"), lang),
          description: t(k("p3.ps4.desc"), lang),
        },
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
      features: [
        t(k("p4.f1"), lang),
        t(k("p4.f2"), lang),
        t(k("p4.f3"), lang),
        t(k("p4.f4"), lang),
      ],
      deliverables: [
        t(k("p4.d1"), lang),
        t(k("p4.d2"), lang),
        t(k("p4.d3"), lang),
        t(k("p4.d4"), lang),
      ],
      image: "/images/project/image7.jpg",
      fallbackImage: "/images/project/image7.jpg",
      imageSrc: "/images/project/image7.jpg",
      href:
        lang === "de"
          ? "/leistungen/digital-marketing"
          : "/en/services/digital-marketing",
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
        {
          step: "01",
          title: t(k("p4.ps1.title"), lang),
          description: t(k("p4.ps1.desc"), lang),
        },
        {
          step: "02",
          title: t(k("p4.ps2.title"), lang),
          description: t(k("p4.ps2.desc"), lang),
        },
        {
          step: "03",
          title: t(k("p4.ps3.title"), lang),
          description: t(k("p4.ps3.desc"), lang),
        },
        {
          step: "04",
          title: t(k("p4.ps4.title"), lang),
          description: t(k("p4.ps4.desc"), lang),
        },
      ],
    },
  ];
}

type Theme = {
  card: string;
  muted: string;
  line: string;
  accent: string;
  btn: string;
  btnArrow: string;
  fade: string;
};

const THEMES: Theme[] = [
  {
    card: "bg-paper text-ink border-(--line)",
    muted: "text-mute",
    line: "border-(--line)",
    accent: "bg-accent-600",
    btn: "bg-ink text-paper hover:bg-accent-800",
    btnArrow: "bg-paper/15",
    fade: "from-paper",
  },
  {
    card: "bg-ink text-paper border-(--line-dark)",
    muted: "text-mute-dark",
    line: "border-(--line-dark)",
    accent: "bg-accent-400",
    btn: "bg-accent-400 text-ink hover:bg-accent-300",
    btnArrow: "bg-ink/10",
    fade: "from-ink",
  },
  {
    card: "bg-accent-800 text-white border-white/15",
    muted: "text-white/85",
    line: "border-white/20",
    accent: "bg-accent-100",
    btn: "bg-white text-ink hover:bg-accent-100",
    btnArrow: "bg-ink/10",
    fade: "from-accent-800",
  },
  {
    card: "bg-paper-2 text-ink border-(--line)",
    muted: "text-mute",
    line: "border-(--line)",
    accent: "bg-accent-600",
    btn: "bg-ink text-paper hover:bg-accent-800",
    btnArrow: "bg-paper/15",
    fade: "from-paper-2",
  },
];

export function Insights({ lang }: LangProp) {
  const services = getServicesData(lang);

  return (
    <section className="flex flex-col gap-8 sm:gap-10 lg:gap-14 w-full items-center justify-center px-6 md:px-10 py-10 sm:py-12 lg:py-16">
      <div className="w-full container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className="h2 lg:col-span-7">
            {t("insights.title" as UiKey, lang)}
          </h2>
          <p className="lead max-w-md text-mute lg:col-span-5 lg:justify-self-end">
            {t("insights.sub" as UiKey, lang)}
          </p>
        </div>
      </div>

      <div className="w-full container mx-auto flex flex-col gap-4 sm:gap-6 md:gap-10 lg:gap-12 relative pb-10 sm:pb-14 lg:pb-20">
        {services.map((service, index) => {
          const theme = THEMES[index % THEMES.length];
          const num = String(index + 1).padStart(2, "0");

          return (
            <div
              key={service.id}
              style={{ top: `calc(100px + ${index * 30}px)` }}
              className={`sticky max-h-[85dvh] sm:max-h-[80dvh] lg:max-h-none w-full flex flex-col lg:flex-row overflow-hidden rounded-2xl border ${theme.card}`}
            >
              <motion.div
                initial={{ opacity: 1, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-1 flex-col justify-between gap-6 p-5 sm:p-7 lg:basis-[55%] lg:gap-10 lg:p-12"
              >
                <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
                  {/* <div className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] sm:text-xs">
                    <span>{num}</span>
                    <span aria-hidden="true" className={`h-px w-8 ${theme.accent}`} />
                    <span className={theme.muted}>{service.label}</span>
                  </div> */}

                  <h3 className="font-display text-2xl font-bold leading-[1.05] tracking-tight sm:text-3xl lg:text-5xl">
                    {service.title}
                  </h3>

                  <p
                    className={`max-w-xl text-sm leading-relaxed sm:text-base lg:text-lg ${theme.muted}`}
                  >
                    {service.description}
                  </p>

                  <ul
                    className={`mt-1 grid grid-cols-1 border-b sm:grid-cols-2 sm:gap-x-8 ${theme.line}`}
                  >
                    {service.features.map((feature, i) => (
                      <li
                        key={i}
                        className={`flex items-center gap-3 border-t py-2.5 text-xs font-medium leading-snug sm:text-sm lg:text-base ${theme.line} ${
                          i === 1 ? "sm:border-t" : ""
                        } ${i >= 2 ? "sm:border-b-0" : ""}`}
                      >
                        <span
                          aria-hidden="true"
                          className={`h-px w-3 shrink-0 ${theme.accent}`}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={service.href}
                  className={`group inline-flex w-full items-center justify-between gap-4 rounded-full py-2 pl-5 pr-2 text-sm font-semibold transition-colors duration-(--dur-micro) ease-(--ease-micro) sm:w-fit sm:justify-center sm:gap-6 sm:text-base ${theme.btn}`}
                >
                  <span>{t("svcShow.cta" as UiKey, lang)}</span>
                  <span
                    className={`flex size-9 items-center justify-center rounded-full ${theme.btnArrow}`}
                  >
                    <FiArrowUpRight className="text-base transition-transform duration-300 group-hover:rotate-45" />
                  </span>
                </Link>
              </motion.div>
              <div
                className={`relative flex min-h-32 w-full flex-1 overflow-hidden border-t sm:min-h-56 lg:min-h-105 lg:w-7/12 lg:basis-[45%] lg:border-l lg:border-t-0 ${theme.line}`}
              >
                <Image
                  src={
                    service.imageSrc ||
                    service.image ||
                    service.fallbackImage ||
                    "/images/project/CASA.webp"
                  }
                  alt={`${service.title} showcase`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                  priority={index < 2}
                />
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-x-0 top-0 h-16 bg-linear-to-b to-transparent opacity-60 lg:hidden ${theme.fade}`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Insights;
