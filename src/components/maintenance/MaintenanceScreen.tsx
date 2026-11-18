'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { MAINTENANCE } from '../../maintenance.config';
import type { MaintenanceLang } from '../../maintenance.config';
import './maintenance.css';

/* ---------------------------------- copy ---------------------------------- */

interface Copy {
  metaTitle: string;
  eyebrow: string;
  titleA: string;
  titleEm: string;
  titleB: string;
  sub: string;
  cta: string;
  retry: string;
  reloading: string;
  note: string;
  statusTitle: string;
  statusBadge: string;
  steps: string[];
  done: string;
  active: string;
  next: string;
  clockLabel: string;
  clockSub: string;
  backLabel: string;
  soon: string;
  soonSub: string;
  anyMoment: string;
  units: string[];
  tagline: string;
  imprint: string;
  privacy: string;
  legalLabel: string;
  langLabel: string;
}

const COPY: Record<MaintenanceLang, Copy> = {
  de: {
    metaTitle: 'Wartungsmodus — Surhay',
    eyebrow: 'Wartungsmodus · Wir sind gleich zurück',
    titleA: 'Wir feilen am ',
    titleEm: 'letzten Pixel',
    titleB: '.',
    sub: 'Unsere Website wird gerade überarbeitet: neues Design, neue Inhalte, dieselbe Sorgfalt. In Kürze sind wir wieder online — Fragen oder ein dringendes Projekt? Schreiben Sie uns, wir lesen mit.',
    cta: 'Projekt anfragen',
    retry: 'Seite neu laden',
    reloading: 'Wird neu geladen …',
    note: 'Kontakt, Impressum & Datenschutz bleiben während der Wartung erreichbar.',
    statusTitle: 'Live-Status',
    statusBadge: 'In Arbeit',
    steps: ['Analyse & Konzept', 'Design', 'Entwicklung', 'Feinschliff & QA', 'Launch'],
    done: 'Fertig',
    active: 'Läuft',
    next: 'Als Nächstes',
    clockLabel: 'Ortszeit',
    clockSub: 'Europe/Berlin',
    backLabel: 'Wieder online',
    soon: 'In Kürze',
    soonSub: 'Sobald der letzte Test grün ist.',
    anyMoment: 'Jeden Moment',
    units: ['Tage', 'Std', 'Min', 'Sek'],
    tagline: 'Webdesign & Entwicklung',
    imprint: 'Impressum',
    privacy: 'Datenschutz',
    legalLabel: 'Rechtliches',
    langLabel: 'Sprache',
  },
  en: {
    metaTitle: 'Maintenance — Surhay',
    eyebrow: 'Maintenance mode · Back shortly',
    titleA: 'Polishing the ',
    titleEm: 'last pixel',
    titleB: '.',
    sub: 'Our website is being rebuilt: new design, new content, the same care. We’ll be back online shortly — questions or an urgent project? Write to us, we’re reading.',
    cta: 'Start a project',
    retry: 'Reload page',
    reloading: 'Reloading …',
    note: 'Contact, imprint & privacy stay reachable during maintenance.',
    statusTitle: 'Live status',
    statusBadge: 'In progress',
    steps: ['Analysis & concept', 'Design', 'Development', 'Final polish & QA', 'Launch'],
    done: 'Done',
    active: 'Running',
    next: 'Up next',
    clockLabel: 'Local time',
    clockSub: 'Europe/Berlin',
    backLabel: 'Back online',
    soon: 'Shortly',
    soonSub: 'As soon as the last test turns green.',
    anyMoment: 'Any moment now',
    units: ['Days', 'Hrs', 'Min', 'Sec'],
    tagline: 'Web design & development',
    imprint: 'Imprint',
    privacy: 'Privacy',
    legalLabel: 'Legal',
    langLabel: 'Language',
  },
  tr: {
    metaTitle: 'Bakım Modu — Surhay',
    eyebrow: 'Bakım Modu · Birazdan Dönüyoruz',
    titleA: 'Son ',
    titleEm: 'pikseli',
    titleB: ' parlatıyoruz.',
    sub: 'Web sitemiz şu anda yenileniyor: yeni tasarım, yeni içerikler, aynı özen. Kısa süre içinde yeniden çevrimiçiyiz — sorularınız veya acil bir projeniz mi var? Bize yazın, okuyoruz.',
    cta: 'Proje Talebi Gönder',
    retry: 'Sayfayı Yenile',
    reloading: 'Yenileniyor …',
    note: 'Bakım sırasında iletişim, künye ve gizlilik sayfaları erişilebilir kalır.',
    statusTitle: 'Canlı Durum',
    statusBadge: 'Sürüyor',
    steps: ['Analiz & Konsept', 'Tasarım', 'Geliştirme', 'İnce Ayar & Test', 'Yayın'],
    done: 'Bitti',
    active: 'Sürüyor',
    next: 'Sıradaki',
    clockLabel: 'Yerel Saat',
    clockSub: 'Europe/Berlin',
    backLabel: 'Yeniden Çevrimiçi',
    soon: 'Pek Yakında',
    soonSub: 'Son test yeşile döndüğünde.',
    anyMoment: 'Her An',
    units: ['Gün', 'Sa', 'Dk', 'Sn'],
    tagline: 'Web Tasarım & Geliştirme',
    imprint: 'Künye',
    privacy: 'Gizlilik',
    legalLabel: 'Yasal',
    langLabel: 'Dil',
  },
};

const LOCALE: Record<MaintenanceLang, string> = { de: 'de-DE', en: 'en-GB', tr: 'tr-TR' };
const LANG_NAME: Record<MaintenanceLang, string> = { de: 'Deutsch', en: 'English', tr: 'Türkçe' };
const LANGS: MaintenanceLang[] = ['de', 'en', 'tr'];
const STEP_STATES = ['done', 'done', 'done', 'active', 'next'] as const;
const LANG_KEY = 'surhay-maintenance-lang';

/* --------------------------------- flags ---------------------------------- */

function Flag({ code }: { code: MaintenanceLang }) {
  if (code === 'de') {
    return (
      <svg viewBox="0 0 24 16" aria-hidden="true" focusable="false">
        <rect width="24" height="16" fill="#000" />
        <rect y="5.33" width="24" height="5.34" fill="#DD0000" />
        <rect y="10.67" width="24" height="5.33" fill="#FFCE00" />
      </svg>
    );
  }
  if (code === 'en') {
    return (
      <svg viewBox="0 0 24 16" aria-hidden="true" focusable="false">
        <rect width="24" height="16" fill="#012169" />
        <path d="M0,0 L24,16 M24,0 L0,16" stroke="#fff" strokeWidth="3.2" />
        <path d="M0,0 L24,16 M24,0 L0,16" stroke="#C8102E" strokeWidth="1.4" />
        <rect x="9.6" width="4.8" height="16" fill="#fff" />
        <rect y="5.6" width="24" height="4.8" fill="#fff" />
        <rect x="10.56" width="2.88" height="16" fill="#C8102E" />
        <rect y="6.56" width="24" height="2.88" fill="#C8102E" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 16" aria-hidden="true" focusable="false">
      <rect width="24" height="16" fill="#E30A17" />
      <circle cx="9.5" cy="8" r="4" fill="#fff" />
      <circle cx="10.7" cy="8" r="3.2" fill="#E30A17" />
      <polygon
        fill="#fff"
        points="16,6.1 16.46,7.37 17.81,7.41 16.74,8.24 17.12,9.54 16,8.78 14.88,9.54 15.26,8.24 14.19,7.41 15.54,7.37"
      />
    </svg>
  );
}

/* --------------------------------- screen --------------------------------- */

const rise = (d: number) => ({ '--d': `${d}ms` } as CSSProperties);
const pad = (n: number) => String(n).padStart(2, '0');

export default function MaintenanceScreen() {
  const [lang, setLang] = useState<MaintenanceLang>('de');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [clock, setClock] = useState('');
  const [remaining, setRemaining] = useState<number | null>(null);
  const [reloading, setReloading] = useState(false);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const retryTimer = useRef<number | null>(null);

  const t = COPY[lang];
  const year = new Date().getFullYear();

  const endsAtMs = useMemo(() => {
    if (!MAINTENANCE.endsAt) return null;
    const ms = Date.parse(MAINTENANCE.endsAt);
    return Number.isFinite(ms) ? ms : null;
  }, []);

  /* Use the site's real rendered background color, verbatim. */
  useEffect(() => {
    const parse = (c: string): [number, number, number, number] | null => {
      const m = c.match(/rgba?\(([^)]+)\)/);
      if (!m) return null;
      const p = m[1].split(',').map((s) => parseFloat(s.trim()));
      if (p.length < 3 || p.some((n) => Number.isNaN(n))) return null;
      return [p[0], p[1], p[2], p.length > 3 ? p[3] : 1];
    };
    let color = '#f5f3ee';
    let light = true;
    for (const el of [document.body, document.documentElement]) {
      const cs = getComputedStyle(el);
      const rgba = parse(cs.backgroundColor);
      if (rgba && rgba[3] > 0) {
        color = cs.backgroundColor;
        light = (0.299 * rgba[0] + 0.587 * rgba[1] + 0.114 * rgba[2]) / 255 > 0.55;
        break;
      }
    }
    setTheme(light ? 'light' : 'dark');
    if (rootRef.current) {
      rootRef.current.style.background = color;
      rootRef.current.style.colorScheme = light ? 'light' : 'dark';
    }
  }, []);

  /* Language: saved preference → browser language → German. */
  useEffect(() => {
    let pick: MaintenanceLang = 'de';
    try {
      const saved = window.localStorage.getItem(LANG_KEY);
      if (saved === 'de' || saved === 'en' || saved === 'tr') {
        pick = saved;
      } else {
        const nav = (navigator.language || 'de').slice(0, 2).toLowerCase();
        if (nav === 'en' || nav === 'tr') pick = nav;
      }
    } catch {
      /* storage unavailable — keep default */
    }
    setLang(pick);
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(LANG_KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  /* Document language, title and noindex while the screen is mounted. */
  useEffect(() => {
    const html = document.documentElement;
    const prevLang = html.lang;
    const prevTitle = document.title;
    html.lang = lang;
    document.title = t.metaTitle;

    let meta = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const created = !meta;
    const prevContent = meta?.content ?? null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'robots';
      document.head.appendChild(meta);
    }
    meta.content = 'noindex, nofollow';

    return () => {
      html.lang = prevLang;
      document.title = prevTitle;
      if (created) meta?.remove();
      else if (meta && prevContent !== null) meta.content = prevContent;
    };
  }, [lang, t]);

  /* One ticker drives the Berlin clock and the optional countdown. */
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat(LOCALE[lang], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'Europe/Berlin',
    });
    const tick = () => {
      setClock(fmt.format(new Date()));
      if (endsAtMs !== null) setRemaining(endsAtMs - Date.now());
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [lang, endsAtMs]);

  /* Retry with visible feedback; timer cleaned up on unmount. */
  useEffect(
    () => () => {
      if (retryTimer.current !== null) window.clearTimeout(retryTimer.current);
    },
    []
  );
  const retry = () => {
    if (reloading) return;
    setReloading(true);
    retryTimer.current = window.setTimeout(() => window.location.reload(), 700);
  };

  const showCountdown = endsAtMs !== null && remaining !== null && remaining > 0;
  const finished = endsAtMs !== null && remaining !== null && remaining <= 0;
  const totalSec = showCountdown ? Math.floor((remaining as number) / 1000) : 0;
  const cells = [
    Math.floor(totalSec / 86400),
    Math.floor(totalSec / 3600) % 24,
    Math.floor(totalSec / 60) % 60,
    totalSec % 60,
  ];
  const targetLabel = useMemo(
    () =>
      endsAtMs !== null
        ? new Intl.DateTimeFormat(LOCALE[lang], {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Europe/Berlin',
          }).format(new Date(endsAtMs))
        : '',
    [lang, endsAtMs]
  );

  const legal = MAINTENANCE.legalHref[lang];

  return (
    <div className="mt" ref={rootRef} data-mt-theme={theme}>
      <div className="mt-shell">
        <header className="mt-top" data-rise style={rise(0)}>
          <div className="mt-brand">
            <span className="mt-brand-name">
              SURHAY<sup>®</sup>
            </span>
            <span className="mt-brand-tag">Studio</span>
          </div>
          <div className="mt-langs" role="group" aria-label={t.langLabel}>
            {LANGS.map((code) => (
              <button
                key={code}
                type="button"
                className="mt-lang"
                aria-pressed={lang === code}
                title={LANG_NAME[code]}
                onClick={() => setLang(code)}
              >
                <Flag code={code} />
                <span>{code.toUpperCase()}</span>
              </button>
            ))}
          </div>
        </header>

        <main className="mt-main">
          <section className="mt-hero">
            <p className="mt-eyebrow" data-rise style={rise(80)}>
              <span className="mt-dot" />
              {t.eyebrow}
            </p>
            <h1 className="mt-title" data-rise style={rise(160)}>
              {t.titleA}
              <em>{t.titleEm}</em>
              {t.titleB}
            </h1>
            <p className="mt-sub" data-rise style={rise(240)}>
              {t.sub}
            </p>
            <div className="mt-actions" data-rise style={rise(320)}>
              <Link className="mt-btn" href={MAINTENANCE.contactHref[lang]}>
                {t.cta}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </Link>
              <button type="button" className="mt-textbtn" onClick={retry} disabled={reloading}>
                <svg
                  className={reloading ? 'mt-spin-icon' : undefined}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 12a9 9 0 1 1-2.64-6.36" />
                  <path d="M21 3v6h-6" />
                </svg>
                {reloading ? t.reloading : t.retry}
              </button>
            </div>
            <p className="mt-note" data-rise style={rise(400)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8h.01M12 11v5" />
              </svg>
              {t.note}
            </p>
          </section>

          <aside className="mt-card" data-rise style={rise(300)}>
            <div className="mt-card-head">
              <h2>{t.statusTitle}</h2>
              <span className="mt-badge">{t.statusBadge}</span>
            </div>

            <ol className="mt-steps">
              {t.steps.map((label, i) => {
                const state = STEP_STATES[i];
                return (
                  <li key={label} className={`mt-step mt-step-${state}`}>
                    <div className="mt-step-row">
                      <span className="mt-step-icon" aria-hidden="true">
                        {state === 'done' && (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 12.5l5 5L20 6.5" />
                          </svg>
                        )}
                        {state === 'active' && <span className="mt-spinner" />}
                        {state === 'next' && <span className="mt-hollow" />}
                      </span>
                      <span className="mt-step-label">{label}</span>
                      <span className={`mt-chip mt-chip-${state}`}>
                        {state === 'done' ? t.done : state === 'active' ? t.active : t.next}
                      </span>
                    </div>
                    {state === 'active' && (
                      <span className="mt-bar" aria-hidden="true">
                        <i />
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>

            <div className="mt-tiles">
              <div className="mt-tile">
                <span className="mt-tile-label">{t.clockLabel}</span>
                <span className="mt-clock" aria-hidden="true">
                  {clock || '—:—:—'}
                </span>
                <span className="mt-tile-sub">{t.clockSub}</span>
              </div>
              <div className="mt-tile">
                <span className="mt-tile-label">{t.backLabel}</span>
                {showCountdown ? (
                  <span className="mt-count">
                    {cells.map((v, i) => (
                      <span className="mt-count-cell" key={t.units[i]}>
                        <b>{pad(v)}</b>
                        <i>{t.units[i]}</i>
                      </span>
                    ))}
                  </span>
                ) : (
                  <span className={`mt-soon${finished ? ' mt-soon-now' : ''}`}>
                    <i />
                    {finished ? t.anyMoment : t.soon}
                  </span>
                )}
                <span className="mt-tile-sub">{showCountdown ? targetLabel : t.soonSub}</span>
              </div>
            </div>
          </aside>
        </main>

        <footer className="mt-foot" data-rise style={rise(480)}>
          <span>
            © {year} Surhay · {t.tagline}
          </span>
          <nav aria-label={t.legalLabel}>
            <Link href={legal.imprint}>{t.imprint}</Link>
            <Link href={legal.privacy}>{t.privacy}</Link>
          </nav>
        </footer>
      </div>
    </div>
  );
}