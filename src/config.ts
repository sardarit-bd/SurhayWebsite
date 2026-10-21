import { localeMeta, type Lang } from "./i18n/ui";

/**
 * Zentrale Site-Konfiguration.
 * Platzhalter (Formspree-ID, Kalender-Link, Social-Profile) hier pflegen —
 * sie werden überall auf der Website referenziert.
 */
export const SITE = {
  name: "Surhay Design",
  domain: "https://surhay.design",
  email: "hallo@surhay.design",
  city: "Berlin",
  formEndpoint: "http://localhost:3001/api/inquiries",
  formspreeId: "DEINE_FORM_ID",
  calendarUrl: "https://cal.com/surhay/erstgespraech",
  social: {
    linkedin: "https://www.linkedin.com/company/surhay-design",
    instagram: "https://www.instagram.com/surhay.design",
    github: "https://github.com/surhay",
  },
} as const;

/**
 * ⚠️ RECHTLICHE PFLICHTANGABEN — die einzige Stelle, die gepflegt werden muss.
 *
 * Impressum (§ 5 DDG) und Datenschutzerklärung ziehen ihre Daten ausschließlich
 * von hier — DE und EN gleichzeitig. Alles, was unten noch in eckigen Klammern
 * steht, ist ein Platzhalter und MUSS vor dem Live-Gang ersetzt werden:
 * ein Impressum mit unvollständigen Angaben ist abmahnfähig.
 */
export const LEGAL = {
  /** Vor- und Nachname des Diensteanbieters (Pflicht, § 5 Abs. 1 Nr. 1 DDG). */
  owner: "[Vor- und Nachname eintragen]",
  /** Ladungsfähige Anschrift — kein Postfach (Pflicht). */
  street: "[Straße und Hausnummer]",
  zip: "[PLZ]",
  city: "Berlin",
  /* Laendername je Sprache — die Anschrift selbst bleibt unveraendert. */
  country: "Deutschland",
  countryTr: "Almanya",
  countryEn: "Germany",
  /**
   * Telefonnummer (Pflicht: mind. ein schneller elektronischer Kontaktweg
   * neben der E-Mail).
   *
   * `phone` ist die sichtbare Schreibweise in deutscher Konvention
   * („030 12345678“), `phoneE164` dieselbe Nummer international und ohne
   * Trennzeichen fuer den tel:-Link („+493012345678“). Beide muessen
   * gepflegt sein, sonst zeigt die Kontaktseite gar keine Nummer — siehe
   * `phoneNumber` unten.
   */
  phone: "[Telefonnummer]",
  phoneE164: "",
  /**
   * Umsatzsteuer:
   *   kleinunternehmer: true  → Hinweis nach § 19 UStG, keine USt-IdNr.
   *   kleinunternehmer: false → vatId ausfüllen (§ 27a UStG).
   */
  kleinunternehmer: true,
  vatId: "",
  /** Zuständige Datenschutz-Aufsichtsbehörde (nach Sitz). */
  authority: "Berliner Beauftragte für Datenschutz und Informationsfreiheit",
  authorityUrl: "https://www.datenschutz-berlin.de",
  /** Hoster — erscheint im Datenschutz-Abschnitt „Hosting“. */
  host: "Hostinger International Ltd., 61 Lordou Vironos Street, 6023 Larnaca, Zypern",
  /** Stand der Rechtstexte (ISO-Datum) — bei inhaltlichen Änderungen hochsetzen. */
  updated: "2026-07-26",
} as const;

/** Laendername in der jeweiligen Sprache. */
function country(lang: Lang): string {
  return { de: LEGAL.country, tr: LEGAL.countryTr, en: LEGAL.countryEn }[lang];
}

/** Anschrift als Zeilen-Array — für <br />-getrennte Ausgabe in allen Sprachen. */
export function legalAddress(lang: Lang): string[] {
  return [
    SITE.name,
    LEGAL.owner,
    LEGAL.street,
    `${LEGAL.zip} ${LEGAL.city}`,
    country(lang),
  ];
}

/** Einzeilige Anschrift, z. B. für den Verantwortlichen im Datenschutztext. */
export function legalAddressInline(lang: Lang): string {
  return `${SITE.name}, ${LEGAL.owner}, ${LEGAL.street}, ${LEGAL.zip} ${LEGAL.city}, ${country(lang)}`;
}

/** Stand-Datum lokalisiert, z. B. „26. Juli 2026“. */
export function legalUpdated(lang: Lang): string {
  return new Intl.DateTimeFormat(localeMeta[lang].intl, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${LEGAL.updated}T00:00:00Z`));
}

export const formspreeAction: string | null =
  SITE.formspreeId !== "DEINE_FORM_ID"
    ? `https://formspree.io/f/${SITE.formspreeId}`
    : null;

const customEndpoint: string = SITE.formEndpoint;
export const formAction: string | null = customEndpoint
  ? customEndpoint
  : formspreeAction;

/** false, solange das Anfrageformular kein Ziel hat. */
export const formEnabled: boolean = formAction !== null;

/** Name des Inhabers — null, solange der Platzhalter aus LEGAL.owner steht. */
export const ownerName: string | null = LEGAL.owner.startsWith("[")
  ? null
  : LEGAL.owner;

export const phoneNumber: { display: string; href: string } | null =
  !LEGAL.phone.startsWith("[") && LEGAL.phoneE164
    ? {
        display: LEGAL.phone,
        href: `tel:${LEGAL.phoneE164.replace(/[^\d+]/g, "")}`,
      }
    : null;

export const configuratorAction: string =
  "https://admin.surhay.design/api/configurator";
