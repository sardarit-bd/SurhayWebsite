import type { LangProp } from "@/lib/props";
import { t, path } from "@/i18n/utils";
import type { UiKey } from "@/i18n/ui";
import {
  SiFigma,
  SiFramer,
  SiWebflow,
  SiWordpress,
  SiPostgresql,
} from "react-icons/si";
import HeroBackground from "./HeroBackground";
import HeroCollage from "./HeroCollage";
const logos = [
  { Icon: SiFigma, name: "Figma" },
  { Icon: SiFramer, name: "Framer" },
  { Icon: SiWebflow, name: "Webflow" },
  { Icon: SiWordpress, name: "WordPress" },
  { Icon: SiPostgresql, name: "PostgreSQL" },
];
export default function Hero({ lang }: LangProp) {
  const tr = (key: string) => t(key as UiKey, lang);

  return (
    <section className="hero-saas dark-section relative isolate w-full overflow-hidden pb-20 pt-32 text-white sm:pt-36 lg:pb-28 lg:pt-40">
      <HeroBackground />
      <div className="mx-auto grid w-full max-w-300 items-center gap-14 px-5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="animate-fade-up inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/6 px-4 py-1.5 backdrop-blur-md">
            <span className="text-[12px] text-white/90">
              {tr("hero.eyebrow")}
            </span>
            <span className="relative ml-1 flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-400" />
            </span>
          </div>
          <h1 className="animate-fade-up mt-7 text-[40px] font-semibold leading-[1.02] tracking-tighter [animation-delay:100ms] sm:text-[60px] lg:text-[68px] xl:text-[78px]">
            <span className="block">{tr("hero.title1")}</span>
            <span className="block bg-linear-to-r from-white via-accent-300 to-accent-400 bg-clip-text text-transparent">
              {tr("hero.title2")}
            </span>
          </h1>
          <p className="animate-fade-up mt-6 max-w-120 text-[15px] leading-relaxed text-white/70 [animation-delay:200ms] sm:text-[17px]">
            {tr("hero.text")}
          </p>
          <div className="animate-fade-up mt-9 flex flex-wrap items-center justify-center gap-3 [animation-delay:300ms] lg:justify-start">
            <a href={path(lang, "contact")} className="btn btn-primary">
              {tr("hero.cta.primary")}
              <svg
                className="btn-arrow h-4 w-4"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M1 8h13M9 3l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a href={path(lang, "work")} className="btn btn-ghost">
              {tr("hero.cta.secondary")}
            </a>
          </div>
          <div className="animate-fade-up mt-12 flex flex-col items-center gap-4 [animation-delay:400ms] lg:items-start">
            <p
              id="hero-tools-label"
              className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-white/50"
            >
              {tr("page.about.stackTitle")}
            </p>
            <ul
              className="flex flex-wrap items-center justify-center gap-x-7 gap-y-4 lg:justify-start"
              aria-labelledby="hero-tools-label"
            >
              {logos.map(({ Icon, name }) => (
                <li key={name}>
                  <Icon
                    aria-label={name}
                    role="img"
                    className="h-5 w-5 text-white opacity-50 transition hover:opacity-90"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <HeroCollage />
      </div>
    </section>
  );
}
