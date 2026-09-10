/* ============================================
   FICHES ÉQUIPE · source unique
   Lues par la modale de /agence et par l'aperçu au survol de la photo
   d'équipe sur l'accueil. Un parcours qui change ne se corrige qu'ici.
   Chargé en script bloquant AVANT les scripts qui s'en servent.
   ============================================ */
window.SHYFT_PROFILS = {
    laurent: {
      photo: 'assets/img/laurent.jpeg',
      nom: 'Laurent Mur',
      role: 'Directeur marketing &amp; digital',
      lieu: 'France',
      bio: "Il définit la stratégie et la met en œuvre lui-même, rédaction et design compris, puis transmet les méthodes aux équipes internes. Vingt-cinq ans de direction marketing en pharma, retail, finance et énergie.",
      blocs: [
        { titre: 'En parallèle', lignes: [
          { titre: 'Directeur marketing freelance', meta: 'Conseil et accompagnement opérationnel · depuis 2020' }
        ]}
      ],
      tagsTitre: 'Il intervient sur',
      tags: ['Positionnement', 'Stratégie digitale', 'Plan marketing', 'KPI &amp; pilotage'],
      linkedin: 'https://www.linkedin.com/in/laurent-mur/'
    },
    'anne-carole': {
      photo: 'assets/img/anne-carole.jpeg',
      nom: 'Anne-Carole Mur',
      role: 'Marketing · Project management',
      lieu: 'France',
      bio: "Vingt ans de marketing et de relation client, d'abord chez Cofidis, puis à la direction de la communication de Gaarden. Elle coordonne les projets Shyft et arbitre les directions créatives.",
      blocs: [
        { titre: 'En parallèle', lignes: [
          { titre: 'Consultante marketing', meta: 'Indépendante' }
        ]},
        { titre: 'Parcours', lignes: [
          { titre: 'Direction communication &amp; relation client', meta: 'Gaarden · 2015-2020' },
          { titre: 'Marketing', meta: 'Cofidis · 1996-2007' }
        ]}
      ],
      tagsTitre: 'Elle intervient sur',
      tags: ['Direction artistique', 'Pilotage de projet', 'Relation client'],
      linkedin: 'https://www.linkedin.com/in/anne-carole-mur-6aa54679/'
    },
    noe: {
      photo: 'assets/img/noe.jpeg',
      nom: 'Noé Mur',
      role: 'Marketing digital &amp; acquisition',
      lieu: 'France',
      bio: "SEO, LinkedIn, emailing, CRM : il construit les dispositifs qui font venir les prospects et mesure ce qu'ils rapportent. Fondateur de Sorell, un outil de veille sectorielle pour dirigeants.",
      blocs: [
        { titre: 'En parallèle', lignes: [
          { logo: 'black-moutons.png', alt: 'Les Blacks Moutons',
            titre: 'Chef de projets marketing et digital', meta: 'Les Blacks Moutons · depuis 2026' },
          { logo: 'sorell.png', alt: 'Sorell', carre: true, lien: 'https://sorell.fr/',
            titre: 'Fondateur', meta: 'Sorell · Veille sectorielle automatisée' }
        ]},
        { titre: 'Formation', lignes: [
          { logo: 'iseg.png', alt: 'ISEG', carre: true,
            titre: 'Master Marketing, Brand Management &amp; Innovation', meta: 'ISEG · 2026-2028' }
        ]}
      ],
      tagsTitre: 'Il intervient sur',
      tags: ['Acquisition', 'SEO &amp; contenu', 'CRM &amp; automation'],
      linkedin: 'https://www.linkedin.com/in/noe-mur/'
    },
    matis: {
      photo: 'assets/img/matis.jpeg',
      nom: 'Matis Mur',
      role: 'UX/UI designer &amp; développeur full stack',
      lieu: 'France',
      bio: "Ingénieur santé et innovation, diplômé d'un MBA management et stratégie. Il conçoit les interfaces et développe les sites Shyft, du premier wireframe jusqu'à la mise en production.",
      blocs: [
        { titre: 'En parallèle', lignes: [
          { logo: 'onepoint.png', alt: 'onepoint',
            titre: 'Associate, AI Builder', meta: 'onepoint · Agentic Studio · depuis 2026' },
          { logo: 'classif-ai.png', alt: 'Classif.ai', lien: 'https://www.classif-ai.fr/',
            titre: 'Fondateur', meta: 'Classif.ai · Classification automatique de documents par IA' }
        ]},
        { titre: 'Formation', lignes: [
          { logo: 'iae-sorbonne.png', alt: 'IAE Paris · Université Paris 1 Panthéon-Sorbonne', carre: true,
            titre: 'MBA management &amp; stratégie', meta: 'IAE Paris · Panthéon-Sorbonne · 2026-2027' },
          { logo: 'ece.png', alt: 'ECE Paris',
            titre: 'Ingénieur santé &amp; innovation', meta: 'ECE Paris · 2020-2025' }
        ]}
      ],
      tagsTitre: 'Il intervient sur',
      tags: ["Design d'interface", 'Développement', 'Performance'],
      linkedin: 'https://www.linkedin.com/in/matis-mur/'
    }
  };
