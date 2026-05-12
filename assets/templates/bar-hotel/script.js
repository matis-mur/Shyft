// Villa Solana · interactions légères

// Burger menu mobile
const burger = document.querySelector('.nav__burger');
const links = document.querySelector('.nav__links');
if (burger && links) {
  burger.addEventListener('click', () => {
    links.classList.toggle('nav__links--open');
  });
}

// Nav background on scroll
const nav = document.querySelector('.nav');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > 80) {
    nav.style.background = 'rgba(19, 62, 125, 0.92)';
    nav.style.backdropFilter = 'blur(12px)';
    nav.style.padding = '0.8rem 0';
  } else {
    nav.style.background = 'linear-gradient(to bottom, rgba(10,26,48,0.55), rgba(10,26,48,0))';
    nav.style.backdropFilter = 'blur(2px)';
    nav.style.padding = '1.2rem 0';
  }
  lastScroll = y;
});

// Reveal on scroll (subtle)
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.intro, .rooms__head, .room, .bar__text, .dining__card, .quotes blockquote, .reserve__text')
  .forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
  });
