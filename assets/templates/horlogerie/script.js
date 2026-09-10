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

// Apparition au défilement des sections sous le hero
const aReveler = document.querySelectorAll('.r');
if (aReveler.length) {
  if (!window.IntersectionObserver || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    aReveler.forEach(el => el.classList.add('vu'));
  } else {
    const oeil = new IntersectionObserver((entrees) => {
      entrees.forEach((e) => {
        if (!e.isIntersecting) return;
        const freres = [...e.target.parentElement.querySelectorAll(':scope > .r')];
        e.target.style.transitionDelay = (Math.max(0, freres.indexOf(e.target)) * 70) + 'ms';
        e.target.classList.add('vu');
        oeil.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
    aReveler.forEach(el => oeil.observe(el));
  }
}

// Maquette : le formulaire ne part nulle part, il confirme sur place.
const formEstimation = document.getElementById('formEstimation');
if (formEstimation) {
  formEstimation.addEventListener('submit', (e) => {
    e.preventDefault();
    const ok = document.getElementById('formOk');
    if (ok) ok.hidden = false;
  });
}
