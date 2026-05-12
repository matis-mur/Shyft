// Maison Horla · interactions

// Preload + fade-in du fond
const bg = document.querySelector('.hero__bg img');
if (bg) {
  bg.style.opacity = '0';
  bg.style.transition = 'opacity 1.4s ease';
  const reveal = () => { bg.style.opacity = '1'; };
  bg.complete ? reveal() : bg.addEventListener('load', reveal);
}

// Reveal séquentiel des éléments
const els = [
  '.topbar__left',
  '.topbar__nav',
  '.cta-pill:not(.cta-pill--solid)',
  '.hero__title',
  '.hero__body',
  '.cta-pill--solid',
  '.caption',
  '.founder',
];
els.forEach((sel, i) => {
  const el = document.querySelector(sel);
  if (!el) return;
  el.style.opacity = '0';
  el.style.transform = 'translateY(8px)';
  el.style.transition = `opacity .9s ease ${0.3 + i * 0.10}s, transform .9s ease ${0.3 + i * 0.10}s`;
  requestAnimationFrame(() => requestAnimationFrame(() => {
    el.style.opacity = '';
    el.style.transform = '';
  }));
});
