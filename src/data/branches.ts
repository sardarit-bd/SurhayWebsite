import type { Lang } from '../i18n/ui';

export interface Branch {
  id: string;
  label: string | Record<Lang, string>;
  proof: string | Record<Lang, string>;
  icons: string[];
}

export const branches: Branch[] = [
  {
    id: 'praxen',
    label: { de: 'Praxen', tr: 'muayenehaneler', en: 'practices' },
    proof: {
      de: 'Termine kommen online herein statt über das Telefon',
      tr: 'Randevular telefon yerine internet üzerinden geliyor',
      en: 'Appointments arrive online instead of over the phone',
    },
    icons: ['stethoscope', 'dental', 'calendar-check', 'heartbeat', 'first-aid-kit', 'shield-check'],
  },
  {
    id: 'kanzleien',
    label: { de: 'Kanzleien', tr: 'hukuk büroları', en: 'firms' },
    proof: {
      de: 'Anfragen, die bereits qualifiziert im Postfach liegen',
      tr: 'Gelen kutunuza hazır ve nitelikli düşen talepler',
      en: 'Enquiries that land pre-qualified in your inbox',
    },
    icons: ['scale', 'gavel', 'file-certificate', 'calculator', 'folders', 'briefcase'],
  },
  {
    id: 'handwerk',
    label: { de: 'Handwerk & Bau', tr: 'zanaatkârlar', en: 'trades & building' },
    proof: {
      de: 'Anfragen mit allen Angaben zum Objekt, ohne Rückfrage',
      tr: 'Talepler, proje bilgileri eksiksiz geliyor — geri sormaya gerek kalmadan',
      en: 'Enquiries with every detail about the property, no follow-up needed',
    },
    icons: ['hammer', 'tool', 'ruler-measure', 'home', 'building-arch', 'truck'],
  },
];

export function pickBranch(value: string | Record<Lang, string>, lang: Lang): string {
  return typeof value === 'string' ? value : value[lang];
}
export function headlineLabel(lang: Lang, lead: string, built: string): string {
  const labels = branches.map((b) => pickBranch(b.label, lang));
  const last = labels.pop() as string;
  const conjunction = { de: 'und', tr: 've', en: 'and' }[lang];
  const joined = `${labels.join(', ')} ${conjunction} ${last}`;
  const sentence = built.charAt(0).toUpperCase() + built.slice(1);
  return `${lead} ${sentence} ${joined}.`;
}
