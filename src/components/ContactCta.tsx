"use client";
import Image from "next/image";
import type { LangProp } from "../lib/props";
import { SiUnsplash, SiGoogle, SiWordpress, SiPinterest } from "react-icons/si";
import type { IconType } from "react-icons";
import { SITE } from "../config";
import { useTranslations, path, localePath } from "../i18n/utils";

type Brand = {
  name: string;
  Icon: IconType;
};

const BRANDS: Brand[] = [
  // { name: "Adobe", Icon: SiAdobe },
  { name: "Unsplash", Icon: SiUnsplash },
  { name: "Google", Icon: SiGoogle },
  { name: "WordPress", Icon: SiWordpress },
  // { name: "Windows", Icon: SiWindows },
  { name: "Pinterest", Icon: SiPinterest },
];

export default function CtaSection({ lang }: LangProp) {
  const t = useTranslations(lang);

  return (
    <section>
      <div className="py-12 ">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 ">
          <div className="relative mx-auto max-w-3xl pb-12 text-center md:pb-16">
            <div
              className="relative mb-8 inline-flex h-20 w-20 items-center justify-center rounded-xl bg-white shadow-md
                before:absolute before:-top-12 before:-z-10 before:h-52 before:w-52 before:rounded-full
                before:bg-zinc-900 before:opacity-[.08] before:blur-3xl"
            >
              <a href={localePath(lang, "/")}>
                <Image
                  src="/images/logo-02.png"
                  alt="Logo"
                  width={60}
                  height={60}
                />
              </a>
            </div>

            <h2 className="font-inter-tight mb-4 text-3xl font-bold text-zinc-900 md:text-4xl">
              {t("cs.title.pre")}{" "}
              <em className="relative inline-flex items-end justify-center not-italic">
                {t("cs.title.mark")}
                <svg
                  className="absolute -z-10 w-[calc(100%+1rem)] fill-zinc-300"
                  xmlns="http://www.w3.org/2000/svg"
                  width="120"
                  height="10"
                  viewBox="0 0 120 10"
                  aria-hidden="true"
                  preserveAspectRatio="none"
                >
                  <path d="M118.273 6.09C79.243 4.558 40.297 5.459 1.305 9.034c-1.507.13-1.742-1.521-.199-1.81C39.81-.228 79.647-1.568 118.443 4.2c1.63.233 1.377 1.943-.17 1.89Z" />
                </svg>
              </em>
              {t("cs.title.post")}
            </h2>

            <p className="mb-8 text-lg text-zinc-500">
              {t("cs.sub")}
            </p>

            <div className="mx-auto max-w-xs space-y-4 sm:inline-flex sm:max-w-none sm:justify-center sm:space-y-0 sm:space-x-4">
              <div>
                <a
                  className="btn w-full bg-zinc-900 text-zinc-100 shadow-sm hover:bg-zinc-800"
                  href={path(lang, "contact")}
                >
                  {t("cs.primary")}
                </a>
              </div>
              <div>
                <a
                  className="btn w-full bg-white text-zinc-600 shadow-sm hover:text-zinc-900"
                  href={`mailto:${SITE.email}`}
                >
                  {t("cs.secondary")}
                </a>
              </div>
            </div>
          </div>

          <div
            className="relative overflow-hidden mask-[linear-gradient(to_right,transparent_0,--theme(--color-white)_64px,--theme(--color-white)_calc(100%-64px),transparent_100%)]"
            role="marquee"
            aria-label="Trusted by brands"
          >
            <ul className="group flex  animate-marquee items-center gap-3 hover:[animation-play-state:paused] ">
              {Array.from({ length: 6 }, () => BRANDS)
                .flat()
                .map((brand, i) => (
                  <li
                    key={`${brand.name}-${i}`}
                    aria-hidden={i >= BRANDS.length}
                    className="relative flex shrink-0 items-center justify-center rounded-lg border border-transparent p-3 [background:linear-gradient(var(--color-zinc-50),var(--color-zinc-50))_padding-box,linear-gradient(120deg,var(--color-zinc-300),var(--color-zinc-100),var(--color-zinc-300))_border-box]"
                  >
                    <brand.Icon
                      className="h-7 w-7 fill-zinc-400 text-zinc-400"
                      aria-label={brand.name}
                    />
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}