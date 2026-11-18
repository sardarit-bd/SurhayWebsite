const buttons = document.querySelectorAll<HTMLButtonElement>(".topic-btn");
const cards = document.querySelectorAll<HTMLElement>(".blog-card");
const empty = document.getElementById("post-empty");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const topic = btn.dataset.topic;
    buttons.forEach((b) => {
      b.classList.toggle("is-active", b === btn);
      b.setAttribute("aria-pressed", String(b === btn));
    });
    let visible = 0;
    cards.forEach((card) => {
      const show = topic === "all" || card.dataset.topic === topic;
      card.classList.toggle("is-filtered-out", !show);
      if (show) visible++;
    });
    empty?.classList.toggle("hidden", visible > 0);
    announce(visible);
  });
});

const status = document.getElementById("post-count");
let flip = false;
function announce(n: number) {
  if (!status) return;
  const tpl = status.dataset.countTemplate ?? "";
  flip = !flip;
  status.textContent = tpl.replace("{n}", String(n)) + (flip ? "" : " ");
}
