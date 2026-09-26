import { scoped } from '../../lib/scoped';
import { css } from '../../lib/css';
import type { LangProp } from '../../lib/props';
import { SITE, formspreeAction } from '../../config';
import { useTranslations, localePath, routes } from '../../i18n/utils';
import { InlineScript } from '../../lib/inline-once';

/**
 * Kontakt — letzter Block der Seite, drei Wege zum Gespräch.
 *
 * FORMULAR ODER NICHT
 * Das Formular postet an Formspree — nicht an SITE.formEndpoint, das der
 * Kontaktseite gehoert. Solange in SITE.formspreeId noch der
 * Auslieferungswert steht, geht jede abgeschickte Anfrage verloren — der
 * teuerste denkbare Fehler auf einer Verkaufsseite. Deshalb rendert die
 * Sektion in diesem Fall gar kein Formular, sondern die beiden Wege, die
 * ohne Konfiguration funktionieren: Direktnachricht per E-Mail und
 * Terminbuchung. Sobald die Form-ID eingetragen ist, erscheint das Formular
 * automatisch wieder.
 */

export default function Contact({ lang }: LangProp) {
  const t = useTranslations(lang);
  const privacyHref = localePath(lang, `/${routes[lang].privacy}`);
  const configuratorHref = localePath(lang, `/${routes[lang].configurator}`);

  return (
    <>
      {scoped(
        'data-c-contact',
        <section id="contact" className="dark-section grain scroll-mt-24" style={css("padding-block: var(--spacing-section);")}>
          <div className="relative mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-[3fr_2fr] lg:gap-24">
            <div>
              <p className="eyebrow text-mute-dark" data-reveal="">{t('contact.eyebrow')}</p>
              <h2 className="h2 reveal-mask mt-5" data-reveal="">
                <span className="reveal-line">{t('contact.title')}</span>
              </h2>
              <p className="lead mt-5 max-w-xl text-mute-dark" data-reveal="" style={css("--reveal-delay: 0.08s;")}>{t('contact.sub')}</p>

              {
                formspreeAction ? (
                  /* Kontaktformular: drei Felder, statisch via Formspree. */
                  <form id="contact-form" action={formspreeAction} method="POST" className="mt-10 max-w-xl space-y-5" data-reveal="" style={css("--reveal-delay: 0.16s;")}>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="cf-name" className="mb-2 block text-sm font-semibold">
                          {t('contact.name')}
                        </label>
                        <input id="cf-name" name="name" type="text" required autoComplete="name" className="cf-input w-full rounded-xl border bg-transparent px-4 py-3.5" />
                      </div>
                      <div>
                        <label htmlFor="cf-email" className="mb-2 block text-sm font-semibold">
                          {t('contact.email')}
                        </label>
                        <input id="cf-email" name="email" type="email" required autoComplete="email" className="cf-input w-full rounded-xl border bg-transparent px-4 py-3.5" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="cf-message" className="mb-2 block text-sm font-semibold">
                        {t('contact.message')}
                      </label>
                      <textarea id="cf-message" name="message" rows={4} required className="cf-input w-full resize-y rounded-xl border bg-transparent px-4 py-3.5" />
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      <button type="submit" className="btn btn-primary">
                        {t('contact.submit')}
                        <svg className="btn-arrow h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      <span className="text-sm text-mute-dark">{t('contact.or')}</span>
                      <a href={configuratorHref} className="btn btn-ghost">
                        {t('contact.configurator')}
                      </a>
                    </div>

                    <p className="text-xs leading-relaxed text-mute-dark">
                      {t('contact.privacyNote')}
                      <a href={privacyHref} className="link-slide ml-1 font-semibold">
                        {t('contact.privacyLink')}
                      </a>
                      .
                    </p>

                    <p id="form-success" className="hidden rounded-xl bg-accent-600 px-5 py-4 font-medium text-white" role="status">
                      {t('contact.success')}
                    </p>
                    <p id="form-error" className="hidden rounded-xl border border-red-400 px-5 py-4 text-sm" role="alert">
                      {t('contact.error')}
                      <a href={`mailto:${SITE.email}`} className="link-slide font-semibold">
                        {SITE.email}
                      </a>
                    </p>
                  </form>
                ) : (
                  /* Ohne Form-ID: die zwei Wege, die ohne Konfiguration tragen. */
                  <div className="mt-10 max-w-xl" data-reveal="" style={css("--reveal-delay: 0.16s;")}>
                    <ol className="space-y-8">
                      <li>
                        <p className="eyebrow text-mute-dark">{t('contact.route1.step')}</p>
                        <p className="mt-3 font-display text-xl font-bold tracking-tight">{t('contact.route1.title')}</p>
                        <p className="mt-2 text-[0.95rem] leading-relaxed text-mute-dark">{t('contact.route1.desc')}</p>
                        <a href={`mailto:${SITE.email}?subject=${encodeURIComponent(t('contact.route1.subject'))}`} className="btn btn-primary mt-5">
                          {t('contact.route1.cta')}
                          <svg className="btn-arrow h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </a>
                      </li>
                      <li className="border-t pt-8" style={css("border-color: var(--line-dark);")}>
                        <p className="eyebrow text-mute-dark">{t('contact.route2.step')}</p>
                        <p className="mt-3 font-display text-xl font-bold tracking-tight">{t('contact.route2.title')}</p>
                        <p className="mt-2 text-[0.95rem] leading-relaxed text-mute-dark">{t('contact.route2.desc')}</p>
                        <div className="mt-5 flex flex-wrap items-center gap-4">
                          <a href={SITE.calendarUrl} className="btn btn-ghost" rel="noopener noreferrer" target="_blank">
                            {t('contact.route2.cta')}
                          </a>
                          <a href={configuratorHref} className="link-slide font-semibold">
                            {t('contact.configurator')}
                          </a>
                        </div>
                      </li>
                    </ol>
                  </div>
                )
              }
            </div>

            <aside className="lg:pt-24" data-reveal="" style={css("--reveal-delay: 0.24s;")}>
              <div className="rounded-2xl border p-8" style={css("border-color: var(--line-dark); background: var(--color-ink-2);")}>
                <p className="eyebrow text-mute-dark">{t('contact.direct')}</p>
                <a href={`mailto:${SITE.email}`} className="link-slide mt-4 block font-display text-xl font-semibold break-all">
                  {SITE.email}
                </a>
                <p className="mt-6 flex items-center gap-2 text-sm text-mute-dark">
                  <span className="pulse-dot inline-flex h-2.5 w-2.5 rounded-full bg-accent-ctx"></span>
                  {t('trust.1.title')}
                </p>
                <div className="mt-8 border-t pt-6 text-sm text-mute-dark" style={css("border-color: var(--line-dark);")}>
                  {SITE.name}<br />
                  {SITE.city}, {t('common.country')}
                </div>
              </div>
            </aside>
          </div>
        </section>
      )}
      <InlineScript name="contact" />
    </>
  );
}
