"use client";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import gsap from "gsap";
import type { LangProp, PfadProp } from "../lib/props";
import { useTranslations, localePath, path } from "../i18n/utils";
import { locales, localeMeta, type Lang, type UiKey } from "../i18n/ui";
import type { RouteKey } from "../i18n/routes";

const NAV_LINKS: { key: UiKey; route?: RouteKey; hash?: string }[] = [
  { key: "header.services", route: "services" },
  { key: "header.industries", hash: "branchen" },
  { key: "header.projects", route: "work" },
  { key: "header.process", route: "process" },
  { key: "header.about", route: "about" },
  { key: "nav.blog", route: "blog" },
  { key: "nav.faq", route: "faq" },
];

const SCROLL_THRESHOLD = 24;

const trim = (p: string) => p.replace(/\/+$/, "") || "/";

export interface ServiceMenuItem {
  id: string;
  index: string;
  title: string;
  tagline: string;
  href: string;
  /** Inner markup of the Lucide <svg> (from serviceIcons). */
  icon: string;
}

interface Props extends LangProp, Partial<PfadProp> {
  alternates: Record<Lang, string>;
  serviceMenu: ServiceMenuItem[];
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

function ServicesMenu({
  label,
  href,
  solid,
  allLabel,
  hint,
  items,
}: {
  label: string;
  href: string;
  solid: boolean;
  allLabel: string;
  hint: string;
  items: ServiceMenuItem[];
}) {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(true);
  };
  const hide = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(false), 200);
  };

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) hide();
      }}
    >
      <a
        href={href}
        aria-haspopup="true"
        aria-expanded={open}
        className={`inline-flex items-center gap-1 transition-colors duration-200 ${
          solid
            ? "text-neutral-700 hover:text-neutral-950"
            : "text-white/90 hover:text-white"
        }`}
      >
        {label}
        <FiChevronDown
          aria-hidden
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </a>
      <div
        className={`pointer-events-none absolute inset-x-0 top-full px-5 pt-2 transition-[opacity,transform,visibility] duration-200 sm:px-8 lg:px-12 ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1.5 opacity-0"
        }`}
      >
        <div className="pointer-events-auto mx-auto max-w-5xl overflow-hidden rounded-2xl border border-ink/10 bg-paper text-ink shadow-xl">
          <ul className="grid md:grid-cols-2">
            {items.map((item, i) => (
              <li
                key={item.id}
                className={`border-ink/10 ${i % 2 === 0 ? "md:border-r" : ""} ${
                  i < items.length - 2 ? "md:border-b" : ""
                }`}
              >
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="group flex gap-4 p-6 transition-colors duration-150 hover:bg-paper-2 focus-visible:bg-paper-2"
                >
                  <svg
                    className="mt-0.5 size-5 shrink-0 text-mute transition-colors duration-150 group-hover:text-accent-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    dangerouslySetInnerHTML={{ __html: item.icon }}
                  />
                  <span className="min-w-0">
                    <span className="flex items-baseline gap-3">
                      <span className="font-mono text-xs text-mute">
                        {item.index}
                      </span>
                      <span className="font-display text-base font-bold text-ink">
                        {item.title}
                      </span>
                    </span>
                    <span className="mt-2 block text-sm leading-relaxed text-mute">
                      {item.tagline}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between gap-6 border-t border-ink/10 bg-paper-2 px-6 py-4">
            <p className="max-w-sm text-sm text-mute">{hint}</p>
            <a
              href={href}
              onClick={() => setOpen(false)}
              className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-ink transition-colors duration-150 hover:text-accent-600"
            >
              {allLabel}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

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

export default function Header({ lang, alternates, serviceMenu }: Props) {
  const t = useTranslations(lang);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const isHome = trim(pathname ?? "/") === trim(localePath(lang, "/"));
  const solid = scrolled || !isHome;
  const requestHref = path(lang, "contact");
  const navItems = NAV_LINKS.map(({ key, route, hash }) => ({
    key,
    label: t(key),
    href: route
      ? path(lang, route)
      : hash
        ? `${localePath(lang, "/")}#${hash}`
        : "#",
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
          { autoAlpha: 1, duration: 0.4 },
        )
        .fromTo(
          ".mobile-nav-link",
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, stagger: 0.06 },
          "-=0.2",
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
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMenuOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full transition-[background-color,border-color,backdrop-filter] duration-300 ${
        solid
          ? " bg-[#efe9e0]/95 backdrop-blur-sm shadow"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-12">
        <a
          href={localePath(lang, "/")}
          className="flex shrink-0 items-center font-sans text-lg sm:text-xl"
        >
          <span
            className={`font-bold transition-colors duration-300 ${
              solid ? "text-neutral-900" : "text-white"
            }`}
          >
            Surhay
          </span>
          <span className="mx-[0.15em] text-teal-600">•</span>
          <span
            className={`font-normal transition-colors duration-300 ${
              solid ? "text-neutral-500" : "text-white/80"
            }`}
          >
            Design
          </span>
        </a>

        <nav className="hidden items-center gap-8 font-sans text-sm md:flex">
          {navItems.map((link) =>
            link.key === "header.services" ? (
              <ServicesMenu
                key={link.key}
                label={link.label}
                href={link.href}
                solid={solid}
                allLabel={t("nav.allServices")}
                hint={t("nav.servicesHint")}
                items={serviceMenu}
              />
            ) : (
              <NavLink
                key={link.key}
                label={link.label}
                href={link.href}
                scrolled={solid}
              />
            ),
          )}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher
            lang={lang}
            alternates={alternates}
            label={t("nav.langSwitch")}
            tone={solid ? "dark" : "light"}
          />
          <a
            href={requestHref}
            className="hidden rounded-md bg-accent-800 px-4 py-2.5 font-sans text-sm font-semibold text-white transition-colors duration-200 hover:bg-teal-800 lg:block"
          >
            {t("header.request")}
          </a>
        </div>

        <button
          ref={toggleRef}
          type="button"
          aria-label={menuOpen ? t("nav.menuClose") : t("nav.menuOpen")}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className={`relative z-50 flex items-center justify-center text-xl transition-colors duration-300 md:hidden ${
            menuOpen ? "text-white" : solid ? "text-neutral-900" : "text-white"
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
              {link.key === "header.services" && (
                <ul className="mt-3 flex flex-col gap-2 pl-4">
                  {serviceMenu.map((item) => (
                    <li key={item.id}>
                      <a
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="text-lg text-white/70 transition-colors duration-200 hover:text-white"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>

        <div className="mobile-nav-link pt-8">
          <LanguageSwitcher
            lang={lang}
            alternates={alternates}
            label={t("nav.langSwitch")}
            variant="list"
            onNavigate={() => setMenuOpen(false)}
          />
        </div>

        <div className="mobile-nav-link mt-auto flex items-center gap-3 pt-8">
          <a
            href={requestHref}
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
