/* ============================================================
   Endos · Démonstration Shyft, entreprise fictive
   Interactions : menu mobile, onglets, compteurs, révélations.
   Vanilla, sans dépendance. Tout est progressif : sans JS,
   la page reste entièrement lisible.
   ============================================================ */

(function () {
  'use strict';

  var MOUVEMENT_REDUIT = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- En-tête compacté au défilement ---------- */
  (function () {
    var entete = document.querySelector('.entete');
    if (!entete) return;
    var enAttente = false;

    var appliquer = function () {
      entete.classList.toggle('reduite', window.scrollY > 24);
      enAttente = false;
    };

    appliquer();
    window.addEventListener('scroll', function () {
      if (enAttente) return;
      enAttente = true;
      requestAnimationFrame(appliquer);
    }, { passive: true });
  })();

  /* ---------- Tracés des graphiques à l'entrée dans le viewport ---------- */
  (function () {
    var graphes = document.querySelectorAll('.console-visuel');
    if (!graphes.length) return;

    if (MOUVEMENT_REDUIT || !('IntersectionObserver' in window)) {
      graphes.forEach(function (g) { g.classList.add('dessine'); });
      return;
    }

    var io = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (entree) {
        if (entree.isIntersecting) {
          entree.target.classList.add('dessine');
          io.unobserve(entree.target);
        }
      });
    }, { threshold: 0.4 });
    graphes.forEach(function (g) { io.observe(g); });
  })();

  /* ---------- Menu mobile ---------- */
  (function () {
    var burger = document.querySelector('.entete-burger');
    var menu = document.getElementById('menuMobile');
    if (!burger || !menu) return;

    var fermer = function () {
      menu.hidden = true;
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Ouvrir le menu');
    };

    burger.addEventListener('click', function () {
      var ouvert = !menu.hidden;
      if (ouvert) { fermer(); return; }
      menu.hidden = false;
      burger.setAttribute('aria-expanded', 'true');
      burger.setAttribute('aria-label', 'Fermer le menu');
    });

    menu.querySelectorAll('a').forEach(function (lien) {
      lien.addEventListener('click', fermer);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') fermer();
    });
  })();

  /* ---------- Onglets accessibles (profils) ---------- */
  (function () {
    var zone = document.querySelector('[data-onglets]');
    if (!zone) return;

    var onglets = Array.prototype.slice.call(zone.querySelectorAll('[role="tab"]'));

    var activer = function (onglet) {
      onglets.forEach(function (o) {
        var actif = o === onglet;
        o.setAttribute('aria-selected', String(actif));
        o.tabIndex = actif ? 0 : -1;
        var panneau = document.getElementById(o.getAttribute('aria-controls'));
        if (panneau) panneau.hidden = !actif;
      });
      onglet.focus();
    };

    onglets.forEach(function (onglet, i) {
      onglet.addEventListener('click', function () { activer(onglet); });
      onglet.addEventListener('keydown', function (e) {
        var cible = null;
        if (e.key === 'ArrowRight') cible = onglets[(i + 1) % onglets.length];
        if (e.key === 'ArrowLeft')  cible = onglets[(i - 1 + onglets.length) % onglets.length];
        if (e.key === 'Home')       cible = onglets[0];
        if (e.key === 'End')        cible = onglets[onglets.length - 1];
        if (cible) { e.preventDefault(); activer(cible); }
      });
    });
  })();

  /* ---------- Compteurs animés à l'entrée dans le viewport ---------- */
  (function () {
    var compteurs = document.querySelectorAll('[data-compteur]');
    if (!compteurs.length) return;

    var formater = function (valeur, decimales) {
      return valeur.toLocaleString('fr-FR', {
        minimumFractionDigits: decimales,
        maximumFractionDigits: decimales
      });
    };

    var figer = function (el) {
      var cible = parseFloat(el.dataset.compteur);
      var decimales = parseInt(el.dataset.decimales || '0', 10);
      el.textContent = formater(cible, decimales) + (el.dataset.suffixe || '');
    };

    if (MOUVEMENT_REDUIT || !('IntersectionObserver' in window)) {
      compteurs.forEach(figer);
      return;
    }

    var animer = function (el) {
      var cible = parseFloat(el.dataset.compteur);
      var decimales = parseInt(el.dataset.decimales || '0', 10);
      var suffixe = el.dataset.suffixe || '';
      var DUREE = 1200;
      var debut = null;

      var pas = function (temps) {
        if (debut === null) debut = temps;
        var avancement = Math.min((temps - debut) / DUREE, 1);
        // Décélération douce : la fin du comptage se pose au lieu de claquer
        var facteur = 1 - Math.pow(1 - avancement, 3);
        el.textContent = formater(cible * facteur, decimales) + suffixe;
        if (avancement < 1) requestAnimationFrame(pas);
      };
      requestAnimationFrame(pas);
    };

    var io = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (entree) {
        if (entree.isIntersecting) {
          animer(entree.target);
          io.unobserve(entree.target);
        }
      });
    }, { threshold: 0.5 });

    compteurs.forEach(function (el) { io.observe(el); });
  })();

  /* ---------- Révélations discrètes au défilement ----------
     La classe .reveler n'est posée que par JS : sans script,
     aucun contenu n'est masqué. */
  (function () {
    if (MOUVEMENT_REDUIT || !('IntersectionObserver' in window)) return;

    var cibles = document.querySelectorAll(
      '.section-tete, .carte, .ressource, .onglets, .api-texte, .api-code, .chiffre, .cta-final-inner, .console-visuel, .console-texte'
    );

    var io = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (entree) {
        if (entree.isIntersecting) {
          entree.target.classList.add('visible');
          io.unobserve(entree.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    cibles.forEach(function (el) {
      // Pas d'effet sur ce qui est déjà à l'écran au chargement
      if (el.getBoundingClientRect().top < window.innerHeight) return;
      el.classList.add('reveler');
      io.observe(el);
    });
  })();

})();
