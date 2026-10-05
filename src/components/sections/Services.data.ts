import { IconType } from "react-icons";
import { FiBox, FiLayers, FiPieChart, FiHeadphones } from "react-icons/fi";
import { t } from "../../i18n/utils";
import type { Lang, UiKey } from "../../i18n/ui";

export interface ServiceItem {
  number: string;
  title: [string, string];
  description: string;
  bullets: string[];
  Icon: IconType;
}

const ICONS: IconType[] = [FiBox, FiLayers, FiPieChart, FiHeadphones];
export function getServices(lang: Lang): ServiceItem[] {
  return ICONS.map((Icon, i) => {
    const n = i + 1;
    const title: [string, string] = [
      t(`svc.${n}.t1` as UiKey, lang),
      t(`svc.${n}.t2` as UiKey, lang),
    ];
    return {
      number: `0${n}.`,
      title,
      description: t(`svc.${n}.desc` as UiKey, lang),
      bullets: [],
      Icon,
    };
  });
}
export const services: ServiceItem[] = getServices("de");
