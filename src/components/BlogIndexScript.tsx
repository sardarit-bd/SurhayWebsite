'use client';

import { useEffect } from 'react';
import { inlineScripts } from '../inline/generated';

export default function BlogIndexScript() {
  useEffect(() => {
    const grid = document.getElementById('post-grid');
    if (!grid || grid.dataset.blogReady === 'true') return;
    grid.dataset.blogReady = 'true';

    const script = document.createElement('script');
    script.type = 'module';
    script.text = inlineScripts['blog-index'];
    document.body.appendChild(script);
  }, []);

  return null;
}