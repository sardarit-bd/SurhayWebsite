"use client";

import type { LangProp } from "../lib/props";
import { SiUnsplash, SiGoogle, SiWordpress, SiPinterest } from "react-icons/si";
import type { IconType } from "react-icons";
import { SITE } from "../config";
import { useTranslations, path } from "../i18n/utils";

type Brand = {
  name: string;
  Icon: IconType;
};

const BRANDS: Brand[] = [
  { name: "Unsplash", Icon: SiUnsplash },
  { name: "Google", Icon: SiGoogle },
  { name: "WordPress", Icon: SiWordpress },
  { name: "Pinterest", Icon: SiPinterest },
];

const FADE_MASK =
  "linear-gradient(to right, transparent 0, #000 64px, #000 calc(100% - 64px), transparent 100%)";

export default function CtaSection({ lang }: LangProp) {
  const t = useTranslations(lang);

  return (
    <section className="dark-section py-section">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
          <h2 className="h2 text-paper lg:col-span-7">
            {t("cs.title.pre")}{" "}
            <span className="text-accent-300">{t("cs.title.mark")}</span>
            {t("cs.title.post")}
          </h2>
          <div className="lg:col-span-5">
            <p className="lead max-w-md text-mute-dark">{t("cs.sub")}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a className="btn btn-primary" href={path(lang, "contact")}>
                {t("cs.primary")}
                <span className="btn-arrow" aria-hidden="true">
                  →
                </span>
              </a>
              <a className="btn btn-ghost" href={`mailto:${SITE.email}`}>
                {t("cs.secondary")}
              </a>
            </div>
          </div>
        </div>
        <div
          className="relative mt-16 overflow-hidden  py-8 md:mt-24"
          style={{ maskImage: FADE_MASK, WebkitMaskImage: FADE_MASK }}
          role="marquee"
          aria-label="Trusted by brands"
        >
          <ul className="flex animate-marquee items-center hover:[animation-play-state:paused]">
            {Array.from({ length: 6 }, () => BRANDS)
              .flat()
              .map((brand, i) => (
                <li
                  key={`${brand.name}-${i}`}
                  aria-hidden={i >= BRANDS.length}
                  className="flex shrink-0 items-center gap-3 px-8 text-mute-dark md:px-12"
                >
                  <brand.Icon className="h-6 w-6" aria-hidden="true" />
                  <span className="font-display text-lg font-semibold tracking-tight">
                    {brand.name}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
}