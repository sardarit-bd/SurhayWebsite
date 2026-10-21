
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { transform } from 'esbuild';

const wurzel = join(dirname(fileURLToPath(import.meta.url)), '..');
const quelle = join(wurzel, 'src/inline');

const dateien = (await readdir(quelle)).filter((f) => f.endsWith('.script.ts')).sort();

const teile = [];
for (const datei of dateien) {
  const name = datei.replace(/\.script\.ts$/, '');
  const code = await readFile(join(quelle, datei), 'utf8');
  const { code: js, warnings } = await transform(code, {
    loader: 'ts',
    minify: true,
    legalComments: 'none',
    target: 'es2022',
    format: 'esm',
  });
  for (const w of warnings) console.warn(`[inline:${name}] ${w.text}`);
  teile.push([name, js.trim()]);
}

const kopf = `/* AUTOMATISCH ERZEUGT von scripts/build-inline.mjs — nicht von Hand aendern.
   Quelle: src/inline/*.script.ts (die woertlich uebernommenen <script>-Bloecke
   der Astro-Fassung). Neu erzeugen mit: node scripts/build-inline.mjs */

`;
const koerper =
  'export const inlineScripts = {\n' +
  teile.map(([n, js]) => `  ${JSON.stringify(n)}: ${JSON.stringify(js)},`).join('\n') +
  '\n} as const;\n\nexport type InlineScriptName = keyof typeof inlineScripts;\n';

await writeFile(join(quelle, 'generated.ts'), kopf + koerper);

console.log(`${teile.length} Inline-Skripte erzeugt:`);
for (const [n, js] of teile) console.log(`  ${n.padEnd(20)} ${String(js.length).padStart(6)} Zeichen`);
