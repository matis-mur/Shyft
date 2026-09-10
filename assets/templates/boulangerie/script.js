// Miette · interactions

// Preload + fade-in du fond
const bg = document.querySelector('.hero__bg img');
if (bg) {
  bg.style.opacity = '0';
  bg.style.transition = 'opacity 1.2s ease';
  bg.addEventListener('load', () => { bg.style.opacity = '1'; });
  if (bg.complete) bg.style.opacity = '1';
}

// Reveal des éléments au mount
const els = document.querySelectorAll('.display, .desc, .card, .vlabel, .topbar, .scroll, .video');
els.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(8px)';
  el.style.transition = `opacity .8s ease ${0.2 + i * 0.08}s, transform .8s ease ${0.2 + i * 0.08}s`;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.style.opacity = '';
      el.style.transform = '';
    });
  });
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
        // Décalage en cascade entre voisins immédiats
        const freres = [...e.target.parentElement.querySelectorAll(':scope > .r')];
        const rang = Math.max(0, freres.indexOf(e.target));
        e.target.style.transitionDelay = (rang * 70) + 'ms';
        e.target.classList.add('vu');
        oeil.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.15 });
    aReveler.forEach(el => oeil.observe(el));
  }
}
