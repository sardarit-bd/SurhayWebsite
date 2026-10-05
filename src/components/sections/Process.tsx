"use client";

import { useTranslations } from "../../i18n/utils";
import type { UiKey } from "../../i18n/ui";
import type { LangProp } from "../../lib/props";

type Feature = {
  id: string;
  titleKey: UiKey;
  descKey: UiKey;
};

const FEATURES: Feature[] = [
  { id: "1", titleKey: "ai.f1.title" as UiKey, descKey: "ai.f1.desc" as UiKey },
  { id: "2", titleKey: "ai.f2.title" as UiKey, descKey: "ai.f2.desc" as UiKey },
  { id: "3", titleKey: "ai.f3.title" as UiKey, descKey: "ai.f3.desc" as UiKey },
  { id: "4", titleKey: "ai.f4.title" as UiKey, descKey: "ai.f4.desc" as UiKey },
  { id: "5", titleKey: "ai.f5.title" as UiKey, descKey: "ai.f5.desc" as UiKey },
];

export default function AiFeaturesSection({ lang }: LangProp) {
  const t = useTranslations(lang);

  return (
    <section className="bg-paper py-section text-ink">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <h2 className="h2">{t("ai.title" as UiKey)}</h2>
              <p className="lead mt-6 max-w-md text-mute">
                {t("ai.sub" as UiKey)}
              </p>
            </div>
          </div>

          <ol className="border-b border-(--line) lg:col-span-7">
            {FEATURES.map((feature, index) => (
              <li
                key={feature.id}
                className="group grid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-3 border-t border-(--line) py-8 md:grid-cols-12 md:gap-x-6 md:py-10"
              >
                <span className="pt-1.5 font-mono text-xs tracking-widest text-mute transition-colors duration-(--dur-micro) ease-(--ease-micro) group-hover:text-accent-600 md:col-span-1">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="h3 md:col-span-4">{t(feature.titleKey)}</h3>

                <p className="col-start-2 text-sm leading-relaxed text-mute md:col-span-7 md:col-start-auto md:text-base">
                  {t(feature.descKey)}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}