import { readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { join } from "node:path";

const OUT = "out";

async function weg(pfad, was) {
  try {
    await rm(pfad, { recursive: true, force: true });
    entfernt.push(was);
  } catch {
    /* nicht vorhanden — dann ist nichts zu tun */
  }
}

const entfernt = [];

/** Alle RSC-Nutzlasten rekursiv entfernen. */
async function nutzlasten(ordner) {
  let n = 0;
  for (const e of await readdir(ordner, { withFileTypes: true })) {
    const p = join(ordner, e.name);
    if (e.isDirectory()) {
      if (e.name === "_next") continue;
      n += await nutzlasten(p);
    } else if (e.name.startsWith("__next.") && e.name.endsWith(".txt")) {
      await rm(p);
      n++;
    } else if (e.name === "index.txt") {
      await rm(p);
      n++;
    }
  }
  return n;
}

try {
  await stat(OUT);
} catch {
  console.error("postbuild: out/ fehlt — erst bauen.");
  process.exit(1);
}

const anzahl = await nutzlasten(OUT);
if (anzahl) entfernt.push(`${anzahl} RSC-Nutzlasten (*.txt)`);
await weg(join(OUT, "_not-found"), "out/_not-found/");
/* Nexts eigene Standard-404 als Verzeichnis — eine zweite, erreichbare URL,
   die Astro nicht hatte. out/404.html bleibt (siehe unten). */
await weg(join(OUT, "404"), "out/404/");

/* Die echte 404-Seite an ihren Platz — sie ueberschreibt die Standardseite,
   die Next unter out/404.html ablegt. */
const echte = join(OUT, "seite-nicht-gefunden", "index.html");
try {
  const html = await readFile(echte, "utf8");
  await writeFile(join(OUT, "404.html"), html);
  await rm(join(OUT, "seite-nicht-gefunden"), { recursive: true, force: true });
  entfernt.push("404: seite-nicht-gefunden/index.html -> 404.html");
} catch (e) {
  console.error("postbuild: 404-Seite nicht gefunden — " + e.message);
  process.exit(1);
}

/* ---------------------------------------------------------------------------
   Client-Laufzeit aus dem HTML nehmen

   Nur Eingriffe, die React nicht sieht. Das HTML im Rumpf muss exakt dem
   Baum entsprechen, den die RSC-Nutzlast beschreibt — sonst schlaegt die
   Hydration fehl, React rendert die Wurzel neu und setzt dabei <html> auf
   className="no-js" zurueck. Deshalb bleiben JSON-LD-Skripte und der
   <div hidden>-Platzhalter an ihrem Platz.
--------------------------------------------------------------------------- */
const MUSTER = [[/<link[^>]*\srel="preconnect"[^>]*>/g, "preconnect"]];

async function htmlDateien(ordner) {
  const raus = [];
  for (const e of await readdir(ordner, { withFileTypes: true })) {
    const p = join(ordner, e.name);
    if (e.isDirectory()) raus.push(...(await htmlDateien(p)));
    else if (e.name.endsWith(".html")) raus.push(p);
  }
  return raus;
}

const dateien = await htmlDateien(OUT);
const treffer = Object.create(null);
for (const datei of dateien) {
  let html = await readFile(datei, "utf8");
  const vorher = html;
  for (const [muster, name] of MUSTER) {
    const n = (html.match(muster) ?? []).length;
    if (n) treffer[name] = (treffer[name] ?? 0) + n;
    html = html.replace(muster, "");
  }
  if (html !== vorher) await writeFile(datei, html);
}
for (const [name, n] of Object.entries(treffer)) entfernt.push(`${n}x ${name}`);

console.log(
  "postbuild: " + (entfernt.length ? entfernt.join(", ") : "nichts zu tun"),
);