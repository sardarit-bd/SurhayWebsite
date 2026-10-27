const form = document.getElementById("cf-form") as HTMLFormElement | null;

if (form) {
  const failBox = document.getElementById("cf-fail")!;
  const successBox = document.getElementById("cf-success")!;
  const successTitle = document.getElementById("cf-success-title")!;
  const submit = document.getElementById("cf-submit") as HTMLButtonElement;
  const submitLabel = submit.querySelector(".cf-submit-label")!;
  const honeypot = form.querySelector<HTMLInputElement>(
    'input[name="_gotcha"]',
  )!;
  const timestamp = form.querySelector<HTMLInputElement>(
    'input[name="zeitstempel"]',
  )!;

  const nameEl = form.querySelector<HTMLInputElement>("#cf-name")!;
  const emailEl = form.querySelector<HTMLInputElement>("#cf-email")!;
  const messageEl = form.querySelector<HTMLTextAreaElement>("#cf-message")!;
  const consentEl = form.querySelector<HTMLInputElement>("#cf-consent")!;
  const serviceBoxes = Array.from(
    form.querySelectorAll<HTMLInputElement>('input[name="leistung[]"]'),
  );
  const unsureBox = form.querySelector<HTMLInputElement>("input[data-unsure]");
  const packageSelect = form.querySelector<HTMLSelectElement>("#cf-paket")!;

  const msg = form.dataset;
  const idleLabel = submitLabel.textContent ?? "";
  const sendingLabel = submit.dataset.sending ?? idleLabel;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  form.noValidate = true;

  const loadedAt = Date.now();
  timestamp.value = String(loadedAt);

  const fieldOf = (name: string) =>
    form.querySelector<HTMLElement>(`[data-field="${name}"]`)!;

  type Check = {
    name: string;
    focus: () => HTMLElement | null;
    error: () => string;
  };

  const checks: Check[] = [
    {
      name: "name",
      focus: () => nameEl,
      error: () => (nameEl.value.trim() ? "" : (msg.errName ?? "")),
    },
    {
      name: "email",
      focus: () => emailEl,
      error: () => {
        const value = emailEl.value.trim();
        if (!value) return msg.errEmailEmpty ?? "";
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
          ? ""
          : (msg.errEmailInvalid ?? "");
      },
    },
    {
      name: "paket",
      focus: () => packageSelect,

      error: () => (packageSelect.value ? "" : (msg.errPaket ?? "")),
    },
    {
      name: "message",
      focus: () => messageEl,
      error: () => {
        const value = messageEl.value.trim();
        if (!value) return msg.errMessage ?? "";
        return value.length >= 20
          ? ""
          : (msg.errMessageShort ?? msg.errMessage ?? "");
      },
    },
    {
      name: "consent",
      focus: () => consentEl,
      error: () => (consentEl.checked ? "" : (msg.errConsent ?? "")),
    },
  ];

  function paint(check: Check, text: string) {
    const field = fieldOf(check.name);
    const box = field.querySelector<HTMLElement>(".cf-error")!;
    const label = box.querySelector(".cf-error-text")!;
    const control = check.focus();

    if (text) {
      field.classList.add("is-error");
      label.textContent = text;
      box.hidden = false;
      control?.setAttribute("aria-invalid", "true");
    } else {
      field.classList.remove("is-error");
      box.hidden = true;
      label.textContent = "";
      control?.removeAttribute("aria-invalid");
    }
  }

  for (const check of checks) {
    const field = fieldOf(check.name);
    const controls = Array.from(
      field.querySelectorAll<HTMLElement>("input, textarea, select"),
    );

    for (const control of controls) {
      control.addEventListener("blur", () => paint(check, check.error()));
      control.addEventListener("input", () => {
        if (field.classList.contains("is-error")) paint(check, check.error());
      });
      control.addEventListener("change", () => {
        if (field.classList.contains("is-error")) paint(check, check.error());
      });
    }
  }

  for (const box of serviceBoxes) {
    box.addEventListener("change", () => {
      if (!box.checked) return;
      if (unsureBox && box === unsureBox) {
        for (const other of serviceBoxes)
          if (other !== box) other.checked = false;
      } else if (unsureBox) {
        unsureBox.checked = false;
      }
    });
  }

  function selectPackage(id: string) {
    const match = Array.from(packageSelect.options).find(
      (option) => option.dataset.plan === id,
    );
    if (!match) return;
    packageSelect.value = match.value;
    packageSelect.dispatchEvent(new Event("change", { bubbles: true }));
    setTimeout(() => packageSelect.focus({ preventScroll: true }), 0);
  }

  for (const cta of document.querySelectorAll<HTMLAnchorElement>(
    "a[data-paket]",
  )) {
    cta.addEventListener("click", () => selectPackage(cta.dataset.paket ?? ""));
  }

  const wantedPackage = new URLSearchParams(window.location.search).get(
    "paket",
  );
  if (wantedPackage) selectPackage(wantedPackage);

  function setSending(on: boolean) {
    if (on) {
      submit.style.minWidth = `${submit.offsetWidth}px`;
      submit.classList.add("is-sending");
      submit.setAttribute("aria-busy", "true");
      submitLabel.textContent = sendingLabel;
    } else {
      submit.classList.remove("is-sending");
      submit.removeAttribute("aria-busy");
      submitLabel.textContent = idleLabel;
      submit.style.minWidth = "";
    }
  }

  function showSuccess() {
    form.hidden = true;
    failBox.hidden = true;
    successBox.hidden = false;
    successTitle.focus();
  }

  function showFailure() {
    failBox.hidden = false;
    failBox.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "center",
    });
  }
  let sending = false;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (sending) return;

    failBox.hidden = true;

    const failed = checks.filter((check) => {
      const text = check.error();
      paint(check, text);
      return text !== "";
    });

    if (failed.length > 0) {
      const target = failed[0].focus();
      fieldOf(failed[0].name).scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "center",
      });
      target?.focus({ preventScroll: true });
      return;
    }

    const endpoint = form.getAttribute("action");
    if (!endpoint) {
      showFailure();
      return;
    }

    const data = new FormData(form);
    data.delete("_gotcha");

    sending = true;
    setSending(true);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        showSuccess();
      } else {
        showFailure();
      }
    } catch {
      showFailure();
    } finally {
      sending = false;
      setSending(false);
    }
  });

}