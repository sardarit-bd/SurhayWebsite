'use client';

import { useEffect } from 'react';
import { inlineScripts, type InlineScriptName } from '../inline/generated';

/* Laeuft erst nach der Hydration: Skripte, die DOM-Knoten einfuegen oder Texte
   aendern, duerfen React nicht vorher dazwischenfunken (Fehler #418). */
export function InlineScript({ name }: { name: InlineScriptName }) {
  useEffect(() => {
    const flag = `data-inline-${name}`;
    const root = document.documentElement;
    if (root.hasAttribute(flag)) return;
    root.setAttribute(flag, 'true');

    const script = document.createElement('script');
    script.type = 'module';
    script.text = inlineScripts[name];
    document.body.appendChild(script);
  }, [name]);

  return null;
}