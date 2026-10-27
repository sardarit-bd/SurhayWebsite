'use client';

import { useEffect } from 'react';
import { inlineScripts } from '../inline/generated';

export default function FaqPageScript() {
  useEffect(() => {
    const input = document.getElementById('faq-search') as HTMLInputElement | null;
    if (!input || input.dataset.faqReady === 'true') return;
    input.dataset.faqReady = 'true';

    const script = document.createElement('script');
    script.type = 'module';
    script.text = inlineScripts['faq-page'];
    document.body.appendChild(script);
  }, []);

  return null;
}