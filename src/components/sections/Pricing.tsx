import Image from "next/image";
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

function CheckIcon() {
  return (
    <svg
      className="mr-3 h-3 w-3 shrink-0 fill-emerald-500"
      viewBox="0 0 12 12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
    </svg>
  );
}

function PricingCard({ plan, lang }: { plan: Plan; lang: Lang }) {
  const t = useTranslations(lang);
  const isDark = plan.variant === "dark";
  const key = (suffix: string) => `pricing.${plan.id}.${suffix}` as UiKey;
  const features = t(key("features")).split("|");

  return (
    <div className="h-full">
      <div
        className={
          isDark
            ? "relative flex h-full flex-col rounded-lg bg-zinc-800 p-6"
            : "relative flex h-full flex-col rounded-lg border border-transparent p-6 [background:linear-gradient(var(--color-zinc-50),var(--color-zinc-50))_padding-box,linear-gradient(120deg,var(--color-zinc-300),var(--color-zinc-100),var(--color-zinc-300))_border-box]"
        }
      >
        {isDark && (
          <Image
            src="/images/pricing-decoration.png"
            alt=""
            aria-hidden="true"
            width={76}
            height={74}
            className="absolute -top-5 right-6 mix-blend-exclusion"
          />
        )}

        <div className="mb-4">
          <div
            className={`mb-1 text-lg font-semibold ${isDark ? "text-zinc-200" : "text-zinc-900"}`}
          >
            {t(key("name"))}
          </div>
          <div className="font-inter-tight mb-2 inline-flex items-baseline gap-2">
            {plan.showFrom && (
              <span className="font-medium text-zinc-500">
                {t("pricing.from")}
              </span>
            )}
            <span
              className={`text-3xl font-bold ${isDark ? "text-zinc-200" : "text-zinc-900"}`}
            >
              {t(key("price"))}
            </span>
          </div>
          <div className="text-zinc-500">{t(key("desc"))}</div>
        </div>

        <div className="grow">
          <div
            className={`mb-4 text-sm font-medium ${isDark ? "text-zinc-200" : "text-zinc-900"}`}
          >
            {t("common.included")}
          </div>
          <ul className="grow space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
            {features.map((label) => (
              <li key={label} className="flex items-center">
                <CheckIcon />
                <span className="text-zinc-500">{label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <a
            href={path(lang, "contact")}
            className={
              isDark
                ? "btn w-full bg-white text-zinc-600 shadow-sm hover:text-zinc-900"
                : "btn w-full bg-linear-to-r from-zinc-700 to-zinc-900 text-zinc-100 shadow-sm hover:from-zinc-900 hover:to-zinc-900"
            }
          >
            {t("pricing.cta")}
          </a>
        </div>
      </div>
    </div>
  );
}

export default function PricingFaqSection({ lang }: LangProp) {
  const t = useTranslations(lang);

  return (
    <section>
      <div className="py-12 md:py-20">
        <div className="mx-auto container px-4 sm:px-6">
          <div className="relative mx-auto max-w-3xl pb-12 text-center">
            <h2 className="font-inter-tight mb-4 text-3xl font-bold text-zinc-900 md:text-4xl">
              {t("pricing.title")}
            </h2>
            <p className="text-lg text-zinc-500">{t("pricing.sub")}</p>
          </div>

          <div className="pb-12 md:pb-20">
            <div className="mx-auto grid max-w-sm items-start gap-6 md:max-w-3xl md:grid-cols-2 lg:max-w-none lg:grid-cols-3">
              {PLANS.map((plan, i) => (
                <div
                  key={plan.id}
                  className={
                    i === PLANS.length - 1
                      ? "md:col-span-2 md:max-w-sm md:mx-auto lg:col-span-1 lg:max-w-none lg:mx-0"
                      : ""
                  }
                >
                  <PricingCard plan={plan} lang={lang} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}