"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LangProp } from "../../lib/props";
import { useTranslations } from "../../i18n/utils";
import type { UiKey } from "../../i18n/ui";

const WORD_KEYS: UiKey[] = ["tb.1", "tb.2", "tb.3", "tb.4", "tb.5", "tb.6"];

// Must stay an even number: the loop moves by exactly half of the track.
const REPEAT = 8;

const Row = ({
  words,
  direction,
  speed,
  outline = false,
  reduced,
}: {
  words: string[];
  direction: "left" | "right";
  speed: number;
  outline?: boolean;
  reduced: boolean;
}) => (
  <div className="flex w-full overflow-hidden">
    <motion.div
      className="flex w-max flex-nowrap items-center"
      animate={
        reduced
          ? undefined
          : { x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }
      }
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
    >
      {Array.from({ length: REPEAT }, () => words)
        .flat()
        .map((word, index) => (
          <div
            key={`${word}-${index}`}
            className="flex shrink-0 items-center gap-6 pr-6 sm:gap-10 sm:pr-10"
          >
            <span
              className="font-display whitespace-nowrap font-bold leading-none tracking-tight"
              style={{
                fontSize: "clamp(2.5rem, 7vw, 6rem)",
                ...(outline
                  ? {
                      color: "transparent",
                      WebkitTextStroke: "1.5px var(--color-ink)",
                    }
                  : { color: "var(--color-ink)" }),
              }}
            >
              {word}
            </span>
            <span
              aria-hidden="true"
              className="size-2 shrink-0 rounded-full bg-accent-600 sm:size-2.5"
            />
          </div>
        ))}
    </motion.div>
  </div>
);

export default function TrustedBy({ lang }: LangProp) {
  const t = useTranslations(lang);
  const reduced = useReducedMotion() ?? false;
  const words = WORD_KEYS.map((key) => t(key));

  return (
    <section className="relative w-full overflow-hidden border-y border-(--line) bg-paper py-section-sm text-ink">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16">
        <p className="eyebrow text-mute">{t("tb.label")}</p>
      </div>
      <ul className="sr-only">
        {words.map((word) => (
          <li key={word}>{word}</li>
        ))}
      </ul>
      <div
        className="relative mt-10 flex flex-col gap-4 overflow-hidden sm:mt-14 sm:gap-6"
        aria-hidden="true"
      >
        <Row words={words} direction="left" speed={60} reduced={reduced} />
        <Row
          words={[...words].reverse()}
          direction="right"
          speed={80}
          outline
          reduced={reduced}
        />
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-paper via-paper/80 to-transparent sm:w-28 lg:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-paper via-paper/80 to-transparent sm:w-28 lg:w-40" />
    </section>
  );
}