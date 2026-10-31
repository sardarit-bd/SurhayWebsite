import { ui, defaultLang, locales, localeMeta, type Lang, type UiKey } from './ui';
import { BASE_URL } from '../base';
import { routes, type RouteKey } from './routes';
export { routes };
export type { RouteKey };
export function stripBase(pathname: string): string {
  const base = BASE_URL;
  const trimmed = base.endsWith('/') ? base.slice(0, -1) : base;
  const path = trimmed && pathname.startsWith(trimmed) ? pathname.slice(trimmed.length) : pathname;
  return path.startsWith('/') ? path : `/${path}`;
}
const prefixed = locales.filter((l) => l !== defaultLang);

export function getLangFromUrl(url: URL): Lang {
  const [, first] = stripBase(url.pathname).split('/');
  return prefixed.find((l) => l === first) ?? defaultLang;
}

export function useTranslations(lang: Lang) {
  return (key: UiKey): string => t(key, lang);
}
export function t(key: UiKey, lang: Lang): string {
  const table = ui[lang] as Record<string, string | undefined>;
  return table[key] ?? ui[defaultLang][key];
}

export function withBase(path: string): string {
  const base = BASE_URL;
  if (!path.startsWith('/')) return path; 
  const trimmed = base.endsWith('/') ? base.slice(0, -1) : base;
  return `${trimmed}${path}`;
}

export function localePath(lang: Lang, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const localized = lang === defaultLang ? clean : `/${lang}${clean === '/' ? '' : clean}`;
  return withBase(localized);
}

export function path(lang: Lang, key: RouteKey, sub?: string): string {
  const tail = sub ? `/${sub}` : '';
  return localePath(lang, `/${routes[lang][key]}${tail}`);
}

export function altPaths(key: RouteKey, sub?: string | Partial<Record<Lang, string>>): Record<Lang, string> {
  const pick = (lang: Lang) => (typeof sub === 'string' ? sub : sub?.[lang]);
  return Object.fromEntries(
    locales.map((lang) => {
      const tail = pick(lang);
      return [lang, typeof sub === 'undefined' || tail ? path(lang, key, tail) : path(lang, key)];
    })
  ) as Record<Lang, string>;
}

export function homePaths(): Record<Lang, string> {
  return Object.fromEntries(locales.map((lang) => [lang, localePath(lang, '/')])) as Record<Lang, string>;
}

export function isActive(currentPathname: string, href: string, exact = false): boolean {
  const norm = (p: string) => {
    const s = stripBase(p).replace(/\/+$/, '');
    return s === '' ? '/' : s;
  };
  const current = norm(currentPathname);
  const target = norm(href);
  const homes = ['/', ...prefixed.map((l) => `/${l}`)];
  if (homes.includes(target)) return current === target;
  return exact ? current === target : current === target || current.startsWith(`${target}/`);
}

export function splitId(id: string): { lang: Lang; slug: string } {
  const [first, ...rest] = id.split('/');
  const lang = locales.find((l) => l === first) ?? defaultLang;
  return { lang, slug: rest.join('/') };
}

export function formatDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(localeMeta[lang].intl, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function readingTime(body: string): number {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export function formatNumber(value: number, lang: Lang): string {
  return new Intl.NumberFormat(localeMeta[lang].intl).format(value);
}

export { locales, localeMeta };
