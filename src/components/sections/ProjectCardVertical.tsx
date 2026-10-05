import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { t } from "../../i18n/utils";
import type { Lang, UiKey } from "../../i18n/ui";

export interface ProjectCardVerticalProps {
  title: string;
  category?: string;
  eyebrow?: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
  tags?: string[];
  ctaHref: string;
  ctaLabel?: string;
  statValue?: string;
  statLabel?: string;
  priority?: boolean;
  lang?: Lang;
  index?: number;
}

export default function ProjectCardVertical({
  title,
  category,
  eyebrow,
  description,
  imageSrc,
  imageAlt,
  tags = [],
  ctaHref,
  ctaLabel,
  statValue,
  statLabel,
  priority = false,
  lang = "de",
  index,
}: ProjectCardVerticalProps) {
  const finalCtaLabel = ctaLabel || t("work.viewCaseStudy" as UiKey, lang);
  const num = typeof index === "number" ? String(index + 1).padStart(2, "0") : null;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-(--line-dark) bg-ink-2 transition-colors duration-(--dur-short) ease-(--ease-micro) hover:border-accent-ctx has-focus-visible:border-accent-ctx">
      {/* Cover */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-ink-3">
        <Image
          src={imageSrc}
          alt={imageAlt || title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          priority={priority}
          className="object-cover object-center transition-transform duration-(--dur-reveal) ease-(--ease-out) group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-ink-2 to-transparent" />

        {num && (
          <span className="absolute right-4 top-4 rounded-full bg-ink/70 px-2.5 py-1 font-mono text-xs tracking-widest text-paper">
            {num}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-5 p-6 md:p-7">
        <div className="flex flex-col gap-3">
          {(eyebrow || category) && (
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-mute-dark">
              {eyebrow}
              {eyebrow && category ? " — " : ""}
              {category}
            </p>
          )}

          <h3 className="font-display text-2xl font-semibold leading-[1.1] tracking-tight text-paper md:text-[1.7rem]">
            <Link
              href={ctaHref}
              className="outline-offset-4 after:absolute after:inset-0 after:content-['']"
            >
              <span className="sr-only">{finalCtaLabel}: </span>
              {title}
            </Link>
          </h3>

          <p className="line-clamp-3 text-sm leading-relaxed text-mute-dark">
            {description}
          </p>
        </div>

        {tags.length > 0 && (
          <p className="text-xs text-mute-dark/90">{tags.join(" · ")}</p>
        )}

        {/* Footer: stat + arrow */}
        <div className="mt-auto flex items-end justify-between gap-4 border-t border-(--line-dark) pt-5">
          {statValue ? (
            <div className="flex flex-col gap-1">
              <span className="font-display text-4xl font-bold leading-none tracking-tight text-accent-300">
                {statValue}
              </span>
              {statLabel && (
                <span className="max-w-[26ch] text-[0.7rem] font-medium uppercase leading-snug tracking-wider text-mute-dark">
                  {statLabel}
                </span>
              )}
            </div>
          ) : (
            <div />
          )}

          <span
            aria-hidden="true"
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-(--line-control-dark) text-paper transition-colors duration-(--dur-micro) ease-(--ease-micro) group-hover:border-accent-400 group-hover:bg-accent-400 group-hover:text-ink"
          >
            <FiArrowUpRight className="text-lg transition-transform duration-(--dur-micro) ease-(--ease-micro) group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}