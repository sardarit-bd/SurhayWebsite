import type { Lang } from "../../i18n/ui";
import type { ProjectCardVerticalProps } from "./ProjectCardVertical";

/**
 * Portfolio-Daten der Startseite.
 *
 * ABSICHTLICH LEER: Es gibt derzeit keine veröffentlichten Kundenprojekte.
 * Solange die Liste leer ist, zeigt Work.tsx einen neutralen Zwischenstand.
 *
 * Eigene Projekte später hier eintragen — je Projekt ein Objekt vom Typ
 * ProjectCardVerticalProps (title, description, imageSrc, ctaHref, ...).
 * Kennzahlen (statValue/statLabel) nur setzen, wenn sie belegt sind.
 */
export function getWorkProjects(lang: Lang): ProjectCardVerticalProps[] {
  void lang;
  return [];
}