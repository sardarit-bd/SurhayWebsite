"use client";

import Image from "next/image";
import { useTranslations } from "../../i18n/utils";
import type { Lang, UiKey } from "../../i18n/ui";
import type { LangProp } from '../../lib/props';

type Feature = {
  id: string;
  titleKey: UiKey;
  descKey: UiKey;
  icon: React.ReactNode;
  image: string;
  imageAltKey: UiKey;
  imageWidth: number;
  imageHeight: number;
  span?: boolean;
};

export default function AiFeaturesSection({ lang }: LangProp) {
  const t = useTranslations(lang);

  // Data is now inside the component so it can use the `t` function dynamically
  const FEATURES: Feature[] = [
    {
      id: "1",
      titleKey: "ai.f1.title" as UiKey,
      descKey: "ai.f1.desc" as UiKey,
      icon: (
        <svg className="inline-flex fill-zinc-400" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
          <path d="M17 9c.6 0 1 .4 1 1v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h6c.6 0 1 .4 1 1s-.4 1-1 1H4v12h12v-6c0-.6.4-1 1-1Zm-.7-6.7c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-8 8c-.2.2-.4.3-.7.3-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l8-8Z" />
        </svg>
      ),
      image: "/images/feature-post-01.png",
      imageAltKey: "ai.f1.alt" as UiKey,
      imageWidth: 721,
      imageHeight: 280,
      span: true,
    },
    {
      id: "2",
      titleKey: "ai.f2.title" as UiKey,
      descKey: "ai.f2.desc" as UiKey,
      icon: (
        <svg className="inline-flex fill-zinc-400" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
          <path d="m6.035 17.335-4-14c-.2-.8.5-1.5 1.3-1.3l14 4c.9.3 1 1.5.1 1.9l-6.6 2.9-2.8 6.6c-.5.9-1.7.8-2-.1Zm-1.5-12.8 2.7 9.5 1.9-4.4c.1-.2.3-.4.5-.5l4.4-1.9-9.5-2.7Z" />
        </svg>
      ),
      image: "/images/feature-post-02.png",
      imageAltKey: "ai.f2.alt" as UiKey,
      imageWidth: 342,
      imageHeight: 280,
    },
    {
      id: "3",
      titleKey: "ai.f3.title" as UiKey,
      descKey: "ai.f3.desc" as UiKey,
      icon: (
        <svg className="inline-flex fill-zinc-400" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
          <path d="M8.974 16c-.3 0-.7-.2-.9-.5l-2.2-3.7-2.1 2.8c-.3.4-1 .5-1.4.2-.4-.3-.5-1-.2-1.4l3-4c.2-.3.5-.4.9-.4.3 0 .6.2.8.5l2 3.3 3.3-8.1c0-.4.4-.7.8-.7s.8.2.9.6l4 8c.2.5 0 1.1-.4 1.3-.5.2-1.1 0-1.3-.4l-3-6-3.2 7.9c-.2.4-.6.6-1 .6Z" />
        </svg>
      ),
      image: "/images/feature-post-03.png",
      imageAltKey: "ai.f3.alt" as UiKey,
      imageWidth: 342,
      imageHeight: 280,
    },
    {
      id: "4",
      titleKey: "ai.f4.title" as UiKey,
      descKey: "ai.f4.desc" as UiKey,
      icon: (
        <svg className="inline-flex fill-zinc-400" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
          <path d="M9.3 11.7c-.4-.4-.4-1 0-1.4l7-7c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-7 7c-.4.4-1 .4-1.4 0ZM9.3 17.7c-.4-.4-.4-1 0-1.4l7-7c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-7 7c-.4.4-1 .4-1.4 0ZM2.3 12.7c-.4-.4-.4-1 0-1.4l7-7c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-7 7c-.4.4-1 .4-1.4 0Z" />
        </svg>
      ),
      image: "/images/feature-post-04.png",
      imageAltKey: "ai.f4.alt" as UiKey,
      imageWidth: 342,
      imageHeight: 280,
    },
    {
      id: "5",
      titleKey: "ai.f5.title" as UiKey,
      descKey: "ai.f5.desc" as UiKey,
      icon: (
        <svg className="inline-flex fill-zinc-400" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
          <path d="M16 2H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h8.667l3.733 2.8A1 1 0 0 0 18 17V4a2 2 0 0 0-2-2Zm0 13-2.4-1.8a1 1 0 0 0-.6-.2H4V4h12v11Z" />
        </svg>
      ),
      image: "/images/feature-post-05.png",
      imageAltKey: "ai.f5.alt" as UiKey,
      imageWidth: 342,
      imageHeight: 280,
    },
  ];

  return (
    <section>
      <div className="py-12">
        <div className="mx-auto container px-4">
          <div className="relative mx-auto max-w-3xl pb-10 text-center sm:pb-14 md:pb-20">
            <h2 className="font-inter-tight mb-4 text-3xl font-bold text-zinc-900 sm:text-4xl md:text-5xl">
              {t("ai.title" as UiKey)}
            </h2>
            <p className="text-base text-zinc-500 sm:text-lg md:text-xl">
              {t("ai.sub" as UiKey)}
            </p>
          </div>

          <div className="mx-auto grid container gap-2 sm:max-w-none sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-2 lg:gap-2">
            {FEATURES.map((feature) => (
              <article
                key={feature.id}
                className={`flex flex-col rounded-lg border border-transparent
                  [background:linear-gradient(var(--color-white),var(--color-zinc-50))_padding-box,linear-gradient(120deg,var(--color-zinc-300),var(--color-zinc-100),var(--color-zinc-300))_border-box]
                  ${feature.span ? "sm:col-span-2" : ""}`}
              >
                <div className="flex grow flex-col p-5 pt-6 sm:p-6 sm:pt-7 lg:p-7 lg:pt-8">
                  <div className="mb-1 flex items-center space-x-3">
                    {feature.icon}
                    <h3 className="font-inter-tight font-semibold text-zinc-900">
                      {t(feature.titleKey)}
                    </h3>
                  </div>
                  <p className="max-w-md grow text-sm text-zinc-500 sm:text-base">
                    {t(feature.descKey)}
                  </p>
                </div>
                <figure className="w-full overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={t(feature.imageAltKey)}
                    width={feature.imageWidth}
                    height={feature.imageHeight}
                    sizes={
                      feature.span
                        ? "(min-width: 640px) 66vw, 100vw"
                        : "(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                    }
                    style={{ aspectRatio: `${feature.imageWidth} / ${feature.imageHeight}` }}
                    className="h-auto w-full object-cover"
                  />
                </figure>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}