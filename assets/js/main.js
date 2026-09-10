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

  // Surfaces dorées : le point du curseur y passe en oxblood, sans quoi
  // l'or sur l'or devient invisible.
  const GOLD_SEL = [
    '.btn-primary', '.hero-glass-btn--primary', '.nav-cta',
    '.contact-guarantees', '.contact-intro', '.pillar-badge',
    '.pillar--core .pillar-toggle:hover', '.faq-item.open .faq-trigger'
  ].join(',');

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(GOLD_SEL)) document.body.classList.add('cursor-on-gold');
  }, { passive: true });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(GOLD_SEL) && !e.relatedTarget?.closest(GOLD_SEL)) {
      document.body.classList.remove('cursor-on-gold');
    }
  }, { passive: true });

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

  /* Les six étapes épousent les cinq phases de la roadmap du pilier site web
     (Comprendre, Montrer, Produire, Vérifier, Livrer), plus le suivi qui la
     prolonge. Le vocabulaire diffère volontairement : ici on nomme ce qui est
     produit, là-bas ce qui se passe. Les plages de jours, elles, sont les mêmes. */
  const STEPS = [
    { id: 1, num: '01', title: 'Cadrage', date: 'Jours 1 à 6', status: 'completed', content: "Atelier stratégique : positionnement, cibles, parcours de conversion. Nous comprenons votre métier avant de dessiner quoi que ce soit.", relatedIds: [2] },
    { id: 2, num: '02', title: 'Direction & maquettes', date: 'Jours 7 à 12', status: 'completed', content: "Trois propositions visuelles complètes, puis la maquette de l'accueil avec son copywriting SEO. Vous tranchez, l'identité est verrouillée avant la production.", relatedIds: [1, 3] },
    { id: 3, num: '03', title: 'Développement', date: 'Jours 13 à 18', status: 'in-progress', content: "Pré-production accessible 24/7. Retours en continu, performance optimisée, mobile irréprochable.", relatedIds: [2, 4] },
    { id: 4, num: '04', title: 'Recette', date: 'Jours 19 à 24', status: 'pending', content: "Tests sur tous les navigateurs et tous les écrans, puis recette avec vous. Rien ne part en ligne sans votre feu vert.", relatedIds: [3, 5] },
    { id: 5, num: '05', title: 'Mise en ligne', date: 'Jours 25 à 30', status: 'pending', content: "Tracking GA4, Search Console, SEO technique. Formation 30 minutes si vos contenus sont modifiables.", relatedIds: [4, 6] },
    { id: 6, num: '06', title: 'Suivi inclus', date: 'J+30', status: 'pending', content: "Trente jours après la livraison, nous corrigeons tout ce qui doit l'être. Sans facture supplémentaire.", relatedIds: [5] },
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

  // Sous 900px l'orbite n'est ni affichée ni animée : inutile de faire
  // tourner une boucle rAF en permanence sur mobile.
  const isNarrow = () => window.matchMedia('(max-width: 900px)').matches;

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
    // Sur mobile c'est la timeline qui est affichée : on arrête la boucle.
    if (isNarrow()) { rafId = null; return; }
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

/* ============================================
   MENU MOBILE · ouvert par le logo
   ============================================
   Sous 880px la barre de navigation n'affiche plus les liens : le logo
   sert de bouton d'ouverture. Au-delà, il redevient un simple lien vers
   l'accueil.
*/
(function () {
  const nav  = document.querySelector('.nav');
  const logo = document.querySelector('.logo-mark');
  if (!nav || !logo) return;

  const isMobile = () => window.matchMedia('(max-width: 880px)').matches;

  const close = () => {
    nav.classList.remove('is-open');
    logo.setAttribute('aria-expanded', 'false');
  };

  logo.addEventListener('click', (e) => {
    if (!isMobile()) return;            // desktop : lien vers l'accueil
    e.preventDefault();
    const open = nav.classList.toggle('is-open');
    logo.setAttribute('aria-expanded', String(open));
  });

  // Fermeture : clic à l'extérieur, touche Échap, ou navigation
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('is-open') && !nav.contains(e.target)) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
  nav.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', close));

  // Repassage en desktop : on nettoie l'état
  window.addEventListener('resize', () => { if (!isMobile()) close(); }, { passive: true });
})();


/* ============================================
   APERÇU AU SURVOL
   Carte flottante qui suit le curseur sur tout lien portant data-apercu.
   Vit ici et non en inline : les pages piliers en ont besoin aussi, et
   les chemins de logo doivent rester absolus pour marcher depuis /piliers/.
   ============================================ */
(function () {
  var liens = document.querySelectorAll('[data-apercu]');
  if (!liens.length) return;

  // Même garde que le curseur personnalisé : rien au doigt, uniquement à la souris.
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  var APERCUS = {
    'strategie':   { logo: 'Strategie.svg',   desc: 'Positionnement, plateforme de marque, roadmap 12 mois.',  cta: 'Voir le pilier →' },
    'identite':    { logo: 'Identite.svg',    desc: 'Logo, charte, design system. Trois directions abouties.', cta: 'Voir le pilier →' },
    'site-web':    { logo: 'Site%20web.svg',  desc: 'Sur-mesure, pensé pour convertir. Livré en 30 jours.',    cta: 'Voir le pilier →' },
    'acquisition': { logo: 'Acquisition.svg', desc: 'SEO, GEO, campagnes, cold email. Les bons prospects.',    cta: 'Voir le pilier →' },
    'pilotage':    { logo: 'Pilotage.svg',    desc: 'Direction marketing externalisée, mesure et arbitrages.', cta: 'Voir le pilier →' },
    // Pas un pilier, donc pas de logo : un titre texte tient le même rôle.
    'refonte':     { titre: 'Refonte de site internet',
                     desc: "Audit de l'existant, contenus repris, redirections. Votre référencement est préservé.",
                     cta: 'Voir la page →' },
    'prix':        { titre: "Prix d'une refonte",
                     desc: 'Fourchettes réelles selon le périmètre, et ce qui fait varier la facture.',
                     cta: 'Voir la page →' },
    'devis':       { titre: 'Demander un devis',
                     desc: 'Un formulaire court, une réponse chiffrée sous 24h ouvrées. Sans engagement.',
                     cta: 'Ouvrir le formulaire →' }
  };

  var carte = document.createElement('div');
  carte.className = 'apercu';
  carte.setAttribute('aria-hidden', 'true');
  carte.innerHTML = '<img class="apercu-logo" src="" alt="">' +
                    '<span class="apercu-titre"></span>' +
                    '<span class="apercu-desc"></span>' +
                    '<span class="apercu-cta"></span>';
  document.body.appendChild(carte);

  var logo  = carte.querySelector('.apercu-logo');
  var titre = carte.querySelector('.apercu-titre');
  var desc  = carte.querySelector('.apercu-desc');
  var cta   = carte.querySelector('.apercu-cta');
  var visible = false, x = 0, y = 0, prevu = false;

  // Les logos sont préchargés au premier survol pour éviter le clignotement.
  var precharges = {};
  function precharger(cle) {
    if (precharges[cle] || !APERCUS[cle].logo) return;
    precharges[cle] = new Image();
    precharges[cle].src = '/assets/logos/' + APERCUS[cle].logo;
  }

  function placer() {
    prevu = false;
    var l = carte.offsetWidth, h = carte.offsetHeight;
    var gx = x - l / 2;                 // centrée sur le curseur
    var gy = y - h - 22;                // posée au-dessus
    if (gx < 16) gx = 16;
    if (gx + l > innerWidth - 16) gx = innerWidth - l - 16;
    if (gy < 16) gy = y + 26;           // bascule dessous si le haut manque
    carte.style.transform = 'translate3d(' + Math.round(gx) + 'px,' + Math.round(gy) + 'px,0)' +
                            (visible ? '' : ' scale(0.96)');
  }

  function suivre(e) {
    x = e.clientX; y = e.clientY;
    if (!prevu) { prevu = true; requestAnimationFrame(placer); }
  }

  liens.forEach(function (lien) {
    var cle = lien.getAttribute('data-apercu');
    var item = APERCUS[cle];
    if (!item) return;

    lien.addEventListener('mouseenter', function (e) {
      precharger(cle);
      if (item.logo) {
        logo.src = '/assets/logos/' + item.logo;
        logo.alt = '';
        logo.hidden = false;
        titre.hidden = true;
      } else {
        logo.hidden = true;
        titre.textContent = item.titre;
        titre.hidden = false;
      }
      desc.textContent = item.desc;
      cta.textContent = item.cta;
      x = e.clientX; y = e.clientY;
      placer();
      visible = true;
      carte.classList.add('est-visible');
    });

    lien.addEventListener('mousemove', suivre);

    lien.addEventListener('mouseleave', function () {
      visible = false;
      carte.classList.remove('est-visible');
    });
  });
})();

/* ============================================
   APERÇU ÉQUIPE · photo d'accueil
   La photo est découpée en quatre rectangles, un par personne. Ils sont
   exprimés en fractions de l'image d'origine puis reprojetés à l'écran :
   object-fit:cover recadre l'image autrement à chaque format de fenêtre,
   des pourcentages du conteneur se décaleraient des visages.
   ============================================ */
(function () {
  var section = document.getElementById('equipe');
  var fond = section && section.querySelector('.equipe-bg');
  if (!section || !fond || !window.SHYFT_PROFILS) return;

  // Même garde que le curseur personnalisé : rien au doigt, uniquement à la souris.
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  /* Rectangles relevés sur team.jpg (1582x1282), de gauche à droite.
     x1/x2 : bornes horizontales, coupées à mi-chemin entre deux visages.
     y1 : juste au-dessus des têtes, le bras levé d'Anne-Carole monte plus haut. */
  var DECOUPE = {
    'noe':         { x1: 0.06, x2: 0.36, y1: 0.33, y2: 1 },
    'laurent':     { x1: 0.36, x2: 0.49, y1: 0.33, y2: 1 },
    'anne-carole': { x1: 0.49, x2: 0.62, y1: 0.31, y2: 1 },
    'matis':       { x1: 0.62, x2: 0.97, y1: 0.33, y2: 1 }
  };

  /* Les deux du milieu se croisent : la carte de Laurent se pose au-dessus
     d'Anne-Carole et inversement. Noé et Matis gardent leur coin. */
  var CROISEMENT = { 'laurent': 'anne-carole', 'anne-carole': 'laurent' };

  var hits = {}, cartes = {}, noms = {};
  section.querySelectorAll('.equipe-hit').forEach(function (el) { hits[el.dataset.profil] = el; });
  section.querySelectorAll('.equipe-apercu').forEach(function (el) { cartes[el.dataset.profil] = el; });
  section.querySelectorAll('.equipe-zone[data-profil]').forEach(function (el) { noms[el.dataset.profil] = el; });

  // ---- Contenu des cartes, depuis la même source que la fiche de /agence ----
  Object.keys(cartes).forEach(function (cle) {
    var p = window.SHYFT_PROFILS[cle];
    if (!p) return;
    var logos = p.blocs.reduce(function (acc, b) { return acc.concat(b.lignes); }, [])
                       .filter(function (l) { return l.logo; });
    var html = '<span class="equipe-apercu-nom">' + p.nom + '</span>'
             + '<span class="equipe-apercu-role">' + p.role + '</span>'
             + '<span class="equipe-apercu-bio">' + p.bio + '</span>';
    if (logos.length) {
      html += '<div class="equipe-apercu-logos">' + logos.map(function (l) {
        return '<img src="assets/logos/profils/' + l.logo + '" alt="' + l.alt + '"'
             + (l.carre ? ' class="est-carre"' : '') + ' loading="lazy" decoding="async">';
      }).join('') + '</div>';
    }
    html += '<div class="equipe-apercu-tags">'
          + p.tags.map(function (t) { return '<span>' + t + '</span>'; }).join('')
          + '</div>';
    cartes[cle].innerHTML = html;
  });

  // ---- Reprojection des rectangles selon le recadrage réel ----
  function placer() {
    var iw = fond.naturalWidth, ih = fond.naturalHeight;
    if (!iw || !ih) return;
    var cw = section.clientWidth, ch = section.clientHeight;
    var pos = getComputedStyle(fond).objectPosition.split(' ');
    var px = parseFloat(pos[0]), py = parseFloat(pos[1]);
    if (isNaN(px)) px = 50;
    if (isNaN(py)) py = 50;
    var k = Math.max(cw / iw, ch / ih);          // cover : on remplit le plus contraint
    var rw = iw * k, rh = ih * k;
    var ox = (cw - rw) * (px / 100), oy = (ch - rh) * (py / 100);
    Object.keys(DECOUPE).forEach(function (cle) {
      var z = DECOUPE[cle], el = hits[cle];
      if (!el) return;
      el.style.left = (ox + z.x1 * rw) + 'px';
      el.style.top = (oy + z.y1 * rh) + 'px';
      el.style.width = ((z.x2 - z.x1) * rw) + 'px';
      el.style.height = ((z.y2 - z.y1) * rh) + 'px';
    });
    Object.keys(CROISEMENT).forEach(function (cle) {
      var carte = cartes[cle], ref = DECOUPE[CROISEMENT[cle]];
      if (!carte || !ref) return;
      var centre = ox + (ref.x1 + ref.x2) / 2 * rw;
      var largeur = carte.offsetWidth;
      var marge = 24;
      var g = Math.max(marge, Math.min(centre - largeur / 2, cw - largeur - marge));
      carte.style.left = Math.round(g) + 'px';
    });
  }

  if (fond.complete) placer(); else fond.addEventListener('load', placer);
  /* Appel direct plutôt que reporté à la frame suivante : requestAnimationFrame
     est suspendu quand l'onglet passe en arrière-plan, et un redimensionnement
     survenu pendant ce temps laisserait les rectangles décalés des visages.
     Quatre écritures de style, le coût est nul. */
  addEventListener('resize', placer, { passive: true });

  // ---- Survol : la zone de la photo et le nom en bas désignent la même personne ----
  function montrer(cle, actif) {
    if (cartes[cle]) cartes[cle].classList.toggle('est-visible', actif);
    if (noms[cle]) noms[cle].classList.toggle('est-actif', actif);
  }
  Object.keys(DECOUPE).forEach(function (cle) {
    [hits[cle], noms[cle]].forEach(function (el) {
      if (!el) return;
      el.addEventListener('mouseenter', function () { montrer(cle, true); });
      el.addEventListener('mouseleave', function () { montrer(cle, false); });
    });
    if (noms[cle]) {
      noms[cle].addEventListener('focusin', function () { montrer(cle, true); });
      noms[cle].addEventListener('focusout', function () { montrer(cle, false); });
    }
    if (hits[cle]) {
      // Cliquer la personne dans la photo ouvre le même profil que son nom.
      hits[cle].addEventListener('click', function () {
        var a = noms[cle] && noms[cle].querySelector('a[href]');
        if (a) a.click();
      });
    }
  });
})();
