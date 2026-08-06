/* ============================================
   STICKY HEADER · pill on scroll (seuil 50px)
   ============================================ */
(function() {
  const header = document.getElementById('siteHeader');
  if (!header) return;
  const SCROLL_THRESHOLD = 50;
  let ticking = false;

  function update() {
    ticking = false;
    if (window.scrollY > SCROLL_THRESHOLD) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }
  update();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ============================================
   GOOEY TEXT MORPHING
   ============================================ */
(function() {
  const text1 = document.getElementById('gooeyText1');
  const text2 = document.getElementById('gooeyText2');
  if (!text1 || !text2) return;

  const texts = ['conversion.', 'croissance.', 'performance.','conversion.'];
  const morphTime = 1;
  const cooldownTime = 2.2;
  let textIndex = texts.length - 1;
  let time = new Date();
  let morph = 0;
  let cooldown = cooldownTime;

  function setMorph(fraction) {
    text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
    fraction = 1 - fraction;
    text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
  }

  function doCooldown() {
    morph = 0;
    text2.style.filter = '';
    text2.style.opacity = '100%';
    text1.style.filter = '';
    text1.style.opacity = '0%';
  }

  function doMorph() {
    morph -= cooldown;
    cooldown = 0;
    let fraction = morph / morphTime;
    if (fraction > 1) {
      cooldown = cooldownTime;
      fraction = 1;
    }
    setMorph(fraction);
  }

  function animate() {
    requestAnimationFrame(animate);
    const newTime = new Date();
    const shouldIncrementIndex = cooldown > 0;
    const dt = (newTime.getTime() - time.getTime()) / 1000;
    time = newTime;
    cooldown -= dt;
    if (cooldown <= 0) {
      if (shouldIncrementIndex) {
        textIndex = (textIndex + 1) % texts.length;
        text1.textContent = texts[textIndex % texts.length];
        text2.textContent = texts[(textIndex + 1) % texts.length];
      }
      doMorph();
    } else {
      doCooldown();
    }
  }
  animate();
})();

/* ============================================
   HOVER BUTTON GLOW (sur tous les btn-primary)
   ============================================ */
(function() {
  const buttons = document.querySelectorAll('.btn-primary');
  buttons.forEach(btn => {
    let isListening = false;
    let lastAdded = 0;

    const createGlow = (x, y) => {
      const glow = document.createElement('span');
      glow.className = 'glow';
      const xPos = x / btn.offsetWidth;
      glow.style.background = `linear-gradient(to right, #F0C557 ${xPos * 100}%, #BD8E2A ${xPos * 100}%)`;
      glow.style.left = x + 'px';
      glow.style.top = y + 'px';
      btn.appendChild(glow);

      requestAnimationFrame(() => { glow.style.opacity = '0.85'; });
      setTimeout(() => { glow.style.opacity = '0'; glow.style.transitionDuration = '1.2s'; }, 800);
      setTimeout(() => { glow.remove(); }, 2200);
    };

    btn.addEventListener('pointerenter', () => { isListening = true; });
    btn.addEventListener('pointerleave', () => { isListening = false; });
    btn.addEventListener('pointermove', (e) => {
      if (!isListening) return;
      const now = Date.now();
      if (now - lastAdded > 80) {
        lastAdded = now;
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        createGlow(x, y);
      }
    });
  });
})();

/* ============================================
   CURSEUR CUSTOM
   ============================================ */
(function() {
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.getElementById('cursorRing').style.display = 'none';
    document.getElementById('cursorDot').style.display = 'none';
    return;
  }

  const ring = document.getElementById('cursorRing');
  const dot = document.getElementById('cursorDot');

  // Le libellé contextuel ("Démarrer", "Auditer"…) est retiré : cible dirigeants,
  // on privilégie un curseur lisible et prévisible plutôt qu'un effet de style.
  const text = document.getElementById('cursorText');
  if (text) text.remove();

  // Position appliquée directement, sans interpolation : zéro traînée.
  // On passe par transform (composited) plutôt que left/top pour éviter
  // tout reflow et rester à 60fps même sur machine modeste.
  let x = 0, y = 0, queued = false;

  const paint = () => {
    const t = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    dot.style.transform = t;
    ring.style.transform = t;
    queued = false;
  };

  document.addEventListener('mousemove', (e) => {
    x = e.clientX;
    y = e.clientY;
    // Une seule peinture par frame max, mais toujours sur la position la plus récente
    if (!queued) { queued = true; requestAnimationFrame(paint); }
  }, { passive: true });

  // Survol : un seul état, léger. Délégation d'événements plutôt que N listeners.
  const HOVER_SEL = 'a, button, [role="button"], input, textarea, select, label, .showcase-card, .faq-item, .pillar, .sector';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(HOVER_SEL)) document.body.classList.add('cursor-link');
  }, { passive: true });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(HOVER_SEL) && !e.relatedTarget?.closest(HOVER_SEL)) {
      document.body.classList.remove('cursor-link');
    }
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    ring.style.opacity = '0';
    dot.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    ring.style.opacity = '1';
    dot.style.opacity = '1';
  });
})();

/* ============================================
   FAQ ACCORDION
   ============================================ */
(function() {
  document.querySelectorAll('.faq-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('open');

      // Fermer tous les autres
      document.querySelectorAll('.faq-item.open').forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.faq-answer').style.maxHeight = '0px';
          other.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        item.classList.remove('open');
        answer.style.maxHeight = '0px';
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();

/* ============================================
   REVEAL ON SCROLL (IntersectionObserver)
   ============================================ */
(function() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

/* ============================================
   RADIAL ORBITAL TIMELINE · Méthode Shyft
   ============================================ */
(function() {
  const stage = document.getElementById('orbital');
  const nodesWrap = document.getElementById('orbitalNodes');
  if (!stage || !nodesWrap) return;

  const STEPS = [
    { id: 1, num: '01', title: 'Cadrage', date: 'Jour 1 · 2h', status: 'completed', content: "Atelier stratégique : positionnement, cibles, parcours de conversion. On comprend votre métier avant de dessiner quoi que ce soit.", relatedIds: [2] },
    { id: 2, num: '02', title: 'Direction artistique', date: 'Jour 5', status: 'completed', content: "Deux propositions visuelles complètes. Vous tranchez. L'identité du site est verrouillée avant la production.", relatedIds: [1, 3] },
    { id: 3, num: '03', title: 'Maquettes & copy', date: 'Jour 12', status: 'in-progress', content: "Pages clés validées avec vous, copywriting SEO inclus. Vous voyez exactement le rendu, mots compris.", relatedIds: [2, 4] },
    { id: 4, num: '04', title: 'Développement', date: 'Jour 20', status: 'pending', content: "Pré-production accessible 24/7. Retours en continu, performance optimisée, mobile irréprochable.", relatedIds: [3, 5] },
    { id: 5, num: '05', title: 'Mise en ligne', date: 'Jour 30', status: 'pending', content: "Tracking GA4, Search Console, SEO technique. Formation 30 minutes pour gérer le site en autonomie.", relatedIds: [4, 6] },
    { id: 6, num: '06', title: 'Suivi inclus', date: 'J+30', status: 'pending', content: "Trente jours après la livraison, on corrige tout ce qui doit l'être. Sans facture supplémentaire.", relatedIds: [5] },
  ];

  const STATUS_LABEL = { 'completed': 'Validé', 'in-progress': 'En cours', 'pending': 'À venir' };
  const RADIUS_PCT = 32.5;
  const ROTATION_SPEED = 0.18;

  let rotation = 0;
  let activeId = null;
  let autoRotate = true;
  let rafId = null;

  // Création des nœuds
  STEPS.forEach((step, index) => {
    const wrap = document.createElement('div');
    wrap.className = 'orbital-node';
    wrap.dataset.id = step.id;
    wrap.setAttribute('role', 'listitem');

    const btn = document.createElement('button');
    btn.className = 'orbital-node-btn';
    btn.type = 'button';
    btn.textContent = step.num;
    btn.setAttribute('aria-label', `${step.title} · ${step.date}`);
    btn.setAttribute('aria-expanded', 'false');

    const label = document.createElement('span');
    label.className = 'orbital-node-label';
    label.textContent = step.title;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleNode(step.id);
    });

    wrap.appendChild(btn);
    wrap.appendChild(label);
    nodesWrap.appendChild(wrap);
  });

  const nodeEls = Array.from(nodesWrap.querySelectorAll('.orbital-node'));

  function positionNodes() {
    const total = STEPS.length;
    const stageWidth = stage.offsetWidth;
    const radius = (stageWidth * RADIUS_PCT) / 100;

    nodeEls.forEach((el, i) => {
      const angle = ((i / total) * 360 + rotation) % 360;
      const rad = (angle * Math.PI) / 180;
      const x = radius * Math.cos(rad);
      const y = radius * Math.sin(rad);
      // Atténuation arrière-plan : opacité varie selon position verticale (sin)
      const depth = (1 + Math.sin(rad)) / 2; // 0..1
      const opacity = 0.45 + 0.55 * depth;
      const scale = 0.88 + 0.12 * depth;

      el.style.setProperty('--node-x', `${x}px`);
      el.style.setProperty('--node-y', `${y}px`);
      // Conserve la transform principale (translate) et applique scale via wrapper
      el.style.opacity = el.classList.contains('orbital-node--active') ? '1' : opacity.toFixed(2);
      el.style.zIndex = Math.round(10 + 30 * depth);

      // Légère mise à l'échelle via inner btn (pas active)
      const btn = el.querySelector('.orbital-node-btn');
      if (btn && !el.classList.contains('orbital-node--active')) {
        btn.style.transform = `scale(${scale.toFixed(3)})`;
      } else if (btn) {
        btn.style.transform = '';
      }
    });
  }

  function tick() {
    if (autoRotate) {
      rotation = (rotation + ROTATION_SPEED) % 360;
    }
    positionNodes();
    rafId = requestAnimationFrame(tick);
  }

  function getStep(id) {
    return STEPS.find(s => s.id === id);
  }

  function buildCard(step) {
    const card = document.createElement('div');
    card.className = 'orbital-card';
    card.innerHTML = `
      <div class="orbital-card-head">
        <span class="orbital-card-status" data-status="${step.status}">${STATUS_LABEL[step.status]}</span>
        <span class="orbital-card-date">${step.date}</span>
      </div>
      <div class="orbital-card-title">${step.num} · ${step.title}</div>
      <div class="orbital-card-content">${step.content}</div>
      ${step.relatedIds.length ? `
        <div class="orbital-card-related">
          <h5>Étapes liées</h5>
          <div class="orbital-related-list">
            ${step.relatedIds.map(rid => {
              const r = getStep(rid);
              return `<button type="button" class="orbital-related-btn" data-related="${rid}">${r.num} · ${r.title}</button>`;
            }).join('')}
          </div>
        </div>` : ''}
    `;
    card.addEventListener('click', (e) => e.stopPropagation());
    card.querySelectorAll('.orbital-related-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const rid = parseInt(btn.dataset.related, 10);
        toggleNode(rid, true);
      });
    });
    return card;
  }

  function clearActive() {
    activeId = null;
    nodeEls.forEach(el => {
      el.classList.remove('orbital-node--active');
      el.classList.remove('orbital-node--related');
      const btn = el.querySelector('.orbital-node-btn');
      if (btn) btn.setAttribute('aria-expanded', 'false');
      const card = el.querySelector('.orbital-card');
      if (card) card.remove();
    });
    autoRotate = true;
  }

  function toggleNode(id, force) {
    if (activeId === id && !force) {
      clearActive();
      return;
    }
    clearActive();
    activeId = id;
    autoRotate = false;

    // Centre le nœud actif en haut (angle 270° en repère CSS) pour que la carte
    // s'ouvre vers le centre du cercle plutôt que sous l'orbite.
    const idx = STEPS.findIndex(s => s.id === id);
    const total = STEPS.length;
    const targetAngle = (idx / total) * 360;
    rotation = (270 - targetAngle + 360) % 360;
    positionNodes();

    const step = getStep(id);
    const nodeEl = nodeEls.find(el => parseInt(el.dataset.id, 10) === id);
    if (!nodeEl) return;
    nodeEl.classList.add('orbital-node--active');
    const btn = nodeEl.querySelector('.orbital-node-btn');
    if (btn) btn.setAttribute('aria-expanded', 'true');

    step.relatedIds.forEach(rid => {
      const rEl = nodeEls.find(el => parseInt(el.dataset.id, 10) === rid);
      if (rEl) rEl.classList.add('orbital-node--related');
    });

    const card = buildCard(step);
    nodeEl.appendChild(card);
  }

  // Click hors d'un nœud = reset
  stage.addEventListener('click', (e) => {
    if (!e.target.closest('.orbital-node')) clearActive();
  });

  // Resize → reposition
  let resizeRaf;
  window.addEventListener('resize', () => {
    if (resizeRaf) cancelAnimationFrame(resizeRaf);
    resizeRaf = requestAnimationFrame(positionNodes);
  });

  // Pause rotation hors viewport pour économiser
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!rafId) tick();
        } else {
          if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
          }
        }
      });
    }, { threshold: 0.05 });
    io.observe(stage);
  } else {
    tick();
  }

  // Reduced motion : on freeze la rotation auto
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    autoRotate = false;
  }
})();

/* ============================================
   FOOTER MARK · spotlight qui suit la souris
   ============================================ */
(function() {
  const mark = document.getElementById('footerMark');
  const grad = document.getElementById('footerSpotGrad');
  if (!mark || !grad) return;
  // On écoute sur le <footer> entier puisque le wordmark est en arrière-plan
  // (pointer-events: none) et que les colonnes sont superposées par-dessus.
  const footer = mark.closest('footer');
  if (!footer) return;

  // Coordonnées dans l'espace du viewBox (1132 × 323)
  const VB_W = 1132;
  const VB_H = 323;
  const CENTER_X = VB_W / 2;
  const CENTER_Y = VB_H / 2;

  // Le SVG est rendu au sein du conteneur .footer-mark mais avec
  // preserveAspectRatio="xMidYMid meet" : il est centré et conserve son ratio.
  // On calcule donc les bornes effectives du SVG dans le wrapper.
  function getSvgBounds() {
    const wrap = mark.getBoundingClientRect();
    const ratio = VB_W / VB_H;
    let w, h;
    if (wrap.width / wrap.height > ratio) {
      h = wrap.height;
      w = h * ratio;
    } else {
      w = wrap.width;
      h = w / ratio;
    }
    return {
      left: wrap.left + (wrap.width - w) / 2,
      top: wrap.top + (wrap.height - h) / 2,
      width: w,
      height: h,
    };
  }

  let raf = null;
  let pendingX = CENTER_X;
  let pendingY = CENTER_Y;

  function apply() {
    raf = null;
    grad.setAttribute('cx', pendingX);
    grad.setAttribute('cy', pendingY);
  }

  footer.addEventListener('pointermove', (e) => {
    const b = getSvgBounds();
    pendingX = ((e.clientX - b.left) / b.width) * VB_W;
    pendingY = ((e.clientY - b.top) / b.height) * VB_H;
    if (!raf) raf = requestAnimationFrame(apply);
  });

  footer.addEventListener('pointerleave', () => {
    pendingX = CENTER_X;
    pendingY = CENTER_Y;
    if (!raf) raf = requestAnimationFrame(apply);
  });
})();

/* ============================================
   CONTACT FORM · soumission via mailto enrichi
   À remplacer plus tard par Formspree / Netlify Forms / API custom.
   ============================================ */
(function() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    const subject = `Projet Shyft · ${data.get('societe') || data.get('nom') || 'Nouveau contact'}`;
    const body =
      `Prénom : ${data.get('prenom')}\n` +
      `Nom : ${data.get('nom')}\n` +
      `Société : ${data.get('societe')}\n` +
      `Email : ${data.get('email')}\n\n` +
      `Message :\n${data.get('message')}\n`;
    // Obfuscation : on assemble l'adresse en runtime, pas de chaîne directe
    const mailUser = ['c','o','n','t','a','c','t'].join('');
    const mailDomain = ['shyft','fr'].join('.');
    window.location.href =
      'mailto:' + mailUser + '@' + mailDomain + '?subject=' +
      encodeURIComponent(subject) +
      '&body=' +
      encodeURIComponent(body);
    form.classList.add('is-sent');
  });
})();

/* ============================================
   SMOOTH SCROLL pour les ancres
   ============================================ */
(function() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const navHeight = document.querySelector('nav').offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ============================================
   SHOWCASE · Scale iframes to fit card width
   ============================================ */
(function() {
  const frames = document.querySelectorAll('.showcase-frame-viewport');
  if (!frames.length) return;

  const LOGICAL_WIDTH = 1440;

  const fit = (frame) => {
    const iframe = frame.querySelector('iframe');
    if (!iframe) return;
    const w = frame.clientWidth;
    if (!w) return;
    const scale = w / LOGICAL_WIDTH;
    iframe.style.transform = 'scale(' + scale + ')';
  };

  if ('ResizeObserver' in window) {
    const ro = new ResizeObserver(entries => {
      entries.forEach(e => fit(e.target));
    });
    frames.forEach(f => { fit(f); ro.observe(f); });
  } else {
    const fitAll = () => frames.forEach(fit);
    fitAll();
    window.addEventListener('resize', fitAll, { passive: true });
  }
})();
