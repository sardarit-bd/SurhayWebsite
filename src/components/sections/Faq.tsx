import type { LangProp } from "../../lib/props";
import { css } from "../../lib/css";
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
      className="scroll-mt-24 py-20 lg:py-28 bg-paper border-b border-ink/10"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-x-5 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-5" data-reveal="">
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-[#0E7490]"></span>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#686759]">
                {t("faq.eyebrow")}
              </span>
            </div>
            <h2 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-[4rem] leading-[1.02] text-ink tracking-[-0.03em]">
              {t("faq.title")}
            </h2>
            <div className="mt-8">
              <a
                href={path(lang, "faq")}
                className="link-slide inline-block font-body font-semibold text-ink"
              >
                {t("faq.allLink")} <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <FaqAccordion id="faq-home-list" data-reveal="">
              <div>
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
                />
              </div>
            </FaqAccordion>
          </div>
        </div>
      </div>

      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html:
            "customElements.whenDefined('faq-accordion').then(function(){var a=document.getElementById('faq-home-list');var i=a&&a.querySelector('.faq-item');if(a&&i&&typeof a.setOpen==='function')a.setOpen(i,true,false);});",
        }}
      />
    </section>
  );
}