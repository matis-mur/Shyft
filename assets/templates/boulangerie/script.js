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
