/**
 * SURHAY — Maintenance mode (hard-coded).
 * Set `enabled: false` to take the site live again. No CMS / admin panel involved.
 */
export type MaintenanceLang = 'de' | 'en' | 'tr';

export const MAINTENANCE = {
  /** Master switch. true = whole site shows the maintenance screen. */
  enabled: false,

  /**
   * Optional countdown target, ISO 8601, e.g. '2026-11-20T18:00:00+01:00'.
   * null = no countdown, the screen shows a localized "shortly" state instead.
   */
  endsAt: null as string | null,

  /**
   * Routes that stay fully reachable during maintenance:
   * contact (leads keep coming in), legal pages (Impressumspflicht),
   * and the Decap admin so content work can continue.
   */
  allowlist: [
    '/admin',
    '/kontakt',
    '/impressum',
    '/datenschutz',
    '/cookie-einstellungen',
    '/en/contact',
    '/en/imprint',
    '/en/privacy',
    '/en/cookie-settings',
    '/tr/iletisim',
    '/tr/kunye',
    '/tr/gizlilik',
    '/tr/cerez-ayarlari',
  ],

  contactHref: {
    de: '/kontakt',
    en: '/en/contact',
    tr: '/tr/iletisim',
  } as Record<MaintenanceLang, string>,

  legalHref: {
    de: { imprint: '/impressum', privacy: '/datenschutz' },
    en: { imprint: '/en/imprint', privacy: '/en/privacy' },
    tr: { imprint: '/tr/kunye', privacy: '/tr/gizlilik' },
  } as Record<MaintenanceLang, { imprint: string; privacy: string }>,
};

/** Exact match or sub-path match, trailing-slash tolerant. */
export function isAllowedPath(pathname: string | null): boolean {
  if (!pathname) return false;
  const p = pathname.replace(/\/+$/, '') || '/';
  return MAINTENANCE.allowlist.some((entry) => {
    const a = entry.replace(/\/+$/, '');
    return p === a || p.startsWith(a + '/');
  });
}