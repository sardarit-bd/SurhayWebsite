import { scoped } from '../../lib/scoped';
import { css } from '../../lib/css';
import type { LangProp, PfadProp } from '../../lib/props';
import Base from '../../layouts/Base';
import PageHeader from '../PageHeader';
import ContactForm from '../ContactForm';
import { SITE, phoneNumber } from '../../config';
import { useTranslations, altPaths } from '../../i18n/utils';

/**
 * Kontaktseite (/kontakt, /en/contact).
 *
 * DAS FORMULAR IST DER HAUPTWEG
 * Vorher bot die Seite drei Wege an, von denen zwei aus ihr herausfuehrten —
 * und liess die rechte Spalte unter den beiden Karten leer. Jetzt steht links
 * das Anfrageformular, rechts alles, was jemanden vor dem Absenden noch
 * beschaeftigt.
 *
 * "WAS DANACH PASSIERT" WANDERT NACH RECHTS
 * Es stand bisher weit unter dem Formular. Dort beantwortet es die Frage, die
 * vom Absenden abhaelt — was passiert, wenn ich das jetzt abschicke —, erst
 * nachdem sie sich nicht mehr stellt. Neben dem Button beantwortet es sie im
 * richtigen Moment und fuellt nebenbei die leere Spalte.
 *
 * DIE BEIDEN ALTERNATIVEN STEHEN IM FORMULAR
 * Termin und Konfigurator hatten hier zuletzt eine eigene Karte in der
 * Seitenspalte. Drei Karten neben einem Formular sind zu viel Gewicht neben
 * der einen Handlung, um die es geht — die beiden Links stehen jetzt als
 * eine Zeile unter dem Absenden-Button (ContactForm.astro) und damit auch in
 * der globalen Anfrage-Sektion, wo sie vorher ganz fehlten.
 */

export default function ContactPage({ lang, pathname }: LangProp & PfadProp) {
  const t = useTranslations(lang);

  const expectations = [t('page.contact.expect1'), t('page.contact.expect2'), t('page.contact.expect3')];

  return scoped(
    'data-c-contact-page',
    <Base pathname={pathname} lang={lang} title={t('page.contact.metaTitle')} description={t('page.contact.metaDesc')} alternates={altPaths('contact')}>
      <PageHeader lang={lang} eyebrow={t('contact.eyebrow')} title={t('contact.title')} lead={t('page.contact.lead')} crumbs={[{ label: t('nav.contact') }]} />

      <section style={css("padding-bottom: var(--spacing-section);")}>
        <div className="contact-grid mx-auto max-w-7xl px-5 md:px-8">
          <div data-reveal="">
            <ContactForm lang={lang} />
          </div>

          {/* --------------------------------------------------- Seitenspalte
              Ab 1024 px klebend, damit "Was danach passiert" auf der ganzen
              Formularhoehe neben dem Absenden-Button stehen bleibt. */}
          <aside className="contact-aside lg:sticky lg:top-24 lg:self-start" data-reveal="" style={css("--reveal-delay: 0.16s;")}>
            <div className="dark-section grain overflow-hidden rounded-2xl">
              <div className="relative p-8">
                <p className="eyebrow text-mute-dark">{t('contact.direct')}</p>
                <a href={`mailto:${SITE.email}`} className="link-slide font-display mt-4 block font-semibold break-all text-xl">
                  {SITE.email}
                </a>
                {/* Gleiches Gewicht wie die E-Mail — wer lieber anruft, soll nicht
                    erst suchen. Steht nur da, wenn in src/config.ts eine echte
                    Nummer gepflegt ist: eine erfundene oder ein sichtbares
                    „[Telefonnummer]“ kostet mehr Glaubwuerdigkeit, als die Zeile
                    bringt. Siehe `phoneNumber` dort. */}
                {
                  phoneNumber && (
                    <a href={phoneNumber.href} className="link-slide font-display mt-2 block font-semibold text-xl">
                      {phoneNumber.display}
                    </a>
                  )
                }
                <p className="mt-6 flex items-center gap-2 text-sm text-mute-dark">
                  <span className="pulse-dot inline-flex h-2.5 w-2.5 rounded-full bg-accent-ctx"></span>
                  {t('trust.1.title')}
                </p>
                <div className="mt-8 border-t pt-6 text-sm text-mute-dark" style={css("border-color: var(--line-dark);")}>
                  {SITE.name}<br />
                  {SITE.city}, {t('common.country')}
                </div>
              </div>
            </div>

            {/* Statt Kreis-Badges nur die Ziffer: Der Kreis war ein zweiter
                Rahmen in einer Karte, die schon einen hat, und trug keine
                Information, die die Zahl nicht auch allein traegt. */}
            <div className="mt-8 rounded-2xl border p-8" style={css("border-color: var(--line);")}>
              <p className="eyebrow text-mute">{t('page.contact.expect')}</p>
              <ol className="mt-5 space-y-4">
                {
                  expectations.map((item, i) => (
                    <li className="flex gap-3 text-[0.9rem] leading-relaxed text-mute">
                      <span className="font-display flex-none font-bold text-ink tabular-nums">{i + 1}</span>
                      <span>{item}</span>
                    </li>
                  ))
                }
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </Base>
  );
}

