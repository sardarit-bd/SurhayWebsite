export type Lang = "de" | "en" | "tr";

type HeroCopy = {
  badge: string;
  titleLine1: string;
  titleLine2: string;
  text: string;
  primaryCta: string;
  primaryHref: string;
  secondaryCta: string;
  secondaryHref: string;
};

export const heroCopy: Record<Lang, HeroCopy> = {
  en: {
    badge: "48+ startups & founders chose wfc.design",
    titleLine1: "Transforming visions",
    titleLine2: "into conversion website",
    text: "We create websites that look stunning and drive results—elevating your online presence to achieve your business goals.",
    primaryCta: "Get a project quote",
    primaryHref: "/en/contact",
    secondaryCta: "See our work",
    secondaryHref: "#work",
  },
  de: {
    badge: "48+ Startups & Gründer vertrauen wfc.design",
    titleLine1: "Aus Visionen werden",
    titleLine2: "Websites, die konvertieren",
    text: "Wir gestalten Websites, die überzeugen und Ergebnisse liefern – und bringen Ihren Online-Auftritt auf das nächste Level, damit Sie Ihre Geschäftsziele erreichen.",
    primaryCta: "Projektangebot anfragen",
    primaryHref: "/kontakt",
    secondaryCta: "Unsere Arbeiten ansehen",
    secondaryHref: "#work",
  },
  tr: {
    badge: "48+ startup ve kurucu wfc.design'ı seçti",
    titleLine1: "Vizyonunuzu",
    titleLine2: "dönüşüm getiren web sitesine çeviriyoruz",
    text: "Etkileyici görünen ve sonuç getiren web siteleri tasarlıyor, çevrimiçi varlığınızı iş hedeflerinize ulaştıracak seviyeye taşıyoruz.",
    primaryCta: "Proje teklifi al",
    primaryHref: "/tr/iletisim",
    secondaryCta: "Çalışmalarımızı gör",
    secondaryHref: "#work",
  },
};