// Hugo Morano · interactions minimales

// Horloge live (top-left)
const clock = document.getElementById('clock');
function tick() {
  if (!clock) return;
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  clock.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
tick();
setInterval(tick, 30000);

// Reveal séquentiel des blocs au mount
const els = ['.topbar', '.wordmark', '.tiles', '.bottom__left', '.case', '.sidetab'];
els.forEach((sel, i) => {
  const el = document.querySelector(sel);
  if (!el) return;
  el.style.opacity = '0';
  el.style.transform = 'translateY(10px)';
  el.style.transition = `opacity .85s ease ${0.15 + i * 0.08}s, transform .85s ease ${0.15 + i * 0.08}s`;
  requestAnimationFrame(() => requestAnimationFrame(() => {
    el.style.opacity = '';
    el.style.transform = '';
  }));
});

// Apparition au défilement des panneaux sous le hero
const aReveler = document.querySelectorAll('.r');
if (aReveler.length) {
  if (!window.IntersectionObserver || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    aReveler.forEach(el => el.classList.add('vu'));
  } else {
    const oeil = new IntersectionObserver((entrees) => {
      entrees.forEach((e) => {
        if (!e.isIntersecting) return;
        const freres = [...e.target.parentElement.querySelectorAll(':scope > .r')];
        e.target.style.transitionDelay = (Math.max(0, freres.indexOf(e.target)) * 60) + 'ms';
        e.target.classList.add('vu');
        oeil.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
    aReveler.forEach(el => oeil.observe(el));
  }
}
