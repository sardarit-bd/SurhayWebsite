import { css } from "../../lib/css";
import type { LangProp } from "../../lib/props";
import { getCollection, renderEntry } from "../../lib/content";
import FaqAccordion from "../FaqAccordion";
import FaqItem from "../FaqItem";
import { useTranslations, path, splitId } from "../../i18n/utils";
import type { FaqData } from "../../content.config";

export default async function Faq({ lang }: LangProp) {
  const t = useTranslations(lang);
  const all = await getCollection<FaqData>(
    "faq",
    ({ id }) => splitId(id).lang === lang,
  );
  const faqs = await Promise.all(
    all
      .sort((a, b) => a.data.order - b.data.order)
      .slice(0, 5)
      .map(async (entry) => ({
        question: entry.data.question,
        html: await renderEntry(entry),
      })),
  );

  return (
    <section
      id="faq"
      className="scroll-mt-24"
      style={css("padding-block: var(--spacing-section);")}
    >
      <div className="mx-auto container px-5 md:px-8">

        <div className="grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow text-mute" data-reveal="">
              {t("faq.eyebrow")}
            </p>
            <h2 className="h2 reveal-mask mt-5" data-reveal="">
              <span className="reveal-line">{t("faq.title")}</span>
            </h2>
            <a
              href={path(lang, "faq")}
              className="link-slide mt-7 inline-block font-semibold"
              data-reveal=""
              style={css("--reveal-delay: 0.08s;")}
            >
              {t("faq.allLink")} <span aria-hidden="true">→</span>
            </a>
          </div>

          <FaqAccordion data-faq-rows="true" data-reveal="true">
            {faqs.map(({ question, html }, i) => (
              <FaqItem
                question={question}
                id={`faq-home-${i}`}
                index={i}
                numbered
                answerHtml={html}
                key={question}
              />
            ))}
            <div
              className="border-t"
              style={css("border-color: var(--line);")}
            ></div>
          </FaqAccordion>
        </div>
      </div>
    </section>
  );
}