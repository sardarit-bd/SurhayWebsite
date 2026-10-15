import Image from "next/image";
import type { LangProp } from "@/lib/props";
import { t, path } from "@/i18n/utils";
import type { UiKey } from "@/i18n/ui";

const avatarSrc = [
  "/images/testimonials/jonas-weber.webp",
  "/images/testimonials/lena-bergmann.webp",
  "/images/testimonials/mara-koenig.webp",
];

const Avatars = ({ size = 24 }: { size?: number }) => (
  <div className="flex items-center">
    {avatarSrc.map((src) => (
      <Image
        key={src}
        src={src}
        alt=""
        width={size}
        height={size}
        className="-ml-2 rounded-full border-2 border-white/80 object-cover first:ml-0"
        style={{ width: size, height: size }}
      />
    ))}
  </div>
);

export default function Hero({ lang }: LangProp) {
  const tr = (key: string) => t(key as UiKey, lang);
  return (
    <section className="relative flex h-screen min-h-160 w-full flex-col overflow-hidden bg-[#050414] text-white">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src="/colors.mp4" type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/30 via-black/20 to-black/60" />
      <div className="relative z-10 mx-auto flex w-full max-w-300 flex-1 flex-col items-center justify-center px-5 pt-24 text-center">
        <div className="animate-fade-up inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 py-1.5 pl-1.5 pr-4 backdrop-blur-md">
          <Avatars size={24} />
          <span className="text-[12px] text-white/90">{tr("hero.badge")}</span>
        </div>

        <h1 className="animate-fade-up mt-6 text-[40px] font-semibold leading-[1.02] tracking-tighter [animation-delay:100ms] sm:text-[60px] lg:text-[84px]">
          <span className="block">{tr("hero.title1")}</span>
          <span className="block">{tr("hero.title2")}</span>
        </h1>

        <p className="animate-fade-up mt-6 max-w-110 text-[14px] leading-normal text-white/75 [animation-delay:200ms] sm:text-[16px]">
          {tr("hero.text")}
        </p>

        <div className="animate-fade-up mt-8 flex flex-wrap items-center justify-center gap-3 [animation-delay:300ms]">
          <a
            href={path(lang, "contact")}
            className="inline-flex h-12 items-center rounded-xl bg-[#171717] px-6 text-[14px] font-medium text-white shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition hover:-translate-y-0.5 hover:bg-black"
          >
            {tr("hero.cta.primary")}
          </a>
          <a
            href={path(lang, "work")}
            className="inline-flex h-12 items-center rounded-xl bg-white px-6 text-[14px] font-medium text-[#171717] transition hover:-translate-y-0.5 hover:bg-white/90"
          >
            {tr("hero.cta.secondary")}
          </a>
        </div>
      </div>
    </section>
  );
}