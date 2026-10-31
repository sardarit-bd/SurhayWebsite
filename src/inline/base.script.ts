
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const reveal = (el: HTMLElement, delayMs = 0) => {
        if (delayMs > 0) el.style.setProperty('--reveal-delay', `${delayMs}ms`);
        el.classList.add('is-visible');
        if (reduceMotion) {
          el.classList.add('reveal-done');
          return;
        }
        const done = () => el.classList.add('reveal-done');
        el.addEventListener('transitionend', done, { once: true });
        setTimeout(done, delayMs + 1200);
      };
      const marker = document.querySelector<HTMLElement>('.marker');

      if (marker) {
        if (reduceMotion) {
          marker.classList.add('is-visible');
        } else {
          const fontsReady = document.fonts
            ? Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))])
            : Promise.resolve();
          fontsReady.then(() =>
            requestAnimationFrame(() => requestAnimationFrame(() => marker.classList.add('is-visible')))
          );
        }
      }
      const revealEls = [...document.querySelectorAll<HTMLElement>('[data-reveal]')];
      if (reduceMotion) {
        revealEls.forEach((el) => reveal(el));
      } else {
        const pending = new Set(revealEls);

        const show = (el: HTMLElement) => {
          if (!pending.has(el)) return;
          pending.delete(el);
          io.unobserve(el);
          reveal(el, parseInt(el.dataset.revealDelay || '0'));
          el.querySelectorAll<HTMLElement>('[data-count]').forEach(runCounter);
          if (el.hasAttribute('data-count')) runCounter(el);
        };

        const io = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) if (entry.isIntersecting) show(entry.target as HTMLElement);
          },
          { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
        );
        revealEls.forEach((el) => io.observe(el));
        let sweepQueued = false;
        const sweep = () => {
          sweepQueued = false;
          const limit = window.innerHeight * 0.9;
          for (const el of [...pending]) {
            if (el.getBoundingClientRect().top < limit) show(el);
          }
          if (pending.size === 0) {
            window.removeEventListener('scroll', queueSweep);
            window.removeEventListener('resize', queueSweep);
          }
        };
        function queueSweep() {
          if (sweepQueued) return;
          sweepQueued = true;
          requestAnimationFrame(sweep);
        }
        window.addEventListener('scroll', queueSweep, { passive: true });
        window.addEventListener('resize', queueSweep, { passive: true });
        queueSweep();
      }
      function runCounter(el: HTMLElement) {
        if (el.dataset.counted) return;
        el.dataset.counted = '1';
        const target = parseFloat(el.dataset.count || '0');
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        const format = (v: number) => prefix + v.toLocaleString(document.documentElement.lang || 'de') + suffix;
        if (reduceMotion) {
          el.textContent = format(target);
          return;
        }
        const duration = 1200;
        const start = performance.now();
        const step = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3); 
          el.textContent = format(Math.round(target * eased));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
      const fillEls = [...document.querySelectorAll<HTMLElement>('.fx-fill')];

      if (fillEls.length) {
        const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        const radial = finePointer && !reduceMotion;
        if (radial) document.documentElement.classList.add('fx-radial');

        for (const el of fillEls) {
          const clip = document.createElement('span');
          clip.className = 'fx-clip';
          clip.setAttribute('aria-hidden', 'true');
          clip.setAttribute('inert', '');

          const circle = document.createElement('span');
          circle.className = 'fx-circle';
          const clone = document.createElement('div');
          clone.className = `${el.className.replace(/\bfx-fill\b/, '')} fx-clone`;
          for (const attr of Array.from(el.attributes)) {
            if (attr.name.startsWith('data-astro-cid')) clone.setAttribute(attr.name, attr.value);
          }
          clone.innerHTML = el.innerHTML;
          clone.querySelectorAll<HTMLElement>('[style]').forEach((n) => n.style.removeProperty('border-color'));
          clone.querySelectorAll('[data-reveal]').forEach((n) => n.removeAttribute('data-reveal'));

          circle.append(clone);
          clip.append(circle);
          el.prepend(clip);
          const place = (e?: MouseEvent) => {
            const er = el.getBoundingClientRect();
            el.style.setProperty(
              '--fx-room',
              `${Math.max(0, Math.min(er.left, document.documentElement.clientWidth - er.right))}px`
            );
            const cr = clip.getBoundingClientRect();
            const dx = er.left - cr.left;
            const dy = er.top - cr.top;
            clone.style.width = `${er.width}px`;
            clone.style.height = `${er.height}px`;

            if (!e) {
              clone.style.left = `${dx}px`;
              clone.style.top = `${dy}px`;
              return;
            }
            const x = e.clientX - cr.left;
            const y = e.clientY - cr.top;
            const r = Math.hypot(Math.max(x, cr.width - x), Math.max(y, cr.height - y)) + 2;
            circle.style.left = `${x - r}px`;
            circle.style.top = `${y - r}px`;
            circle.style.width = `${2 * r}px`;
            circle.style.height = `${2 * r}px`;
            clone.style.left = `${dx - x + r}px`;
            clone.style.top = `${dy - y + r}px`;
            clone.style.transformOrigin = `${x - dx}px ${y - dy}px`;
          };

          const on = (e?: MouseEvent) => {
            place(radial ? e : undefined);
            el.classList.add('is-fx-on');
            clone.classList.add('is-fx-on');
          };
          const off = () => {
            el.classList.remove('is-fx-on');
            clone.classList.remove('is-fx-on');
          };

          if (finePointer) {
            el.addEventListener('mouseenter', on);
            el.addEventListener('mouseleave', off);
          } else {
            el.addEventListener('pointerdown', () => on());
            el.addEventListener('pointerup', off);
            el.addEventListener('pointercancel', off);
            el.addEventListener('pointerleave', off);
          }
        }
      }
      const stepEls = [...document.querySelectorAll<HTMLElement>('[data-step-mark]')];

      if (stepEls.length && !reduceMotion) {
        const midObserver = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) entry.target.classList.toggle('is-mid', entry.isIntersecting);
          },
          { rootMargin: '-50% 0px -50% 0px' }
        );
        stepEls.forEach((el) => midObserver.observe(el));
      }
