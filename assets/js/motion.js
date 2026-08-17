/* ============================================
   SHYFT · MOTION
   ============================================
   Fichier dédié aux nouvelles interactions motion
   (séparé de main.js qui gère le legacy : gooey,
   FAQ, méthode orbitale, etc.)

   Conventions :
   - Tous les modules sont des IIFE indépendantes
   - prefers-reduced-motion respecté partout
   - Mobile (< 880px) : interactions simplifiées
   ============================================ */

(function() {
  'use strict';

  const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const MOBILE_BREAKPOINT = 880;
  const isMobile = () => window.innerWidth < MOBILE_BREAKPOINT;
  const hasFinePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ============================================
     1.b WORD-APPEAR · animation staggerée du h1 hero
     ============================================
     Chaque .word-animate du h1 a un data-delay (ms).
     500ms après le load, on lance pour chaque mot
     une animation 'word-appear' (blur + slide + scale)
     selon son délai propre. Stagger naturel mot par mot.
  */
  (function animateWordAppear() {
    const words = document.querySelectorAll('.word-animate');
    if (!words.length) return;

    if (REDUCED_MOTION) {
      // Reveal immédiat sans animation
      words.forEach(w => {
        w.style.opacity = '1';
        w.style.transform = 'none';
        w.style.filter = 'none';
      });
      return;
    }

    const trigger = () => {
      words.forEach(word => {
        const delay = parseInt(word.dataset.delay, 10) || 0;
        setTimeout(() => {
          word.style.animation = 'word-appear 0.8s ease-out forwards';
        }, delay);
      });
    };

    // Petit délai initial (500ms) pour laisser la nav + le pill s'installer
    setTimeout(trigger, 500);
  })();

  /* ============================================
     2. SPLIT-WORDS sur [data-split]
     ============================================
     Découpe le texte des éléments cibles en spans
     mot-par-mot avec --i pour stagger CSS.
     Préserve les <em>, <br> et autres balises inline.
     IntersectionObserver pour déclencher au scroll.
  */
  (function splitWords() {
    if (REDUCED_MOTION) return; // pas de découpe DOM inutile

    const targets = document.querySelectorAll('[data-split]');
    if (!targets.length) return;

    // Walk récursif : convertit chaque nœud texte en suite de spans .split-word
    // Garde intacts les <em>, <strong>, <br>, etc.
    function walkAndSplit(root) {
      const counter = { i: 0 };

      function walk(node) {
        // Text node
        if (node.nodeType === 3) {
          const text = node.textContent;
          if (!text.trim()) return; // ignore espaces isolés
          const parts = text.split(/(\s+)/);
          const frag = document.createDocumentFragment();
          parts.forEach(part => {
            if (part === '') return;
            if (/^\s+$/.test(part)) {
              frag.appendChild(document.createTextNode(part));
            } else {
              const span = document.createElement('span');
              span.className = 'split-word';
              span.style.setProperty('--i', counter.i++);
              span.textContent = part;
              frag.appendChild(span);
            }
          });
          node.parentNode.replaceChild(frag, node);
        }
        // Element node · recurse, sauf <br>
        else if (node.nodeType === 1 && node.nodeName !== 'BR') {
          // copie de la liste pour éviter mutation pendant l'itération
          Array.from(node.childNodes).forEach(walk);
        }
      }

      Array.from(root.childNodes).forEach(walk);
    }

    targets.forEach(walkAndSplit);

    // Observer pour révéler chaque h2 quand il entre dans le viewport
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(t => io.observe(t));
  })();

  /* ============================================
     3. STAGGER sur [data-stagger]
     ============================================
     Pose une CSS variable --i sur chaque enfant
     direct, pour staggerer les transitions existantes
     (notamment celles de .reveal).
  */
  (function staggerGrids() {
    const grids = document.querySelectorAll('[data-stagger]');
    grids.forEach(grid => {
      Array.from(grid.children).forEach((child, i) => {
        child.style.setProperty('--i', i);
      });
    });
  })();

  /* ============================================
     4. PAGE-PEEL sur [data-peel]
     ============================================
     Sections claires (oxblood→cream) qui se
     "déploient" depuis le haut via clip-path.
  */
  (function pagePeel() {
    if (REDUCED_MOTION) {
      // En mode reduced motion, on retire le clip-path immédiatement
      document.querySelectorAll('[data-peel]').forEach(el => {
        el.classList.add('is-peeled');
      });
      return;
    }

    const peelers = document.querySelectorAll('[data-peel]');
    if (!peelers.length) return;

    // rootMargin positif sur le bas = on déclenche AVANT que la section
    // n'entre dans le viewport. Évite de voir un trou clippé pendant le scroll.
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-peeled');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px 25% 0px' });

    peelers.forEach(p => io.observe(p));
  })();

  /* ============================================
     5. MÉTHODE FLOW · blur-dissolve séquencé
     ============================================
     Quand le bloc "Vous exposez ↓ nous proposons…"
     entre dans le viewport, on ajoute .is-revealed
     et les 7 éléments (4 phrases + 3 flèches) se
     dévoilent en cascade via CSS.
  */
  (function methodeFlow() {
    const flow = document.querySelector('.methode-flow');
    if (!flow) return;

    if (REDUCED_MOTION) {
      flow.classList.add('is-revealed');
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          flow.classList.add('is-revealed');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.25, rootMargin: '0px 0px -10% 0px' });

    io.observe(flow);
  })();

  /* ============================================
     6. MAGNETIC BUTTONS
     ============================================
     Le bouton est attiré vers le curseur quand celui-ci s'en approche.

     Deux principes pour éviter toute sensation de latence :
     - Pendant l'approche, le transform est appliqué à chaque mousemove avec
       une transition quasi nulle : le bouton colle au curseur, il ne traîne pas.
     - Le curseur, lui, n'est jamais déplacé. Il reste exactement sous la souris.
       (C'est l'ancien "cursor magnet", avec sa transition de 0.32s, qui donnait
       l'impression de flottement.)
  */
  (function magnetic() {
    if (REDUCED_MOTION || !hasFinePointer() || isMobile()) return;

    const buttons = document.querySelectorAll('.btn-primary[data-cta]');
    if (!buttons.length) return;

    const PULL = 0.22;    // intensité du déplacement (fraction de la distance)
    const RADIUS = 80;    // px autour du bord du bouton où l'attraction opère
    const MAX = 14;       // px · déplacement maximal, garde la cible atteignable

    const FOLLOW = 'transform 0.08s linear';                        // colle au curseur
    const RETURN = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';  // retour souple

    const active = new Set();

    document.addEventListener('mousemove', (e) => {
      buttons.forEach(btn => {
        const r = btn.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);

        // Distance au bord le plus proche, pas au centre
        const edge = Math.hypot(
          Math.max(0, Math.abs(dx) - r.width / 2),
          Math.max(0, Math.abs(dy) - r.height / 2)
        );

        if (edge < RADIUS) {
          const strength = 1 - edge / RADIUS;
          const ox = Math.max(-MAX, Math.min(MAX, dx * PULL * strength));
          const oy = Math.max(-MAX, Math.min(MAX, dy * PULL * strength));
          btn.style.transition = FOLLOW;
          btn.style.transform = `translate(${ox}px, ${oy}px)`;
          active.add(btn);
        } else if (active.has(btn)) {
          btn.style.transition = RETURN;
          btn.style.transform = '';
          active.delete(btn);
        }
      });
    }, { passive: true });

    // Souris hors fenêtre : on relâche tout
    document.addEventListener('mouseleave', () => {
      active.forEach(btn => {
        btn.style.transition = RETURN;
        btn.style.transform = '';
      });
      active.clear();
    });
  })();

  /* ============================================
     6. PILLARS ORBIT
     ============================================
     Calcule dynamiquement les distances d'orbite
     (--orbit-x, --orbit-y) en fonction des dimensions
     du stage et des cartes satellites. Les keyframes
     CSS utilisent ces variables pour translater les
     satellites de coin en coin.
  */
  (function pillarsOrbit() {
    const stage = document.querySelector('.pillars-orbit');
    if (!stage) return;

    const updateDistances = () => {
      // Sur mobile, le stack vertical désactive l'orbite (cf. CSS @media)
      // On reset quand même pour éviter des valeurs résiduelles incorrectes
      if (window.innerWidth <= 900) {
        stage.style.setProperty('--orbit-x', '0px');
        stage.style.setProperty('--orbit-y', '0px');
        return;
      }

      const satellite = stage.querySelector('.pillar--satellite');
      if (!satellite) return;

      const stageRect = stage.getBoundingClientRect();
      const satRect = satellite.getBoundingClientRect();

      const orbitX = stageRect.width - satRect.width;
      const orbitY = stageRect.height - satRect.height;

      stage.style.setProperty('--orbit-x', orbitX + 'px');
      stage.style.setProperty('--orbit-y', orbitY + 'px');
    };

    // Calcul initial + sur resize (throttled via rAF)
    updateDistances();

    let resizeFrame = null;
    window.addEventListener('resize', () => {
      if (resizeFrame) return;
      resizeFrame = requestAnimationFrame(() => {
        updateDistances();
        resizeFrame = null;
      });
    }, { passive: true });

    // Recalcule aussi après chargement complet (au cas où les fonts modifient les dimensions)
    window.addEventListener('load', updateDistances);
  })();

  /* ============================================
     6.b LOAD CASCADE · réveil progressif au chargement
     ============================================
     Au lieu de tout révéler instantanément (ou de waiter le scroll),
     on déclenche les .reveal / [data-peel] / [data-split] qui sont
     ALREADY visibles au chargement, avec un délai cumulatif top→bottom.
     Effet : la page se "populate" sous les yeux du visiteur en
     ~0.6-0.8 seconde, plutôt qu'apparaître figée ou vide.
  */
  (function loadCascade() {
    if (REDUCED_MOTION) return;

    const isInViewport = (el) => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0 && r.top < window.innerHeight - 20;
    };

    // Selectors à orchestrer + classe à appliquer
    const targets = [
      { sel: '.reveal',     cls: 'in-view' },
      { sel: '[data-peel]', cls: 'is-peeled' },
      { sel: '[data-split]', cls: 'is-revealed' },
    ];

    // Collecte tous les éléments above-fold, dans l'ordre du DOM
    const inViewElements = [];
    targets.forEach(({ sel, cls }) => {
      document.querySelectorAll(sel).forEach(el => {
        if (isInViewport(el)) inViewElements.push({ el, cls });
      });
    });

    if (!inViewElements.length) return;

    // Tri visuel (top → bottom)
    inViewElements.sort((a, b) => a.el.getBoundingClientRect().top - b.el.getBoundingClientRect().top);

    // Pause initiale (laisse la page s'installer) + cascade
    const INITIAL_DELAY = 180;     // ms avant le 1er élément
    const STEP = 95;               // ms entre chaque élément

    inViewElements.forEach(({ el, cls }, i) => {
      setTimeout(() => {
        el.classList.add(cls);
      }, INITIAL_DELAY + i * STEP);
    });
  })();

  /* ============================================
     7. PILLARS ACCORDION
     ============================================
     Toggle des détails de chaque pilier au clic
     sur le bouton "Détails". Animation max-height
     gérée via classe .is-open (CSS handles transition).
  */
  (function pillarsAccordion() {
    const toggles = document.querySelectorAll('.pillar-toggle');
    if (!toggles.length) return;

    toggles.forEach(btn => {
      const targetId = btn.getAttribute('aria-controls');
      if (!targetId) return;
      const panel = document.getElementById(targetId);
      if (!panel) return;

      // État initial : panel masqué, attribut hidden retiré pour permettre l'animation
      panel.removeAttribute('hidden');

      // Fonction de toggle réutilisable (appelée par le bouton OU par le bloc entier)
      // Les cartes sont positionnées en absolu dans un conteneur a ratio fixe :
      // une carte depliee debordait par-dessus la section suivante. On mesure
      // le debordement reel et on allonge le conteneur d'autant, ce qui pousse
      // le bloc « Pas sur de ce qu'il vous faut ? » vers le bas.
      const ajusterHauteur = () => {
        const stage = document.querySelector('.pillars-orbit');
        if (!stage) return;
        stage.style.paddingBottom = '';
        const ouverte = stage.querySelector('.pillar-details.is-open');
        stage.classList.toggle('has-open', !!ouverte);
        if (!ouverte) return;
        const carte = ouverte.closest('.pillar').getBoundingClientRect();
        const debord = carte.bottom - stage.getBoundingClientRect().bottom;
        if (debord > 0) stage.style.paddingBottom = Math.ceil(debord + 24) + 'px';
      };

      const togglePanel = () => {
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!isOpen));
        panel.classList.toggle('is-open', !isOpen);
        const label = btn.querySelector('span');
        if (label) label.textContent = isOpen ? 'Détails' : 'Fermer';
        setTimeout(ajusterHauteur, 30);
        setTimeout(ajusterHauteur, 420);
      };

      // Clic sur le bouton "Détails" classique
      btn.addEventListener('click', (e) => {
        e.stopPropagation(); // évite que le clic remonte au .pillar et double-toggle
        togglePanel();
      });

      // Clic n'importe où sur le bloc .pillar → toggle aussi
      // Exclut les clics sur des liens internes (h3 a, .pillar-cta) qui doivent naviguer.
      const pillar = btn.closest('.pillar');
      const panelLink = panel.querySelector('.pillar-cta');

      if (pillar) {
        pillar.style.cursor = 'pointer';
        pillar.addEventListener('click', (e) => {
          // Si on a cliqué sur un lien (ou un descendant d'un lien), on laisse la navigation se faire
          if (e.target.closest('a')) return;

          // Une fois le panneau ouvert, tout clic dans la zone dépliée mène
          // à la page du pilier : la carte bouge (orbite), viser le petit
          // lien « En savoir plus » était trop difficile.
          const dansLePanneau = panel.contains(e.target);
          const estOuvert = btn.getAttribute('aria-expanded') === 'true';
          if (dansLePanneau && estOuvert && panelLink) {
            window.location.href = panelLink.href;
            return;
          }

          togglePanel();
        });
        // Accessibilité clavier : Enter / Espace ouvrent aussi
        pillar.setAttribute('tabindex', '0');
        pillar.setAttribute('role', 'button');
        pillar.setAttribute('aria-expanded', 'false');
        pillar.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            if (e.target.closest('a')) return;
            e.preventDefault();
            togglePanel();
            pillar.setAttribute('aria-expanded', btn.getAttribute('aria-expanded'));
          }
        });
      }
    });
  })();

})();
