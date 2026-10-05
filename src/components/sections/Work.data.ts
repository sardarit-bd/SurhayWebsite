import { t } from "../../i18n/utils";
import type { Lang, UiKey } from "../../i18n/ui";
import type { ProjectCardVerticalProps } from "./ProjectCardVertical";

export function getWorkProjects(lang: Lang): ProjectCardVerticalProps[] {
  return [
    {
      title: t("work.p1.title" as UiKey, lang),
      category: t("work.p1.category" as UiKey, lang),
      eyebrow: t("work.p1.eyebrow" as UiKey, lang),
      description: t("work.p1.desc" as UiKey, lang),
      imageSrc: "/images/project/image1.jpg",
      imageAlt: t("work.p1.title" as UiKey, lang),
      tags: [t("work.tags.design" as UiKey, lang), t("work.tags.dev" as UiKey, lang), t("work.tags.seo" as UiKey, lang)],
      ctaHref: lang === "de" ? "/projekte/vanguard-bau" : "/en/work/vanguard-bau",
      ctaLabel: t("work.viewCaseStudy" as UiKey, lang),
      statValue: t("work.p1.statValue" as UiKey, lang),
      statLabel: t("work.p1.statLabel" as UiKey, lang),
      priority: true,
      lang,
    },
    {
      title: t("work.p2.title" as UiKey, lang),
      category: t("work.p2.category" as UiKey, lang),
      eyebrow: t("work.p2.eyebrow" as UiKey, lang),
      description: t("work.p2.desc" as UiKey, lang),
      imageSrc: "/images/project/image2.webp",
      imageAlt: t("work.p2.title" as UiKey, lang),
      tags: [t("work.tags.corporate" as UiKey, lang), t("work.tags.nextjs" as UiKey, lang), t("work.tags.gdpr" as UiKey, lang)],
      ctaHref: lang === "de" ? "/projekte/kanzlei-moers" : "/en/work/kanzlei-moers",
      ctaLabel: t("work.viewCaseStudy" as UiKey, lang),
      statValue: t("work.p2.statValue" as UiKey, lang),
      statLabel: t("work.p2.statLabel" as UiKey, lang),
      lang,
    },
    {
      title: t("work.p3.title" as UiKey, lang),
      category: t("work.p3.category" as UiKey, lang),
      eyebrow: t("work.p3.eyebrow" as UiKey, lang),
      description: t("work.p3.desc" as UiKey, lang),
      imageSrc: "/images/project/image3.webp",
      imageAlt: t("work.p3.title" as UiKey, lang),
      tags: [t("work.tags.fullstack" as UiKey, lang), t("work.tags.api" as UiKey, lang), t("work.tags.a11y" as UiKey, lang)],
      ctaHref: lang === "de" ? "/projekte/zentrum-plastische-chirurgie" : "/en/work/zentrum-plastische-chirurgie",
      ctaLabel: t("work.viewCaseStudy" as UiKey, lang),
      statValue: t("work.p3.statValue" as UiKey, lang),
      statLabel: t("work.p3.statLabel" as UiKey, lang),
      lang,
    },
  ];
}