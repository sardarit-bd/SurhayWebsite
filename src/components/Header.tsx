"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import gsap from "gsap";
import type { LangProp, PfadProp } from "../lib/props";
import { useTranslations, localePath, path } from "../i18n/utils";
import { locales, localeMeta, type Lang, type UiKey } from "../i18n/ui";
import type { RouteKey } from "../i18n/routes";

/* Labels stehen in src/i18n/ui.ts (Schluessel header.*). Industries hat
   keine Route und bleibt "#", wie im Entwurf. */
const NAV_LINKS: { key: UiKey; route?: RouteKey }[] = [
  { key: "header.services", route: "services" },
  { key: "header.industries" },
  { key: "header.projects", route: "work" },
  { key: "header.process", route: "process" },
  { key: "header.about", route: "about" },
];

const SCROLL_THRESHOLD = 24;

interface Props extends LangProp, Partial<PfadProp> {
  alternates: Record<Lang, string>;
}

function NavLink({
  label,
  href,
  scrolled,
  className = "",
  onClick,
}: {
  label: string;
  href: string;
  scrolled: boolean;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`transition-colors duration-200 ${
        scrolled
          ? "text-neutral-700 hover:text-neutral-950"
          : "text-white/90 hover:text-white"
      } ${className}`}
    >
      {label}
    </a>
  );
}

/* Sprachumschalter: einfache Links, Ziel = gleiche Seite in der anderen
   Sprache (alternates kommt aus Base). Funktioniert ohne JavaScript. */
function LangLinks({
  lang,
  alternates,
  label,
  tone,
  className = "",
  onClick,
}: {
  lang: Lang;
  alternates: Record<Lang, string>;
  label: string;
  tone: "light" | "dark";
  className?: string;
  onClick?: () => void;
}) {
  const idle =
    tone === "dark"
      ? "text-neutral-500 hover:text-neutral-950"
      : "text-white/70 hover:text-white";
  const current = tone === "dark" ? "text-neutral-950" : "text-white";
  return (
    <ul
      aria-label={label}
      className={`flex items-center gap-3 font-sans text-sm ${className}`}
    >
      {locales.map((code) => {
        const meta = localeMeta[code];
        const isCurrent = code === lang;
        return (
          <li key={code}>
            <a
              href={alternates[code]}
              hrefLang={meta.hreflang}
              lang={meta.hreflang}
              aria-label={meta.native}
              aria-current={isCurrent ? "true" : undefined}
              onClick={onClick}
              className={`transition-colors duration-200 ${
                isCurrent ? `${current} font-semibold` : idle
              }`}
            >
              {meta.short}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default function Header({ lang, alternates }: Props) {
  const t = useTranslations(lang);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const navItems = NAV_LINKS.map(({ key, route }) => ({
    key,
    label: t(key),
    href: route ? path(lang, route) : "#",
  }));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      timelineRef.current = gsap
        .timeline({ paused: true, defaults: { ease: "power3.out" } })
        .fromTo(
          overlayRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.4 }
        )
        .fromTo(
          ".mobile-nav-link",
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, stagger: 0.06 },
          "-=0.2"
        );
    }, overlayRef);

    return () => ctx.revert();
  }, []);


  useEffect(() => {
    if (!timelineRef.current) return;
    if (menuOpen) {
      timelineRef.current.play();
    } else {
      timelineRef.current.reverse();
    }
  }, [menuOpen]);


  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled
          ? " bg-[#efe9e0]/95 backdrop-blur-sm shadow"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-12">
        <a href={localePath(lang, "/")} className="flex shrink-0 items-center font-sans text-lg sm:text-xl">
          <span
            className={`font-bold transition-colors duration-300 ${
              scrolled ? "text-neutral-900" : "text-white"
            }`}
          >
            Surhay
          </span>
          <span className="mx-[0.15em] text-teal-600">•</span>
          <span
            className={`font-normal transition-colors duration-300 ${
              scrolled ? "text-neutral-500" : "text-white/80"
            }`}
          >
            Design
          </span>
        </a>


        <nav className="hidden items-center gap-8 font-sans text-sm md:flex">
          {navItems.map((link) => (
            <NavLink key={link.key} label={link.label} href={link.href} scrolled={scrolled} />
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LangLinks
            lang={lang}
            alternates={alternates}
            label={t("nav.langSwitch")}
            tone={scrolled ? "dark" : "light"}
          />
          <a
            href="#"
            className="hidden rounded-md bg-teal-700 px-4 py-2.5 font-sans text-sm font-semibold text-white transition-colors duration-200 hover:bg-teal-800 lg:block"
          >
            {t("header.request")}
          </a>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? t("nav.menuClose") : t("nav.menuOpen")}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className={`relative z-50 flex items-center justify-center text-xl transition-colors duration-300 md:hidden ${
            menuOpen ? "text-white" : scrolled ? "text-neutral-900" : "text-white"
          }`}
        >
          {menuOpen ? <FiX aria-hidden /> : <FiMenu aria-hidden />}
        </button>
      </div>
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 flex h-dvh w-full flex-col overflow-y-auto bg-[#1c1410] px-5 pb-10 pt-28 sm:px-8 md:hidden"
        style={{ visibility: "hidden", opacity: 0 }}
      >
        <nav className="flex flex-1 flex-col justify-center gap-7 font-sans">
          {navItems.map((link) => (
            <div key={link.key} className="mobile-nav-link overflow-hidden">
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-3xl font-medium text-white/90 transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </a>
            </div>
          ))}
        </nav>

        <div className="mobile-nav-link pt-8">
          <LangLinks
            lang={lang}
            alternates={alternates}
            label={t("nav.langSwitch")}
            tone="light"
            className="gap-5 text-base"
            onClick={() => setMenuOpen(false)}
          />
        </div>

        <div className="mobile-nav-link mt-auto flex items-center gap-3 pt-8">
          <a
            href="#"
            onClick={() => setMenuOpen(false)}
            className="flex-1 rounded-md bg-teal-700 px-4 py-3 text-center font-sans text-sm font-semibold text-white transition-colors duration-200 hover:bg-teal-800"
          >
            {t("header.request")}
          </a>
        </div>
      </div>
    </header>
  );
}