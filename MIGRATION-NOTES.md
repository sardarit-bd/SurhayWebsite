# Astro → Next.js: was gemacht wurde, was geprüft wurde, was anders ist

Diese Datei ist der Nachweis der Migration. Sie nennt vollständig, was sich
geändert hat, was nachweislich gleich geblieben ist, und was aufgefallen ist,
aber absichtlich nicht angefasst wurde.

Ausgangspunkt: Astro 5.18.2, 86 `.astro`-Dateien, 120 Markdown-Dateien in vier
Content Collections, drei Sprachen mit übersetzten Slugs, zwei Deploy-Ziele.
Ziel: Next.js 16 (App Router) mit `output: 'export'`, React 19.

---

## 1. Prüfergebnis

Verglichen wurde gegen einen **eingefrorenen Astro-Build** (beide Deploy-Ziele,
vor der ersten Änderung erzeugt). Alle Zahlen wurden über die Vergleichs-Skripte
in `scripts/` erzeugt; diese Einmalskripte sind nach Abschluss der Migration
entfernt worden (siehe Abschnitt 6).

| Prüfung | Ergebnis |
|---|---|
| Routenliste (`.html`-Dateien) | **70/70 identisch**, beide Ziele |
| Nicht-HTML-Artefakte (Bilder, Flaggen, robots.txt, contact.php, .htaccess) | **identisch** |
| `sitemap-index.xml` und `sitemap-0.xml` | **byte-identisch**, beide Ziele |
| Textinhalt jeder Seite (ohne Whitespace) | **70/70 identisch** |
| Elementfolge im `<body>` | **70/70 identisch** |
| Jedes Attribut jedes Elements im `<body>` | **67/70** — die drei Abweichungen sind ausschließlich `onsubmit`, siehe 3.1 |
| JSON-LD (Inhalt und Anzahl je Seite) | **70/70 identisch** |
| SEO- und Sicherheits-Tags im `<head>` (title, description, canonical, robots, hreflang ×4, og:*, twitter:*, CSP, referrer, theme-color, icons) | **70/70 identisch** |
| Markdown-Rendering aller 18 Blogbeiträge | **byte-identisch** |
| Gescopete CSS-Selektoren | **272 von 272** reproduziert, 0 fehlend |
| CSS-Deklarationen in den 26 Bauteil-Stylesheets | **0 Abweichungen** |
| Ausgelieferte `.js`-Dateien | **0** — genau wie Astro |
| **Sichtbarer Text im Browser** (`innerText`, 1280 px und 390 px) | **140/140 identisch** |
| **Berechnete Stile im Browser** (53 Eigenschaften, jedes Element, beide Breiten) | **0 Differenzen über 0,2 px** (412 Subpixel-Rundungen unter 1/64 px) |
| Interaktion (Mobilmenü, Sprachumschalter, FAQ-Akkordeon, Projektfilter, Formularprüfung, Konfigurator, FAQ-Suche) | **7/7 identisch** |

Werkzeuge (Einmalskripte, nach Abschluss der Migration entfernt, siehe
Abschnitt 6): `scripts/compare-dom.py` (Routen, DOM, Attribute, JSON-LD,
`<head>`) und `scripts/compare-text-nodes.py` (Textknoten); für den
Browser-Teil Playwright gegen das installierte Chrome —
die drei Skripte dafür lagen außerhalb des Repos, damit keine Abhängigkeit
dazukommt.

---

## 2. Wie migriert wurde

**Die Interaktivität ist nicht neu geschrieben.** Die zwölf `<script>`-Blöcke
der Astro-Fassung lagen wörtlich in `src/inline/*.script.ts`; sieben davon sind
in Gebrauch und werden von `scripts/build-inline.mjs` mit esbuild zu JavaScript
übersetzt und minifiziert
— dasselbe Werkzeug, das Astro über Vite benutzte. Vier der sieben Blöcke der
Startseite sind sogar zeichengleich mit der Astro-Ausgabe; die Unterschiede in
den anderen sind Variablennamen und ein gefaltetes `420 + 40 → 460`, beides
Sache des Minifizierers.

**Die Daten sind unverändert.** `src/data/*.ts`, `src/i18n/ui.ts`,
`src/i18n/routes.ts` und `src/config.ts` sind Zeile für Zeile dieselben.
`src/i18n/utils.ts` hat zwei geänderte Zeilen: Astros Base-Pfad-Variable gibt
es in Next nicht, derselbe Wert kommt jetzt aus `src/base.ts`.

**Die 120 Markdown-Dateien sind unangetastet**, samt Ordnerstruktur — sonst
bräche Decap CMS (`cms/config.yml` zeigt auf `src/content/<collection>/<lang>/`).

**Die Zod-Schemas sind unverändert** (`src/content.config.ts`); weggefallen
sind nur die Astro-Hüllen `defineCollection()` und `glob()`. Geprüft wird
weiterhin zur Bauzeit, ein Schemaverstoß bricht den Build.

**Das CSS ist mechanisch umgeschrieben, nicht neu geschrieben.**
`scripts/gen-scoped-css.mjs` (Einmalskript, nach der Migration entfernt) hat die
26 `<style>`-Blöcke zu Dateien unter `src/styles/components/` gemacht und dabei
genau die Umschreibung vorgenommen, die Astro mit `data-astro-cid-*` vornahm.
Gegenprobe gegen Astros kompiliertes CSS: 272 von 272 Selektoren, 0 fehlend.
Zwölf dieser Stylesheets sind später entfallen, weil ihre `data-c-*`-Kennung in
keiner gerenderten Seite mehr vorkam — siehe Abschnitt 6.

**Der Kommentar-Bestand ist übernommen.** Die Begründungen im Code (WCAG-Bezüge,
Kontrastmessungen, rechtliche Hinweise) stehen weiter da, wo sie standen; wo
eine Astro-Eigenheit weggefallen ist, erklärt der Kommentar die neue Umsetzung.

---

## 3. Was sich geändert hat und nicht anders ging

### 3.1 `onsubmit="return false;"` am FAQ-Suchformular

Die einzige Attribut-Abweichung im ganzen `<body>`, auf drei Seiten (`/faq/`,
`/en/faq/`, `/tr/sss/`).

React verwirft jede Eigenschaft, die mit `on` beginnt und kein bekannter
Handler ist — gemessen mit `renderToStaticMarkup`: `onsubmit` fällt ersatzlos
weg, auch als Spread. Es gibt keinen Weg, es aus JSX auszugeben.

Das Attribut verhindert, dass die Eingabetaste im Suchfeld das Formular
abschickt und die Seite neu lädt. Es wird jetzt von einer eigenen, so
benannten Zeile gesetzt (`src/components/pages/FaqPage.tsx`), bevor eine
Eingabe plausibel ist. **Ohne JavaScript filtert das Feld ohnehin nicht** —
dort ist der Unterschied ein Seitenneuaufbau statt gar keiner Reaktion.

### 3.2 Nexts Client-Laufzeit fliegt aus dem Artefakt

`scripts/postbuild.mjs` entfernt Nexts Skript-Tags, deren Bootstrap und die
`.js`-Dateien. **Das ist keine Sparmaßnahme, sondern die Bedingung dafür, dass
die Seite funktioniert.**

Die Seite hat keine Client-Komponente, keinen Hook, keinen React-Handler — die
Interaktivität steckt vollständig in den übernommenen Inline-Skripten. React
hätte im Browser nichts zu tun, tut aber etwas: es hydriert. Die Inline-Skripte
laufen als deferred Modul-Skripte davor und verändern das DOM (`no-js` → `js`,
Masken und Inhaltskopien für den Flächen-Hover, Zahlen im Zähler, umgeschriebene
hrefs). React findet danach ein anderes DOM, meldet Fehler #418 und baut den
Baum neu auf — alle Skript-Wirkungen sind weg.

Gemessen im ersten Anlauf auf der Startseite:
`document.documentElement.className` war `"no-js"` statt `"js"`,
`document.querySelectorAll('.fx-clip').length` war `0` statt `4`.
Einblend-Animationen, Flächen-Hover und alle `html.js`-Regeln waren tot.

Nebenwirkung: das Artefakt enthält **0 `.js`-Dateien**, genau wie Astros
`dist/`. Der Build gibt die Zahl der entfernten Tags aus und bricht ab, wenn
er keine findet — dann hat sich entweder Nexts Ausgabe geändert oder es gibt
jetzt eine Client-Komponente. Beides muss geprüft werden, bevor deployt wird.

### 3.3 `<head>`: vier Unterschiede, keiner inhaltlich

Alle SEO- und Sicherheits-Tags sind auf allen 70 Seiten identisch. Übrig
bleiben:

- **Das Stylesheet** heißt anders und trägt `data-precedence="next"`. Anderer
  Bundler.
- **`<meta name="generator">`** sagt `Next.js` statt `Astro v5.18.2`. Das Tag
  nennt das Werkzeug; das Werkzeug ist ein anderes.
- **Astros inline `<style>`** fehlt. Astro inlinte kleine Stylesheets, Next
  bündelt sie. Dieselben Regeln, andere Auslieferung.
- **Drei `<link rel="preload" as="image">`** auf die Flaggen-SVGs kommen dazu.
  React erzeugt sie für Bilder mit `loading="eager"`. Reine Hinweise.

**Die Reihenfolge im `<head>` ist nicht vollständig steuerbar.** Next setzt
seine eigenen Tags an den Anfang, auch vor das CSP-`<meta>` — Astro setzte es
bewusst als erstes ("die Richtlinie gilt erst ab ihrer eigenen Zeile"). Nach
dem Entfernen der Client-Laufzeit stehen davor nur noch `charset`, `viewport`
und das Stylesheet, alles gleichnamige eigene Dateien; die Herkunftssperre gilt
für alles danach. Eine Einschränkung bleibt es.

### 3.4 Case-Study-Detailseiten: Route wird erzeugt, nicht geschrieben

Astro erlaubte ein leeres `getStaticPaths()`. Das ist der aktuelle Zustand:
jede Case Study steht auf `real: false`, es gibt keine `/projekte/<slug>/`-Seite
— in der Astro-Referenz auch nicht.

Next bricht bei `output: 'export'` ab, wenn `generateStaticParams()` leer ist.
Die Route einfach zu löschen wäre falsch gewesen: `real` ist ein Schalter, der
umgelegt werden soll, sobald ein Projekt freigegeben ist, und dann müsste er
wirken. `scripts/sync-case-study-routes.mjs` läuft deshalb vor jedem Build,
sieht in den Inhalten nach und legt die Route je Sprache an oder entfernt sie.
**`real: true` setzen genügt weiterhin.** Die erzeugten Dateien sind nicht
versioniert; die Vorlage steht im Skript.

### 3.5 Die 404 ist eine gewöhnliche Route

Astro legte eine Datei ab: `dist/404.html`, mit `<html lang="de" class="no-js">`
und canonical `/404/`. Nexts `not-found.tsx` bringt das nicht zustande —
gemessen: im Wurzelverzeichnis von `app/` greift keins der drei Sprach-Layouts
und Next baut eine `<html>`-Hülle **ohne `lang`**; innerhalb einer Route Group
gilt die Datei nur für Pfade unterhalb dieser Gruppe; unter dem Routennamen
`/404` überschreibt Nexts eigene Ausgabe das Ergebnis.

Also eine normale Seite unter `src/app/(de)/seite-nicht-gefunden/`, die damit
das deutsche Wurzel-Layout bekommt. Der Postbuild verschiebt sie nach
`out/404.html` und entfernt das Verzeichnis. Ergebnis: dieselbe eine Datei,
dieselben Attribute, dieselbe canonical — und weder `/404/` noch
`/seite-nicht-gefunden/` ist eine erreichbare URL.

### 3.6 Drei Dinge, die der Postbuild noch geradezieht

- **`<div hidden><!--$--><!--/$--></div>`** am Anfang des Rumpfs, der
  Platzhalter der Suspense-Grenze. Geprüft über alle 70 Seiten: immer genau
  einer, immer leer.
- **JSON-LD** stand unter Astro im `<head>`. React hebt `<script>` nicht selbst
  dorthin (nur `<title>`, `<meta>`, `<link>`); es wird verschoben.
- **RSC-Nutzlasten** (`__next.*.txt`, `index.txt`) und **`out/_not-found/`** —
  Dateien und eine URL, die Astro nicht hatte. Die Seite navigiert
  ausschließlich mit gewöhnlichen `<a href>`, fragt sie also nie ab.

### 3.7 Der Build typprüft nicht — genau wie vorher

`astro build` hat nie typgeprüft; dafür gab es `astro check`, und
`@astrojs/check` war in diesem Projekt nicht einmal installiert. `next build`
prüft deshalb auch nicht (`typescript.ignoreBuildErrors`). Die Prüfung bleibt
verfügbar: `npm run check`.

### 3.8 412 Subpixel-Rundungen

Der Browser-Vergleich der berechneten Stile findet 412 Differenzen unter
0,2 px — meist 1/64 Pixel in einer Breite. Ursache ist Whitespace an
Blockgrenzen, den Astro aus der Quelle mitlieferte und JSX wegwirft: unsichtbar,
aber die Textmessung rundet minimal anders. Keine davon liegt über 0,2 px.

### 3.9 Struktur, die sich zwangsläufig geändert hat

- **`<html lang>` je Sprache** braucht in Next drei Wurzel-Layouts. Sie liegen
  in Route Groups `(de)`, `(tr)`, `(en)`; die Gruppen ändern keine URL. Alle
  drei rufen `src/layouts/Document.tsx` auf, damit die Hülle an einer Stelle
  definiert bleibt.
- **`Base` ist kein Layout, sondern eine Komponente**, die jede Seite rendert.
  Ein Next-Layout bekommt keine Eigenschaften von der Seite, und `Header`
  braucht `alternates` und `pathname`.
- **Sprache und Pfad kommen als Eigenschaften herein.** Unter Astro holte sich
  jedes Bauteil die Sprache selbst (`getLangFromUrl(Astro.url)`, 31 Mal); in
  einer Server Component gibt es kein Gegenstück dazu. `astroPathname()` in
  `src/lib/props.ts` bildet `Astro.url.pathname` genau nach, inklusive der
  gemessenen Eigenheit, dass die Startseite auf GitHub Pages **keinen**
  Schlussstrich trug.
- **Style-Scoping über einen Walker.** `src/lib/scoped.tsx` hängt die
  Bereichskennung beim Rendern an die eigenen Elemente. Astro markiert nach
  Autorschaft, nicht nach Laufzeit-Verschachtelung — der Walker folgt dem in
  die Element-Eigenschaften von Kindkomponenten hinein und bricht an `<Fremd>`
  ab (durchgereichter Inhalt) sowie an `<script>`/`<style>` (die markiert Astro
  nie).
- **`dist/` heißt `out/`.** Beide Workflows sind angepasst, sonst unverändert.

---

## 4. Aufgefallen, absichtlich nicht geändert

Die Migration sollte nichts verbessern. Diese Punkte sind aufgefallen und
stehen unverändert im Code:

1. **`src/config.ts:154` bricht den Typcheck.** `LEGAL.phoneE164` ist durch
   `as const` der Literaltyp `''`; nach der Prüfung `&& LEGAL.phoneE164`
   verengt TypeScript auf `never`, und `.replace()` darauf ist ein Fehler. Zur
   Laufzeit ist der Zweig unerreichbar. Vorbestehend — `astro build` prüfte
   nicht, und `astro check` war nicht installiert. Fällt weg, sobald
   `LEGAL.phoneE164` gepflegt ist.

2. **`sections/Contact.astro` war toter Code.** Das Bauteil wird von keiner
   Seite gerendert; in der Astro-Referenz kommen seine Elemente
   (`#form-success`, `#form-error`) auf keiner der 70 Seiten vor, und sein CSS
   wurde nie ausgeliefert. Es ist mitmigriert (`sections/Contact.tsx`,
   `styles/components/contact.css`) und bleibt wirkungslos: die beiden Regeln
   finden kein Element.

3. **Astro hat auf der Insights-Sektion ein Leerzeichen verschluckt.** Die
   Quelle schreibt `{t('insights.all')} <span>→</span>`, die Ausgabe hat kein
   Leerzeichen vor dem Pfeil — Astro wendet innerhalb eines Ausdrucksblocks
   (`{posts.length > 0 && (…)}`) JSX-Whitespace-Regeln an. Die
   Leistungs-Sektion daneben steht auf oberster Ebene und hat das Leerzeichen.
   Die Absicht des Autors war offensichtlich ein Leerzeichen an beiden Stellen.
   **Nachgebaut ist der Ist-Zustand**, inklusive des fehlenden Leerzeichens —
   samt Kommentar an der Stelle.

4. **Der Whitespace-Knoten in der Kalender-Schaltfläche.** Astros Ausgabe hat
   dort einen reinen Leerzeichen-Knoten hinter dem `sr-only`-`<span>`. Im
   Flex-Container mit `gap` bildet er ein eigenes Element und macht die
   Schaltfläche 9,6 px breiter. Reproduziert, damit die Breite stimmt.

---

## 5. Wo die Astro-Fassung liegt

Die 86 `.astro`-Dateien, `astro.config.mjs` und die Astro-Abhängigkeiten sind
in einem eigenen Commit entfernt worden, **nachdem** die Prüfungen aus
Abschnitt 1 durchgelaufen waren. Der Commit davor enthält beide Fassungen
nebeneinander — dort steht die Astro-Fassung vollständig, falls etwas
nachzusehen ist.

Die eingefrorenen Referenz-Builds (`.reference-dist-root/`,
`.reference-dist-pages/`) sind nicht versioniert. Neu erzeugen lassen sie sich
aus jenem Commit mit
`SITE_URL=… BASE_PATH=… npx astro build`.

---

## 6. Aufräum-Schnitt nach der Migration (17.11.2026)

Nach Abschluss der Migration wurde die Codebasis auf toten Ballast geprüft und
entfernt. Grundlage waren vier unabhängige Nachweise, nicht Vermutungen:

1. **Importgraph** über alle 177 Quelldateien (`src/**` plus `scripts/*.mjs`),
   inklusive `@/`-Alias und CSS-`@import`: 174 erreichbar, 9 ohne jede Kante.
2. **Gerendertes HTML**: Auf 12 Routen wurde geprüft, welche
   `data-c-*`-Kennungen tatsächlich im `<body>` stehen. Die gescopten
   Stylesheets wirken ausschließlich über diese Kennung.
3. **Byte-Vergleich**: 54 URLs vor und nach dem Schnitt (HTML ohne
   `<script>`/`<style>`/`<link>`, Whitespace normalisiert).
4. **Produktions-Build** (`npm run build`) mit Abgleich der Routenzahl.

### 6.1 Entfernt

| Was | Umfang | Nachweis |
|---|---|---|
| Tote Komponenten/Daten | 10 Dateien: `CtaBand.tsx`, `home/HeroMockup.tsx`, `sections/Contact.tsx`, `sections/Hero.tsx`, `sections/ServicesInteractive.tsx`, `data/branches.ts`, `i18n/hero.ts`, `lib/configurator.ts` (2-Zeilen-Stub), `app/globals.css`, `app/sitemap-index.xml/assets/branchen-icons.ts` | keine Importkante; `globals.css` wurde nirgends importiert, seine Klassen (`hero-aurora`, `hero-grid`, `hero-drift`) kamen weder im Dev-CSS noch im Referenz-CSS vor |
| Nicht injizierte Inline-Skripte | 5 von 12: `header`, `hero`, `language-switcher`, `work`, `contact` | keine Komponente rendert `<InlineScript name="…">` dafür; 7 bleiben (`base`, `blog-index`, `configurator`, `contact-form`, `faq-accordion`, `faq-page`, `work-index-page`) |
| Wirkungslose Stylesheets | 12 von 26 (≈ 49 KB Quelle): `contact-cta`, `footer`, `header`, `hero`, `insights`, `language-switcher`, `process`, `services`, `studio`, `trust-bar`, `work`, `contact` | jede Regel ist an eine `data-c-*`-Kennung gebunden, die auf keiner Route gerendert wird; im gebauten CSS sinken die Top-Level-Selektoren von 398 auf 261 (−137), **0 hinzugefügt, 0 entfernte Selektoren ohne `data-c-`-Bindung** |
| Verwaiste Medien | `public/colors.mp4` (2,3 MB), `public/viserx3d.webm` (0,9 MB), `public/herobg.avif` (8 KB) | null Treffer im gesamten Repo inklusive Markdown-Frontmatter |
| Einmalskripte der Migration | `astro-template-to-jsx.mjs`, `astro-to-tsx.mjs`, `gen-scoped-css.mjs`, `compare-dom.py`, `compare-text-nodes.py` | kein npm-Skript ruft sie auf; die Astro-Quellen und Referenz-Builds, gegen die sie liefen, sind nicht mehr im Repo |
| Ungenutzte npm-Pakete | `@gsap/react`, `@prisma/adapter-mariadb`, `decap-cms` (dev) | keine Importkante im Code; `decap-cms` wird nur als fertiges Bundle `public/admin/decap-cms.js` ausgeliefert. **`gsap` bleibt** — es wird von `Header.tsx`, `sections/Services.tsx` und `sections/Work.tsx` benutzt |
| Toter Code in `FaqItem.tsx` | `variant="card"`-Zweig (47 Zeilen) und der dadurch ungenutzte `lucide-react`-Import | kein Aufrufer setzt `variant`; alle drei Verwendungsstellen nutzen die Standardvariante |

Der npm-Schnitt entfernte 684 Pakete aus `node_modules`.

### 6.2 Ergebnis der Gegenprobe

- **52 von 54 URLs byte-identisch.** Die zwei Abweichungen sind die literalen
  Platzhalter-URLs `/leistungen/[slug]/` und `/tr/blog/[slug]/`, die in beiden
  Läufen mit HTTP 500 antworten (ungültiger `generateStaticParams`-Wert) und
  deren Dev-Fehlerseite sich je nach Aufwärmreihenfolge unterscheidet. Sie sind
  keine echten Routen.
- **`npm run build`: 70 Seiten** — dieselbe Routenzahl wie in Abschnitt 1.
- Gebautes CSS: 181.851 → 145.918 Bytes (−35.933 B, −19,8 %).
- `npm run check`: unverändert **5 vorbestehende Fehler** (siehe Abschnitt 4),
  keine neuen.
- Dev-Server nach dem Schnitt: 0 Hydration-Warnungen, 0 Modulauflösungsfehler,
  0 Serverfehler auf allen geprüften Routen.
- **Sicherung vor dem Schnitt:** `SurhayWebsite-backup-2026-11-17.zip`
  (25,7 MB, 373 Einträge, ohne `node_modules`/`.next`).

### 6.3 Bewusst behalten

- `entwuerfe/homepage-editorial.html` — eigenständiger Design-Entwurf (59 KB),
  von keiner Route referenziert, aber Inhalt und keine Ableitung.
- `AGENTS.md` / `CLAUDE.md` — werden von `next dev` bei jedem Lauf neu erzeugt.
  Löschen ist wirkungslos; abschalten ließe es sich mit `agentRules: false` in
  `next.config.mjs`.
- `src/types/custom-elements.d.ts` — JSX-Deklaration für `<faq-accordion>`,
  ohne Importkante, aber typrelevant.
- `public/contact.php`, `public/.htaccess` — Deploy-Artefakte, die laut
  Abschnitt 1 unverändert bleiben müssen.
