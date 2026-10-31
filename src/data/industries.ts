import type { Lang } from '../i18n/ui';
export interface IndustrySlide {
  tab: string;
  tag: string;
  title: string;
  description: string;
  features: [string, string, string];
  badge?: { label: string; sub: string; stat: string; statLabel: string };
}
export interface IndustryContent {
  eyebrow: string;
  title: string;
  sub: string;
  cta: string;
  tabsLabel: string;
  prev: string;
  next: string;
  goTo: string;
  slides: IndustrySlide[];
}
export const industryImages = [
  '/images/hero/image1.avif',
  '/images/hero/image2.avif',
  '/images/hero/image3.avif',
  '/images/hero/image4.avif',
  '/images/hero/image5.avif',
  '/images/hero/image6.avif',
  '/images/hero/image7.jpg',
];

export const industries: Record<Lang, IndustryContent> = {
  de: {
    eyebrow: 'BRANCHEN-SPEZIALISIERUNG',
    title: 'Websites für Ihre Branche.',
    sub: 'Wir entwickeln maßgeschneiderte Websites, die zu Ihrem Unternehmen, Ihrer Zielgruppe und Ihrer Branche passen.',
    cta: 'Projekt für diese Branche anfragen',
    tabsLabel: 'Branchen',
    prev: 'Vorherige Branche',
    next: 'Nächste Branche',
    goTo: 'Zu {name}',
    slides: [
      {
        tab: 'Handwerk',
        tag: 'Handwerker & Bauunternehmen',
        title: 'Handwerker & Bauunternehmen',
        description:
          'Maßgeschneiderte Auftritte für Handwerksmeister, Bauunternehmen und Fachbetriebe. Direkte Kundenanfragen mit allen Projektdetails, ohne endlose Rückfragen.',
        features: [
          'Projektkatalog & Vorher-Nachher-Vergleiche',
          'Strukturierte Vorqualifizierung von Angeboten',
          'Mitarbeiter- und Azubi-Recruiting im lokalen Einzugsgebiet',
        ],
        badge: {
          label: 'Handwerksportal · Angebotskonfigurator & Projekt-Upload',
          sub: 'Optimiert für maximale Conversion und lokale Sichtbarkeit',
          stat: '+140%',
          statLabel: 'Qualifizierte Anfragen',
        },
      },
      {
        tab: 'Medizin',
        tag: 'Arztpraxen',
        title: 'Arztpraxen & Kliniken',
        description:
          'Digitale Praxisvisitenkarte mit strukturierter Online-Terminvergabe, Patientenaufklärung und einem vertrauensbildenden Praxiskonzept.',
        features: [
          'Nahtlose Anbindung an Doctolib & Praxisverwaltungssysteme',
          'Patienten-Onboarding vor dem ersten Besuch',
          'Barrierefreiheit nach BFSG- & WCAG-Standards',
        ],
      },
      {
        tab: 'Recht',
        tag: 'Recht',
        title: 'Rechtsanwälte & Steuerberater',
        description:
          'Souveräne, DSGVO-konforme Kanzlei-Websites, die Kompetenz und Diskretion vermitteln und qualifizierte Mandatsanfragen erzeugen.',
        features: [
          'Repräsentative Rechtsgebiete & Mandantenportal',
          'Sichere Strukturierung der Erstkontakte',
          'Redaktionelle Kanzleiprofile & Fachartikel',
        ],
      },
      {
        tab: 'Immobilien',
        tag: 'Immobilien',
        title: 'Immobilienmakler',
        description:
          'Exklusive Immobilienpräsentationen mit optimierten Vermarktungswerkzeugen, Exposé-Downloads und qualifizierter Interessentenfilterung.',
        features: [
          'Hochauflösende Exposé-Architektur mit OpenImmo-Schnittstelle',
          'Immobilienbewertungsrechner für Eigentümer',
          'Automatische Vorprüfung potenzieller Kunden',
        ],
      },
      {
        tab: 'Kraftfahrzeuge',
        tag: 'Automotive',
        title: 'Kraftfahrzeuge & Automotive',
        description:
          'Moderne Websites für Autohäuser, Werkstätten und Tuner. Schnelle Werkstatt-Terminbuchung und Anbindung eines professionellen Fahrzeugmarkts.',
        features: [
          'Live-Fahrzeugbestand mit Filteroptionen',
          'Digitaler Werkstatt-Serviceplaner',
          'Leasing- und Finanzierungsrechner',
        ],
      },
      {
        tab: 'Unternehmen',
        tag: 'Unternehmen',
        title: 'Kleine & große Unternehmen',
        description:
          'Skalierbare Unternehmensauftritte für den Mittelstand und Hidden Champions mit starkem Fokus auf Arbeitgebermarke und Lead-Generierung.',
        features: [
          'B2B-Lead-Funnel & Whitepaper-Infrastruktur',
          'Karriereportal mit 1-Klick-Bewerbung',
          'Internationalisierung (DE / EN / FR)',
        ],
      },
      {
        tab: 'Individuell',
        tag: 'Individuell',
        title: 'Individuelle Lösungen',
        description:
          'Besondere Anforderungen, Webanwendungen, individuelle Buchungssysteme und API-Schnittstellen — maßgeschneidert ohne Baukasten-Grenzen.',
        features: [
          'Headless CMS & individuelles Backend',
          'Schnittstellen zu ERP, CRM & Datenbanken',
          'Top-Performance mit 100/100 Google-Lighthouse-Score',
        ],
      },
    ],
  },

  tr: {
    eyebrow: 'SEKTÖR UZMANLIĞI',
    title: 'Sektörünüze özel web siteleri.',
    sub: 'Şirketinize, hedef kitlenize ve sektörünüze uyan, ölçüye göre web siteleri geliştiriyoruz.',
    cta: 'Bu sektör için proje talep edin',
    tabsLabel: 'Sektörler',
    prev: 'Önceki sektör',
    next: 'Sonraki sektör',
    goTo: '{name} sektörüne git',
    slides: [
      {
        tab: 'Zanaat',
        tag: 'Zanaatkârlar & İnşaat',
        title: 'Zanaatkârlar & İnşaat Şirketleri',
        description:
          'Usta zanaatkârlar, inşaat firmaları ve uzman işletmeler için özel sunumlar. Tüm proje ayrıntılarıyla doğrudan müşteri talepleri, bitmeyen sorular olmadan.',
        features: [
          'Proje kataloğu & önce/sonra karşılaştırmaları',
          'Tekliflerin yapılandırılmış ön elemesi',
          'Yerel çevrede çalışan ve çırak bulma',
        ],
        badge: {
          label: 'Zanaat portalı · Teklif yapılandırıcı & proje yükleme',
          sub: 'Azami dönüşüm ve yerel görünürlük için optimize edildi',
          stat: '+140%',
          statLabel: 'Nitelikli talep',
        },
      },
      {
        tab: 'Sağlık',
        tag: 'Muayenehaneler',
        title: 'Muayenehaneler & Klinikler',
        description:
          'Yapılandırılmış çevrimiçi randevu planlaması, hasta bilgilendirmesi ve güven veren bir muayenehane konseptiyle dijital muayenehane kartviziti.',
        features: [
          'Doctolib ve muayenehane yönetim sistemleriyle kesintisiz entegrasyon',
          'İlk ziyaretten önce hasta kaydı',
          'BFSG ve WCAG standartlarına uygun erişilebilirlik',
        ],
      },
      {
        tab: 'Hukuk',
        tag: 'Hukuk',
        title: 'Avukatlar & Mali Müşavirler',
        description:
          'Uzmanlığı ve ketumluğu yansıtan, GDPR uyumlu, özgüvenli hukuk bürosu siteleri; nitelikli müvekkil talepleri üretir.',
        features: [
          'Temsili hukuk alanları & müvekkil portalı',
          'İlk iletişimin güvenli yapılandırılması',
          'Editoryal büro profilleri & uzman makaleleri',
        ],
      },
      {
        tab: 'Emlak',
        tag: 'Emlak',
        title: 'Emlak Danışmanları',
        description:
          'Optimize pazarlama araçları, ekspoze indirmeleri ve nitelikli aday filtrelemesiyle seçkin gayrimenkul sunumları.',
        features: [
          'OpenImmo arayüzlü yüksek çözünürlüklü ekspoze mimarisi',
          'Mal sahipleri için gayrimenkul değerleme hesaplayıcısı',
          'Potansiyel müşterilerin otomatik ön elemesi',
        ],
      },
      {
        tab: 'Motorlu taşıtlar',
        tag: 'Otomotiv',
        title: 'Motorlu Taşıtlar & Otomotiv',
        description:
          'Galeriler, servisler ve modifiye atölyeleri için modern web siteleri. Hızlı servis randevusu ve profesyonel araç pazarı entegrasyonu.',
        features: [
          'Filtre seçenekli canlı araç envanteri',
          'Dijital servis planlayıcı',
          'Leasing ve finansman hesaplayıcısı',
        ],
      },
      {
        tab: 'Şirketler',
        tag: 'Şirketler',
        title: 'Küçük ve Büyük Şirketler',
        description:
          'Güçlü işveren markası ve potansiyel müşteri kazanımı odağıyla orta ölçekli şirketler ve gizli şampiyonlar için ölçeklenebilir kurumsal siteler.',
        features: [
          'B2B potansiyel müşteri hunisi & teknik doküman altyapısı',
          'Tek tıkla başvurulu kariyer portalı',
          'Çok dillilik (DE / EN / FR)',
        ],
      },
      {
        tab: 'Bireysel',
        tag: 'Özel',
        title: 'Bireysel Çözümler',
        description:
          'Özel gereksinimler, web uygulamaları, bireysel rezervasyon sistemleri ve API arayüzleri — hazır kurgu sınırları olmadan ölçüye göre.',
        features: [
          'Headless CMS & özel arka yüz',
          'ERP, CRM ve veritabanı arayüzleri',
          '100/100 Google Lighthouse skoruyla üst düzey performans',
        ],
      },
    ],
  },

  en: {
    eyebrow: 'INDUSTRY SPECIALIZATION',
    title: 'Websites for your industry.',
    sub: 'We develop custom websites that fit your company, your target audience, and your industry.',
    cta: 'Request a project for this industry',
    tabsLabel: 'Industries',
    prev: 'Previous industry',
    next: 'Next industry',
    goTo: 'Go to {name}',
    slides: [
      {
        tab: 'Handyman',
        tag: 'Craftsmen & Construction Companies',
        title: 'Craftsmen & Construction Companies',
        description:
          'Tailor-made presentations for master craftsmen, building contractors, and skilled tradespeople. Direct customer inquiries with all project details, without endless follow-up questions.',
        features: [
          'Project catalog & before/after comparisons',
          'Structured offer pre-qualification',
          'Recruiting employees and trainees in the local catchment area',
        ],
        badge: {
          label: 'Crafts Portal · Offer Configurator & Project Upload',
          sub: 'Optimized for maximum conversion and local visibility',
          stat: '+140%',
          statLabel: 'Qualified inquiries',
        },
      },
      {
        tab: 'Medicine',
        tag: 'Medical Practices',
        title: 'Medical Practices & Clinics',
        description:
          'Digital practice business card with structured online appointment scheduling, patient education and a trust-building practice concept.',
        features: [
          'Seamless integration with Doctolib & practice management systems',
          'Patient onboarding before the first visit',
          'Accessibility according to BFSG & WCAG standards',
        ],
      },
      {
        tab: 'Lawyers',
        tag: 'Law',
        title: 'Lawyers & Tax Advisors',
        description:
          'Sovereign, GDPR-compliant law firm websites that convey expertise and discretion and generate qualified client inquiries.',
        features: [
          'Representative legal areas & client portal',
          'Secure initial contact structuring',
          'Editorial law firm profiles & expert articles',
        ],
      },
      {
        tab: 'Real estate agent',
        tag: 'Real Estate',
        title: 'Real Estate Agents',
        description:
          'Exclusive property presentations with optimized marketing tools, exposé downloads and qualified prospect filtering.',
        features: [
          'High-resolution exposé architecture with OpenImmo interface',
          'Property valuation calculator for owners',
          'Automatic pre-screening of potential customers',
        ],
      },
      {
        tab: 'Motor vehicles',
        tag: 'Automotive',
        title: 'Motor Vehicles & Automotive',
        description:
          'Modern websites for car dealerships, workshops, and customizers. Fast workshop appointment booking and integration of a professional vehicle marketplace.',
        features: [
          'Live vehicle inventory with filter options',
          'Digital workshop service planner',
          'Leasing and financing calculator',
        ],
      },
      {
        tab: 'Small',
        tag: 'Small Business',
        title: 'Small & Large Companies',
        description:
          'Scalable corporate websites for medium-sized companies and hidden champions with a strong employer branding and lead generation focus.',
        features: [
          'B2B lead funnel & white paper infrastructure',
          'Career portal with 1-click application',
          'Internationalization (DE / EN / FR)',
        ],
      },
      {
        tab: 'Individual solutions',
        tag: 'Custom',
        title: 'Individual Solutions',
        description:
          'Special requirements, web applications, individual booking systems and API interfaces — tailor-made without modular limitations.',
        features: [
          'Headless CMS & custom backend',
          'Interfaces to ERP, CRM & databases',
          'Top performance with a 100/100 Google Lighthouse score',
        ],
      },
    ],
  },
};