import { locales, defaultLang, type Lang } from './ui';
import { services } from '../data/services';

export const routes = {
  de: {
    services: 'leistungen',
    work: 'projekte',
    process: 'prozess',
    pricing: 'preise',
    about: 'agentur',
    faq: 'faq',
    blog: 'blog',
    contact: 'kontakt',
    configurator: 'konfigurator',
    imprint: 'impressum',
    privacy: 'datenschutz',
    cookies: 'cookie-einstellungen',
  },
  tr: {
    services: 'hizmetler',
    work: 'projeler',
    process: 'surec',
    pricing: 'fiyatlar',
    about: 'hakkimizda',
    faq: 'sss',
    blog: 'blog',
    contact: 'iletisim',
    configurator: 'yapilandirici',
    imprint: 'kunye',
    privacy: 'gizlilik',
    cookies: 'cerez-ayarlari',
  },
  en: {
    services: 'services',
    work: 'work',
    process: 'process',
    pricing: 'pricing',
    about: 'about',
    faq: 'faq',
    blog: 'blog',
    contact: 'contact',
    configurator: 'configurator',
    imprint: 'imprint',
    privacy: 'privacy',
    cookies: 'cookie-settings',
  },
} as const satisfies Record<Lang, Record<string, string>>;

export type RouteKey = keyof (typeof routes)['de'];

const routeKeys = Object.keys(routes[defaultLang]) as RouteKey[];

/** Pfad einer Seite OHNE Base-Praefix: rawPath('tr', 'pricing') → '/tr/fiyatlar' */
export function rawPath(lang: Lang, key?: RouteKey, sub?: string): string {
  const prefix = lang === defaultLang ? '' : `/${lang}`;
  if (!key) return prefix || '/';
  return `${prefix}/${routes[lang][key]}${sub ? `/${sub}` : ''}`;
}

const bySlug = (lang: Lang, slug: string) => routeKeys.find((key) => routes[lang][key] === slug);

const spread = (build: (lang: Lang) => string) =>
  Object.fromEntries(locales.map((lang) => [lang, build(lang)])) as Record<Lang, string>;
export function alternatePaths(pathname: string): Record<Lang, string> | null {
  const segments = pathname.split('/').filter(Boolean);
  const prefix = locales.find((lang) => lang !== defaultLang && lang === segments[0]);
  const lang: Lang = prefix ?? defaultLang;
  const rest = prefix ? segments.slice(1) : segments;

  if (rest.length === 0) return spread((l) => rawPath(l));

  const key = bySlug(lang, rest[0]);
  if (!key) return null;
  if (rest.length === 1) return spread((l) => rawPath(l, key));
  if (rest.length > 2) return null;
  if (key === 'services') {
    const service = services.find((entry) => entry[lang].slug === rest[1]);
    return service ? spread((l) => rawPath(l, key, service[l].slug)) : null;
  }
  return spread((l) => rawPath(l, key, rest[1]));
}
