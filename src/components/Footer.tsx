import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";

type FooterLinkItem = {
  label: string;
  href: string;
  external?: boolean;
};

function FooterLink({ label, href, external }: FooterLinkItem) {
  const isInternal = href.startsWith("/");
  const Wrapper = isInternal ? Link : "a";

  return (
    <Wrapper
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
    </Wrapper>
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

const footerNav: FooterNavColumnProps[] = [
  {
    title: "Company",
    links: [
      { label: "Careers", href: "/career" },
      { label: "Fundraising", href: "mailto:fundraising@offloop.org" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Influencer templates", href: "/template/agent-teams#influencer" },
      { label: "Contact", href: "/contact" },
      { label: "Markdown to PDF", href: "/markdown-to-pdf" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
    ],
  },
  {
    title: "Connect with us",
    links: [
      { label: "GitHub", href: "https://github.com/OffloopHQ", external: true },
      { label: "TikTok", href: "https://www.tiktok.com/@heyitsoffloop", external: true },
      { label: "Instagram", href: "https://www.instagram.com/offloop2026/", external: true },
      { label: "X(Twitter)", href: "https://x.com/Offloop", external: true },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/offloop-hq", external: true },
      { label: "Medium", href: "https://medium.com/@offloop", external: true },
      { label: "Email", href: "mailto:hello@offloop.org" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-bg-page">
      <div className="mx-auto grid w-full container grid-cols-2 gap-x-8 gap-y-10 px-5 py-16 sm:grid-cols-4 sm:gap-x-10 sm:px-9 md:grid-cols-[1.4fr_repeat(4,1fr)] md:gap-8">
        <div className="col-span-2 flex flex-col gap-4 sm:col-span-4 md:col-span-1">
          <Link aria-label="Offloop home" href="/home" className="inline-flex w-fit">
            <span className="font-(family-name:--font-denton) text-marketing-wordmark text-text-strong-950 [font-variation-settings:'wdth'_350,'wght'_420]">
              Offloop
            </span>
          </Link>
          <p className="max-w-65 text-paragraph-13 text-text-soft-500">
            Scale your team&rsquo;s work without scaling headcount.
          </p>
        </div>
        {footerNav.map((column) => (
          <FooterNavColumn key={column.title} {...column} />
        ))}
      </div>
      <div className="mx-auto w-full container border-t border-text-strong-950/10 px-5 py-8 sm:px-9">
        <p className="text-[12px] leading-5 text-text-soft-500">
          © 2026
          <a
            href="https://intelligence.software"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-text-strong-950/20 underline-offset-4 transition-colors hover:text-text-strong-950"
          >
            Intelligence Software, Inc.
          </a>
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}