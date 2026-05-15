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
     1. NAV CONTEXTUELLE AU SCROLL · DÉSACTIVÉ
     ============================================
     Mode actuel : les liens nav sont visibles dès le top de la page.
     Au scroll, le visuel se transforme en pill compacte (via .scrolled
     géré par main.js), mais les liens restent affichés.
     Ce module ne fait plus que nettoyer la classe .nav--minimal au cas
     où elle traînerait depuis un état précédent.
  */
  (function navContextualCleanup() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    nav.classList.remove('nav--minimal');
  })();

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
     6. MAGNETIC BUTTONS + CURSOR
     ============================================
     - Le bouton .btn-primary[data-cta] est attiré
       vers le curseur quand il s'en approche.
     - Le cursor ring est tiré vers le centre du
       bouton (via CSS variable --cursor-magnet-x/y).
     - Désactivé sur mobile et sans pointer fin.
  */
  (function magnetic() {
    if (REDUCED_MOTION || !hasFinePointer() || isMobile()) return;

    const buttons = document.querySelectorAll('.btn-primary[data-cta]');
    if (!buttons.length) return;

    const PULL = 0.28;          // intensité d'attraction sur le bouton
    const CURSOR_PULL = 0.4;    // intensité de l'attraction du curseur vers le bouton
    const RADIUS = 90;          // px à partir du bord du bouton

    const root = document.documentElement;
    let activeButton = null;

    const reset = (btn) => {
      btn.style.transform = '';
    };

    const clearCursor = () => {
      root.style.setProperty('--cursor-magnet-x', '0px');
      root.style.setProperty('--cursor-magnet-y', '0px');
    };

    document.addEventListener('mousemove', (e) => {
      let foundActive = null;

      buttons.forEach(btn => {
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;

        // Distance au plus proche bord du bouton (pas au centre)
        const halfW = rect.width / 2;
        const halfH = rect.height / 2;
        const edgeX = Math.max(0, Math.abs(dx) - halfW);
        const edgeY = Math.max(0, Math.abs(dy) - halfH);
        const edgeDist = Math.hypot(edgeX, edgeY);

        if (edgeDist < RADIUS) {
          const strength = 1 - Math.min(edgeDist / RADIUS, 1); // 0→1
          // Attraction du bouton vers le curseur
          btn.style.transform = `translate(${dx * PULL * strength}px, ${dy * PULL * strength}px)`;
          foundActive = { btn, dx, dy, strength };
        } else {
          if (btn === activeButton) reset(btn);
        }
      });

      // Cursor magnet : attiré vers le CENTRE du bouton actif
      if (foundActive) {
        // Inverser dx/dy pour attirer le curseur vers le centre, modulé par strength
        const ox = -foundActive.dx * CURSOR_PULL * foundActive.strength;
        const oy = -foundActive.dy * CURSOR_PULL * foundActive.strength;
        root.style.setProperty('--cursor-magnet-x', ox + 'px');
        root.style.setProperty('--cursor-magnet-y', oy + 'px');
        activeButton = foundActive.btn;
      } else if (activeButton) {
        reset(activeButton);
        clearCursor();
        activeButton = null;
      }
    }, { passive: true });

    // Sécurité : si la souris quitte la fenêtre, on reset
    document.addEventListener('mouseleave', () => {
      buttons.forEach(reset);
      clearCursor();
      activeButton = null;
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

      btn.addEventListener('click', () => {
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!isOpen));
        panel.classList.toggle('is-open', !isOpen);

        // Mettre à jour le label du bouton
        const label = btn.querySelector('span');
        if (label) label.textContent = isOpen ? 'Détails' : 'Fermer';
      });
    });
  })();

})();
