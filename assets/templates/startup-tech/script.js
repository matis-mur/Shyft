// Lume · interactions

// Reveal au mount
const els = document.querySelectorAll('.nav, .hero__title, .hero__media, .hero__copy');
els.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(12px)';
  el.style.transition = `opacity .9s ease ${0.15 + i * 0.12}s, transform .9s ease ${0.15 + i * 0.12}s`;
  requestAnimationFrame(() => requestAnimationFrame(() => {
    el.style.opacity = '';
    el.style.transform = '';
  }));
});

// Parallax léger sur la photo
const media = document.querySelector('.hero__media img');
if (media) {
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 8;
    const y = (e.clientY / window.innerHeight - 0.5) * 8;
    media.style.transform = `translate(${x}px, ${y}px) scale(1.04)`;
  });
}
