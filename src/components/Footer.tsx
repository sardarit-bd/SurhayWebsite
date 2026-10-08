import { HiArrowRight } from "react-icons/hi2";
import { SITE } from "../config";
import { useTranslations, path, localePath } from "../i18n/utils";
import type { LangProp, PfadProp } from "../lib/props";

type FooterLinkItem = {
  label: string;
  href: string;
  external?: boolean;
};

function FooterLink({ label, href, external }: FooterLinkItem) {
  return (
    <a
      href={href}
      className="group inline-flex w-fit items-center text-paragraph-13 text-text-soft-500 transition-colors duration-200 ease-entrance hover:text-text-strong-950"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className="relative inline-flex items-center">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 inset-s-0 flex -translate-x-1 items-center opacity-0 transition-[opacity,transform] duration-200 ease-entrance group-hover:translate-x-0 group-hover:opacity-100"
        >
          <HiArrowRight className="size-3.5" />
        </span>
        <span className="inline-block transition-transform duration-200 ease-entrance group-hover:translate-x-5">
          {label}
        </span>
      </span>
    </a>
  );
}

type FooterNavColumnProps = {
  title: string;
  links: FooterLinkItem[];
};

function FooterNavColumn({ title, links }: FooterNavColumnProps) {
  return (
    <nav aria-label={title} className="flex flex-col gap-3">
      <h3 className="text-label-13 text-text-strong-950">{title}</h3>
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <FooterLink {...link} />
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Footer({ lang }: LangProp & Partial<PfadProp>) {
  const t = useTranslations(lang);
  const services = path(lang, "services");
  const footerNav: FooterNavColumnProps[] = [
    {
      title: t("footer.servicesCol"),
      links: [
        { label: t("ft.l1"), href: services },
        { label: t("ft.l2"), href: services },
        { label: t("ft.l3"), href: services },
        { label: t("ft.l4"), href: services },
        { label: t("ft.l5"), href: services },
      ],
    },
    {
      title: t("footer.company"),
      links: [
        { label: t("header.about"), href: path(lang, "about") },
        { label: t("ft.process"), href: path(lang, "process") },
        { label: t("header.projects"), href: path(lang, "work") },
        { label: t("header.industries"), href: localePath(lang, "/") },
        { label: t("ft.pricing"), href: path(lang, "pricing") },
      ],
    },
    {
      title: t("ft.resources"),
      links: [
        { label: t("ft.r1"), href: path(lang, "blog") },
        {
          label: t("ft.r2"),
          href: path(lang, "blog", "barrierefreiheit-bfsg-pflicht"),
        },
        { label: t("ft.r3"), href: path(lang, "configurator") },
        { label: t("ft.r4"), href: path(lang, "faq") },
      ],
    },
    {
      title: t("ft.connect"),
      links: [
        { label: "LinkedIn", href: SITE.social.linkedin, external: true },
        { label: "Instagram", href: SITE.social.instagram, external: true },
        { label: "GitHub", href: SITE.social.github, external: true },
      ],
    },
  ];

  const legalLinks: FooterLinkItem[] = [
    { label: t("footer.imprint"), href: path(lang, "imprint") },
    { label: t("footer.privacy"), href: path(lang, "privacy") },
    { label: t("footer.cookies"), href: path(lang, "cookies") },
  ];

  return (
    <footer className="bg-bg-page">
      <div className="mx-auto grid w-full container grid-cols-2 gap-x-8 gap-y-10 px-5 py-16 sm:grid-cols-4 sm:gap-x-10 sm:px-9 md:grid-cols-[1.4fr_repeat(4,1fr)] md:gap-8">
        <div className="col-span-2 flex flex-col gap-4 sm:col-span-4 md:col-span-1">
          <a
            aria-label={t("nav.home")}
            href={localePath(lang, "/")}
            className="inline-flex w-fit"
          >
            <span className="font-(family-name:--font-denton) text-marketing-wordmark text-text-strong-950 [font-variation-settings:'wdth'_350,'wght'_420]">
              {SITE.name}
            </span>
          </a>
          <p className="max-w-65 text-paragraph-13 text-text-soft-500">
            {t("ft.tagline")}
          </p>
        </div>
        {footerNav.map((column) => (
          <FooterNavColumn key={column.title} {...column} />
        ))}
      </div>
      <div className="mx-auto flex w-full container flex-col gap-4 border-t border-text-strong-950/10 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-9">
        <p className="text-[12px] leading-5 text-text-soft-500">
          © 2026 {SITE.name}. {t("footer.rights")} · {t("footer.madeIn")}.
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[12px] leading-5 text-text-soft-500">
          {legalLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="underline decoration-text-strong-950/20 underline-offset-4 transition-colors hover:text-text-strong-950"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}