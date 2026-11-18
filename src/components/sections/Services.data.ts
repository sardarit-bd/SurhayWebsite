import { IconType } from "react-icons";
import { FiBox, FiLayers, FiPieChart, FiHeadphones } from "react-icons/fi";
import { t, path } from "../../i18n/utils";
import type { Lang, UiKey } from "../../i18n/ui";
import { services as catalog, type ServiceId } from "../../data/services";

export interface ServiceItem {
  number: string;
  title: [string, string];
  description: string;
  bullets: string[];
  Icon: IconType;
  href?: string;
}

const ICONS: IconType[] = [FiBox, FiLayers, FiPieChart, FiHeadphones];

/* Same order as ICONS / svc.1–svc.4. null = no service page yet. */
const SERVICE_IDS: (ServiceId | null)[] = [
  "webdesign",
  "webentwicklung",
  "seo-performance",
  null,
];

export function getServices(lang: Lang): ServiceItem[] {
  return ICONS.map((Icon, i) => {
    const n = i + 1;
    const title: [string, string] = [
      t(`svc.${n}.t1` as UiKey, lang),
      t(`svc.${n}.t2` as UiKey, lang),
    ];
    const id = SERVICE_IDS[i];
    const entry = id ? catalog.find((s) => s.id === id) : undefined;
    return {
      number: `0${n}.`,
      title,
      description: t(`svc.${n}.desc` as UiKey, lang),
      bullets: [],
      Icon,
      href: entry ? path(lang, "services", entry[lang].slug) : path(lang, "contact"),
    };
  });
}
export const services: ServiceItem[] = getServices("de");