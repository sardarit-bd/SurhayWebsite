"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { locales, localeMeta, type Lang } from "../i18n/ui";

const FLAGS: Record<Lang, string> = {
  de: "/flags/de.svg",
  en: "/flags/gb.svg",
  tr: "/flags/tr.svg",
};

type Props = {
  lang: Lang;
  alternates: Record<Lang, string>;
  label: string;
  tone?: "light" | "dark";
  variant?: "dropdown" | "list";
  onNavigate?: () => void;
};

const Flag = ({ code }: { code: Lang }) => (
  <Image
    src={FLAGS[code]}
    alt=""
    width={22}
    height={16}
    unoptimized
    className="h-4 w-5.5 shrink-0 rounded-[3px] border border-black/15 object-cover"
  />
);

export default function LanguageSwitcher({
  lang,
  alternates,
  label,
  tone = "dark",
  variant = "dropdown",
  onNavigate,
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (variant !== "dropdown") return;
    const onPointer = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [variant]);

  if (variant === "list") {
    return (
      <ul aria-label={label} className="flex flex-wrap items-center gap-2">
        {locales.map((code) => {
          const meta = localeMeta[code];
          const current = code === lang;
          return (
            <li key={code}>
              <a
                href={alternates[code]}
                hrefLang={meta.hreflang}
                lang={meta.hreflang}
                aria-current={current ? "true" : undefined}
                onClick={onNavigate}
                className={`flex min-h-11 items-center gap-2 rounded-full border px-4 font-sans text-sm transition-colors ${
                  current
                    ? "border-white font-semibold text-white"
                    : "border-white/25 text-white/70 hover:text-white"
                }`}
              >
                <Flag code={code} />
                <span>{meta.short}</span>
              </a>
            </li>
          );
        })}
      </ul>
    );
  }

  const btn =
    tone === "dark"
      ? "border-black/10 bg-black/5 text-neutral-900 hover:bg-black/10"
      : "border-white/25 bg-white/10 text-white hover:bg-white/20";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={label}
        className={`inline-flex h-10 items-center gap-2 rounded-full border px-3 font-sans text-[13px] font-medium backdrop-blur-md transition-colors duration-200 ${btn}`}
      >
        <Flag code={lang} />
        <span>{localeMeta[lang].short}</span>
        <svg
          viewBox="0 0 12 12"
          className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden
        >
          <path d="M2.5 4.5 6 8l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-xl border border-black/5 bg-white p-1 text-neutral-900 shadow-[0_12px_32px_rgba(0,0,0,0.18)]"
        >
          {locales.map((code) => {
            const meta = localeMeta[code];
            const current = code === lang;
            return (
              <li key={code} role="none">
                <a
                  role="menuitem"
                  href={alternates[code]}
                  hrefLang={meta.hreflang}
                  lang={meta.hreflang}
                  aria-current={current ? "true" : undefined}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-11 items-center gap-3 rounded-lg px-3 font-sans text-[14px] transition-colors hover:bg-black/5 ${
                    current ? "font-semibold" : ""
                  }`}
                >
                  <Flag code={code} />
                  <span className="flex-1">{meta.native}</span>
                  {current && (
                    <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                      <path d="M2.5 6.5 5 9l4.5-5.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}