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
     1. NAV CONTEXTUELLE AU SCROLL
     ============================================
     - Top de page : nav minimale (logo + CTA)
     - Scroll > 80px : nav complète avec liens
     - Mobile : nav classique, pas de toggle
  */
  (function navContextual() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    const THRESHOLD = 80;
    let minimal = nav.classList.contains('nav--minimal');

    const update = () => {
      if (isMobile()) {
        if (minimal) {
          nav.classList.remove('nav--minimal');
          minimal = false;
        }
        return;
      }

      const shouldBeMinimal = window.scrollY < THRESHOLD;
      if (shouldBeMinimal !== minimal) {
        nav.classList.toggle('nav--minimal', shouldBeMinimal);
        minimal = shouldBeMinimal;
      }
    };

    update();

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update, { passive: true });
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

})();
