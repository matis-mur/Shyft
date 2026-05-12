// Centre Sereno · interactions

// Border + shadow on nav when scrolled
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 20);
});

// Burger toggle
const burger = document.querySelector('.nav__burger');
const links = document.querySelector('.nav__links');
if (burger && links) {
  burger.addEventListener('click', () => links.classList.toggle('is-open'));
}

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service, .stat, .approche__text, .hero__media, .cta__inner')
  .forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity .7s ease, transform .7s ease';
    observer.observe(el);
  });
