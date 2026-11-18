const input = document.getElementById('faq-search') as HTMLInputElement | null;
  const groups = Array.from(document.querySelectorAll<HTMLElement>('.faq-group'));
  const empty = document.getElementById('faq-empty');
  const count = document.getElementById('faq-count');
  const jumps = Array.from(document.querySelectorAll<HTMLElement>('[data-jump]'));

  /* Suchregeln: Gross-/Kleinschreibung, Akzente und tuerkisches i/ı/İ werden
     ignoriert; jedes eingegebene Wort muss in Frage oder Antwort vorkommen. */
  const fold = (s: string) =>
    s
      .toLocaleLowerCase(document.documentElement.lang || 'de')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/ı/g, 'i')
      .replace(/ß/g, 'ss');

  if (input && groups.length) {
    const items = groups.flatMap((group) =>
      Array.from(group.querySelectorAll<HTMLElement>('.faq-item')).map((el) => ({
        el,
        group,
        text: fold(el.textContent ?? ''),
      }))
    );
    const label = count?.textContent?.trim().split(/\s+/).slice(1).join(' ') ?? '';

    type Accordion = HTMLElement & { setOpen?: (item: HTMLElement, open: boolean, animate?: boolean) => void };
    const setOpen = (el: HTMLElement, open: boolean) =>
      document.querySelector<Accordion>('faq-accordion')?.setOpen?.(el, open, false);

    const apply = () => {
      const query = input.value.trim();
      const terms = fold(query).split(/\s+/).filter(Boolean);
      let visible = 0;

      items.forEach(({ el, text }) => {
        const match = terms.length === 0 || terms.every((term) => text.includes(term));
        el.classList.toggle('is-filtered-out', !match);
        setOpen(el, match && query.length > 1);
        if (match) visible++;
      });

      let first = true;
      groups.forEach((group) => {
        const hasHit = items.some(({ el, group: g }) => g === group && !el.classList.contains('is-filtered-out'));
        if (hasHit) group.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible'));
        group.classList.toggle('is-filtered-out', !hasHit);
        group.classList.toggle('is-first', hasHit && first);
        if (hasHit) first = false;
        const jump = jumps.find((j) => j.dataset.jump === group.dataset.group);
        jump?.classList.toggle('is-filtered-out', !hasHit);
      });

      empty?.classList.toggle('hidden', visible > 0);
      if (count) count.textContent = `${visible} ${label}`;
    };

    /* Enter darf das Formular nicht absenden — sonst ginge die Eingabe verloren. */
    input.closest('form')?.addEventListener('submit', (e) => e.preventDefault());

    input.addEventListener('input', apply);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && input.value !== '') {
        input.value = '';
        apply();
      }
    });
  }