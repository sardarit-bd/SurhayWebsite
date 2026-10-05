import type { LangProp } from "../../lib/props";
import { useTranslations, path } from "../../i18n/utils";
import type { Lang, UiKey } from "../../i18n/ui";

type Plan = {
  id: "p1" | "p2" | "p3";
  variant: "light" | "dark";
  showFrom: boolean;
};

const PLANS: Plan[] = [
  { id: "p1", variant: "light", showFrom: true },
  { id: "p2", variant: "dark", showFrom: true },
  { id: "p3", variant: "light", showFrom: false },
];

function PricingCard({ plan, lang }: { plan: Plan; lang: Lang }) {
  const t = useTranslations(lang);
  const isDark = plan.variant === "dark";
  const key = (suffix: string) => `pricing.${plan.id}.${suffix}` as UiKey;
  const features = t(key("features")).split("|");

  const surface = isDark
    ? "price-card price-card--marked dark-section border-accent-400"
    : "price-card price-card--light border-(--line)";

  return (
    <article
      className={`${surface} relative flex h-full flex-col rounded-2xl border p-7 md:p-8`}
    >
      <header>
        <p
          className={`font-mono text-[0.7rem] uppercase tracking-[0.16em] ${
            isDark ? "text-mute-dark" : "text-mute"
          }`}
        >
          {t(key("name"))}
        </p>
        <div className="mt-6 flex items-baseline gap-3">
          {plan.showFrom && (
            <span
              className={`text-sm ${isDark ? "text-mute-dark" : "text-mute"}`}
            >
              {t("pricing.from")}
            </span>
          )}
          <span className="font-display text-5xl font-bold leading-none tracking-tight md:text-6xl">
            {t(key("price"))}
          </span>
        </div>
        <p
          className={`mt-5 text-sm leading-relaxed ${
            isDark ? "text-mute-dark" : "text-mute"
          }`}
        >
          {t(key("desc"))}
        </p>
      </header>
      <div className="mt-8 grow">
        <p
          className={`mb-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] ${
            isDark ? "text-mute-dark" : "text-mute"
          }`}
        >
          {t("common.included")}
        </p>
        <ul>
          {features.map((label) => (
            <li
              key={label}
              className={`flex items-start gap-3 border-t py-3 text-sm leading-snug ${
                isDark ? "border-(--line-dark)" : "border-(--line)"
              }`}
            >
              <span
                aria-hidden="true"
                className={`mt-[0.55em] h-px w-3 shrink-0 ${
                  isDark ? "bg-accent-400" : "bg-accent-600"
                }`}
              />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <a
          href={path(lang, "contact")}
          className={`btn w-full ${isDark ? "btn-primary" : "btn-ghost"}`}
        >
          {t("pricing.cta")}
          <span className="btn-arrow" aria-hidden="true">
            →
          </span>
        </a>
      </div>
    </article>
  );
}

export default function PricingFaqSection({ lang }: LangProp) {
  const t = useTranslations(lang);

  return (
    <section className="bg-paper py-section text-ink">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16">
        <div className="mb-14 md:mb-20">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
            <h2 className="h2 lg:col-span-7">{t("pricing.title")}</h2>
            <p className="lead max-w-md text-mute lg:col-span-5 lg:justify-self-end">
              {t("pricing.sub")}
            </p>
          </div>
        </div>
        <div className="price-grid mx-auto grid max-w-sm gap-6 md:max-w-3xl md:grid-cols-2 lg:max-w-none lg:grid-cols-3 lg:gap-8">
          {PLANS.map((plan, i) => (
            <div
              key={plan.id}
              className={`price-cell h-full ${
                i === PLANS.length - 1
                  ? "md:col-span-2 md:mx-auto md:max-w-sm lg:col-span-1 lg:mx-0 lg:max-w-none"
                  : ""
              } ${plan.variant === "dark" ? "price-cell--ink" : ""}`}
            >
              <PricingCard plan={plan} lang={lang} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}