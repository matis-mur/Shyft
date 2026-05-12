// Poudre · interactions

// Swatch color switcher (cosmetic · change the dominant accent)
const swatches = document.querySelectorAll('.swatch');
const root = document.documentElement;

const palettes = {
  pink:  { accent: '#FF2E7E', bg: '#F1ECDF' },
  cream: { accent: '#0A0A0A', bg: '#F1ECDF' },
  black: { accent: '#0A0A0A', bg: '#FFB4D0' },
};

swatches.forEach((sw, i) => {
  sw.addEventListener('click', () => {
    swatches.forEach((s) => s.classList.remove('is-active'));
    sw.classList.add('is-active');
    const key = i === 0 ? 'pink' : i === 1 ? 'cream' : 'black';
    const p = palettes[key];
    root.style.setProperty('--pink', p.accent);
    root.style.setProperty('--bg', p.bg);
  });
});

// Reveal séquentiel
const els = document.querySelectorAll('.topbar, .wordmark, .info, .card, .footer');
els.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(8px)';
  el.style.transition = `opacity .8s ease ${0.1 + i * 0.08}s, transform .8s ease ${0.1 + i * 0.08}s`;
  requestAnimationFrame(() => requestAnimationFrame(() => {
    el.style.opacity = '';
    el.style.transform = '';
  }));
});
