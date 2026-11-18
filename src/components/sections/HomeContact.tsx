import type { LangProp } from "../../lib/props";
import { useTranslations } from "../../i18n/utils";
import ContactForm from "../ContactForm";

export default function HomeContact({ lang }: LangProp) {
  const t = useTranslations(lang);

  return (
    <section className="py-section-sm" aria-labelledby="home-contact-title">
      <div className="mx-auto w-full container px-5 md:px-8">
        <div className="text-center">
          <p className="eyebrow">{t("ctaForm.eyebrow")}</p>
          <h2 id="home-contact-title" className="h2 h2-sm mt-5">
            {t("ctaForm.title")}
          </h2>
          <p className="lead mx-auto mt-4 max-w-2xl text-mute">
            {t("ctaForm.sub")}
          </p>
        </div>
        <div className="mt-10 w-full flex justify-center items-center">
          <ContactForm lang={lang} showHomeLink={false} />
        </div>
      </div>
    </section>
  );
}