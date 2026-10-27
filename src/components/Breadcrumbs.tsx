import clsx from 'clsx';
import { SITE_HREF } from '../base';
import { useTranslations, localePath } from '../i18n/utils';
import type { LangProp } from '../lib/props';

export interface Crumb {
  label: string;
  href?: string;
}

interface Props extends LangProp {
  items: Crumb[];
  dark?: boolean;
}

export default function Breadcrumbs({ items, dark = false, lang }: Props) {
  const t = useTranslations(lang);
  const trail: Crumb[] = [{ label: t('breadcrumb.home'), href: localePath(lang, '/') }, ...items];
  const siteBase = SITE_HREF;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.label,
      ...(crumb.href ? { item: new URL(crumb.href, siteBase).href } : {}),
    })),
  };

  return (
    <>
      <nav aria-label={t('breadcrumb.label')} className="text-[0.82rem]">
        <ol className={clsx(['flex flex-wrap items-center gap-x-2 gap-y-1', dark ? 'text-mute-dark' : 'text-mute'])}>
          {trail.map((crumb, i) => (
            <li className="flex items-center gap-2" key={`${i}-${crumb.label}`}>
              {i > 0 && <span aria-hidden="true">/</span>}
              {crumb.href ? (
                <a href={crumb.href} className="link-slide tap-24">
                  {crumb.label}
                </a>
              ) : (
                <span aria-current="page" className={clsx([dark ? 'text-paper' : 'text-ink', 'font-semibold'])}>
                  {crumb.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
