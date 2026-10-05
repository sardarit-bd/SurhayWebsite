"use client";

import { motion } from "framer-motion";
import type { LangProp } from "../../lib/props";
import { useTranslations } from "../../i18n/utils";
import type { UiKey } from "../../i18n/ui";

const WORD_KEYS: UiKey[] = ["tb.1", "tb.2", "tb.3", "tb.4", "tb.5", "tb.6"];

const REPEAT = 8;

const Row = ({
  words,
  direction,
  speed = 250,
  className = "",
}: {
  words: string[];
  direction: "left" | "right";
  speed?: number;
  className?: string;
}) => (
  <div className="overflow-hidden w-full flex">
    <motion.div
      key={`${direction}-${speed}`}
      className={`flex gap-10 sm:gap-14 lg:gap-18 items-center w-max flex-nowrap ${className}`}
      animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {Array.from({ length: REPEAT }, () => words)
        .flat()
        .map((word, index) => (
          <div
            key={`${word}-${index}`}
            className="relative shrink-0 h-10 sm:h-12 lg:h-14 flex items-center justify-center px-2"
          >
            <span className="whitespace-nowrap text-2xl sm:text-3xl lg:text-4xl font-semibold uppercase tracking-widest text-neutral-400">
              {word}
            </span>
          </div>
        ))}
    </motion.div>
  </div>
);

export default function TrustedBy({ lang }: LangProp) {
  const t = useTranslations(lang);
  const words = WORD_KEYS.map((key) => t(key));

  return (
    <section className="py-12 sm:py-16 lg:py-20 overflow-hidden w-full relative  border-y border-neutral-100">
      <div className="container mx-auto px-6 lg:px-8 mb-8 sm:mb-10 text-center">
        <p className="text-md md:text-lg font-semibold uppercase tracking-widest text-neutral-500 pb-14">
          {t("tb.label")}
        </p>
      </div>

      {/* Dekorativ: die Branchen stehen einmal als Liste fuer Screenreader. */}
      <ul className="sr-only">
        {words.map((word) => (
          <li key={word}>{word}</li>
        ))}
      </ul>

      <div
        className="relative flex flex-col gap-8 sm:gap-10 overflow-hidden"
        aria-hidden="true"
      >
        <Row words={words} direction="left" speed={150} />
        <Row words={[...words].reverse()} direction="right" speed={200} />
      </div>

      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 lg:w-40 bg-linear-to-r from-paper via-paper/80 to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 lg:w-40 bg-linear-to-l from-paper via-paper/80 to-transparent pointer-events-none z-10" />
    </section>
  );
}