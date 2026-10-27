'use client';

import { useEffect } from 'react';
import { inlineScripts } from '../inline/generated';

export default function ConfiguratorScript() {
  useEffect(() => {
    const form = document.getElementById('config-form');
    if (!form || form.dataset.cfgReady === 'true') return;
    form.dataset.cfgReady = 'true';

    const script = document.createElement('script');
    script.type = 'module';
    script.text = inlineScripts.configurator;
    document.body.appendChild(script);
  }, []);

  return null;
}