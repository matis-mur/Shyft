# PAGES.md — Spécifications page par page pour Shyft

> **Site actuel** : https://matis-mur.github.io/Shyft/
> **Principe** : ce document décrit chaque page à créer en détail. Chaque page est autonome : tu peux dire à Claude Code "fais-moi la page X" en pointant directement la section correspondante.

---

## 📋 Sommaire

### Vague 1 — Pages indispensables
- [Page Contact](#page-contact)
- [Page Mentions légales](#page-mentions-légales)
- [Page CGV](#page-cgv)

### Vague 2 — Pages secteurs (6 pages)
- [Page Retail & distribution](#page-retail--distribution)
- [Page Santé · Pharma · Dermo-cosmétique](#page-santé--pharma--dermo-cosmétique)
- [Page Services financiers & paiement](#page-services-financiers--paiement)
- [Page IT, logiciels & SaaS](#page-it-logiciels--saas)
- [Page Énergies renouvelables](#page-énergies-renouvelables)
- [Page Conseil B2B & services aux entreprises](#page-conseil-b2b--services-aux-entreprises)

### Vague 3 — Pages piliers (5 pages)
- [Page Stratégie](#page-stratégie)
- [Page Identité](#page-identité)
- [Page Site web](#page-site-web)
- [Page Acquisition](#page-acquisition)
- [Page Pilotage](#page-pilotage)

---

## 🎨 RÈGLES TRANSVERSALES (à respecter sur TOUTES les pages)

### Stack technique
- HTML / CSS / JS vanilla (pas de framework)
- Réutilisation maximale du `styles.css` existant
- Création d'un `secteurs.css` pour la vague 2
- Création d'un `piliers.css` pour la vague 3

### Éléments à reprendre de la home sur chaque page
- Header / nav (identique partout)
- Footer (identique partout)
- Curseur custom or
- Grain papier global
- Smooth scroll (Lenis.js si déjà installé)
- Filtres SVG (gooey, etc.) en début de body

### Conventions de nommage
- URLs en kebab-case et en français : `/secteurs/sante-pharma.html`, `/piliers/site-web.html`
- Classes CSS : préfixes par section (`.secteur-hero`, `.pilier-hero`)
- Classes de modificateurs : `.is-pharma`, `.is-retail` sur `<body>` pour bascule de couleur

### Système de couleurs d'accent par secteur (CSS Variables)
Garder la palette Shyft (Oxblood + Or + Crème) **partout**. Ne changer **qu'une variable** `--accent` par secteur :

```css
.secteur-page { --accent: var(--oxblood); /* fallback */ }
.secteur-page.is-retail { --accent: #D97A2C; }     /* Orange ambré */
.secteur-page.is-pharma { --accent: #4A8FB8; }     /* Bleu ciel */
.secteur-page.is-finance { --accent: #1E4A6E; }    /* Bleu pétrole */
.secteur-page.is-it-saas { --accent: #6B4FCF; }    /* Violet électrique */
.secteur-page.is-energies { --accent: #4F7F5C; }   /* Vert sauge */
.secteur-page.is-conseil { --accent: #7A2E3F; }    /* Bordeaux profond */
```

⚠️ La couleur `--accent` ne remplace JAMAIS l'or (`--gold`) sur les CTAs primaires. L'or reste la couleur d'action partout. L'accent ne sert que pour : overlay hero, filets, badges secondaires, puces.

### Accessibilité
- `prefers-reduced-motion` respecté partout
- `:focus-visible` avec outline or
- `alt` sur toutes les images
- `aria-label` sur les liens icônes

### SEO de chaque page
- `<title>` unique et descriptif
- `<meta description>` unique de 150-160 caractères
- Open Graph complet (`og:title`, `og:description`, `og:image`, `og:type`)
- Balise canonique
- Schéma JSON-LD `Organization` ou `Service` selon page

### Performance
- Images en format WebP avec fallback JPG si possible
- Lazy-loading sur toutes les images sous le hero
- Lighthouse 90+ obligatoire

### Mobile
- Responsive parfait, mobile-first
- Curseur custom désactivé sur tactile
- Nav burger sur mobile

---

# VAGUE 1 — PAGES INDISPENSABLES

---

## Page Contact

**URL** : `/contact.html`
**Title** : `Contact · Shyft® · Parlons de votre projet`
**Meta description** : `Échange de 30 minutes pour comprendre votre situation. Sans engagement, sans devis surprise. Réponse sous 24h ouvrées.`

### Structure de la page

#### 1. Header (identique à la home)

#### 2. Hero contact
- **Eyebrow** : `Nous contacter`
- **Titre** : `Parlons de votre projet.`
- **Sous-titre** : `Un échange de 30 minutes pour comprendre votre situation, vous dire honnêtement si nous sommes les bons interlocuteurs, et — si oui — vous proposer la voie la plus directe.`
- Layout : centré, fond Oxblood profond, hauteur réduite (pas pleine page comme la home)

#### 3. Bloc des 3 garanties
3 colonnes avec une icône simple (or) + titre + description courte :
- **Sans engagement** — Le premier échange n'engage à rien. Vous repartez avec une vision claire, même si vous ne signez pas.
- **Sans devis surprise** — Si nous travaillons ensemble, le devis est complet et plafonné dès le départ. Pas de coûts cachés.
- **Réponse sous 24h ouvrées** — Vous écrivez aujourd'hui, vous avez un retour demain.

#### 4. Formulaire complet (côté gauche)
**Layout** : grille 2 colonnes desktop (formulaire à gauche 60%, contact alternatif à droite 40%). Stack mobile.

**Champs du formulaire** (dans cet ordre) :
1. Prénom* (text, required)
2. Nom* (text, required)
3. Email professionnel* (email, required)
4. Société* (text, required)
5. Secteur d'activité* (dropdown) — options : Retail & distribution / Santé · Pharma / Finance · Paiement / IT · SaaS / Énergies / Conseil B2B / Autre
6. Vous êtes* (dropdown) — options : Dirigeant·e / Marketing · Communication / Commercial / Autre
7. Téléphone (tel, optionnel)
8. Site actuel (url, optionnel) — placeholder `https://`
9. Périmètre envisagé (multi-select checkboxes) — Stratégie / Identité / Site web / Acquisition / Pilotage
10. Budget envisagé* (dropdown) — Moins de 5 000€ / 5 000 - 15 000€ / 15 000 - 30 000€ / Plus de 30 000€ / À définir
11. Échéance souhaitée* (dropdown) — Sous 1 mois / 1 à 3 mois / 3 à 6 mois / Pas de date arrêtée
12. Message libre* (textarea, required, placeholder : `Parlez-nous de votre activité, de votre projet, de votre échéance…`)

**Mentions RGPD** sous le formulaire (petit texte, opacité 0.6) :
`En soumettant ce formulaire, vous acceptez que Shyft utilise les coordonnées fournies pour vous recontacter au sujet de votre projet. Aucune donnée ne sera partagée. Vous pouvez demander leur suppression à tout moment.`

**CTA primaire** : `Envoyer mon message →` (or, large)

#### 5. Bloc "Autres moyens" (côté droit, sticky en desktop)
- **Titre** : `Ou directement par e-mail`
- Email obfusqué (anti-spam JS, technique data-attribute)
- **LinkedIn** : lien vers le profil pro de Shyft
- **Disponibilité** : "● Disponible — Q3 2026" (point or qui pulse)
- Photo de l'équipe (petite vignette ronde, 3 visages)

#### 6. Bloc FAQ courte (3 questions)
Reprend le pattern de la FAQ home, mais 3 questions ciblées sur le premier contact :
- **01** — Combien de temps pour avoir un retour après l'envoi du formulaire ?
- **02** — Faut-il préparer quelque chose avant le premier appel ?
- **03** — Que se passe-t-il après le premier échange ?

#### 7. Footer (identique à la home)

### Notes techniques
- Validation HTML5 native + JS pour les multi-select
- Submission : pour l'instant, formulaire vers un mailto: avec corps pré-rempli, OU vers un service tiers (Formspree, Web3Forms) — à valider avec Matis
- Email à obfusquer en JS pour éviter le spam
- Pas de captcha pour l'instant (à voir si spam)

---

## Page Mentions légales

**URL** : `/mentions-legales.html`
**Title** : `Mentions légales · Shyft®`
**Meta description** : `Mentions légales du site Shyft. Éditeur, hébergeur, propriété intellectuelle, données personnelles.`

### Structure de la page

#### 1. Header (identique à la home)

#### 2. Hero mentions légales
- **Eyebrow** : `Informations légales`
- **Titre** : `Mentions légales`
- **Sous-titre** : `Conformément à la loi pour la confiance dans l'économie numérique du 21 juin 2004 (LCEN).`
- Hauteur réduite, fond Oxblood profond
- Date de dernière mise à jour à droite

#### 3. Corps de page — Sections numérotées
Layout : conteneur étroit (max-width 760px), centré, fond Oxblood, texte crème.

Chaque section : titre numéroté en or + corps de texte.

##### 01. Éditeur du site
```
Shyft®
Statut juridique : [À COMPLÉTER par Laurent — SAS / SASU / SARL / Auto-entreprise]
Capital social : [À COMPLÉTER]
SIRET : [À COMPLÉTER]
RCS : [À COMPLÉTER]
N° TVA intracommunautaire : [À COMPLÉTER]
Siège social : [À COMPLÉTER]
Téléphone : [À COMPLÉTER]
Email : contact@shyft.studio (obfusqué)
```

##### 02. Directeur de la publication
```
[Nom du directeur de la publication — à compléter par Laurent]
```

##### 03. Hébergeur du site
```
GitHub Pages
GitHub, Inc.
88 Colin P. Kelly Jr. Street
San Francisco, CA 94107, États-Unis
https://github.com
```

⚠️ Si le site est migré ailleurs après, mettre à jour cette section.

##### 04. Propriété intellectuelle
Texte standard : tout le contenu (textes, images, logos, code, design) est la propriété exclusive de Shyft® ou de ses partenaires. Toute reproduction, représentation, modification, publication, transmission, dénaturation, totale ou partielle, est interdite sans autorisation écrite préalable.

##### 05. Données personnelles
Conformité au RGPD :
- Responsable du traitement : Shyft
- Finalités : réponse aux demandes de contact, gestion commerciale
- Base légale : consentement et intérêt légitime
- Durée de conservation : 3 ans à compter du dernier contact
- Droits : accès, rectification, effacement, opposition, portabilité (à exercer via contact@shyft.studio)
- Droit de réclamation auprès de la CNIL

##### 06. Cookies
Pour l'instant : Shyft n'utilise pas de cookies non essentiels (pas de tracking, pas d'analytics tiers). Si ça change → mettre à jour.

##### 07. Crédits
```
Conception, design et développement : Shyft®
Typographies : Satoshi, General Sans (Fontshare), Fraunces, JetBrains Mono (Google Fonts)
```

##### 08. Droit applicable
```
Le présent site est régi par le droit français. Tout litige relatif à 
son utilisation relève de la compétence exclusive des tribunaux 
français compétents.
```

#### 4. Footer (identique à la home)

### Notes techniques
- Texte légal en `font-body`, taille normale, line-height généreux (1.7)
- Numérotation des sections en `font-mono` or
- Pas d'animations lourdes sur cette page (sobre)
- ⚠️ **Cette page ne peut pas aller en ligne tant que les infos juridiques ne sont pas complétées** (Laurent doit fournir SIRET, statut, etc.)

---

## Page CGV

**URL** : `/cgv.html`
**Title** : `Conditions Générales de Vente · Shyft®`
**Meta description** : `Conditions générales de vente de Shyft. Prestations, tarifs, livraison, propriété intellectuelle, responsabilité.`

### Structure de la page

#### 1. Header (identique à la home)

#### 2. Hero CGV
- **Eyebrow** : `Conditions Générales de Vente`
- **Titre** : `Conditions générales de vente`
- **Sous-titre** : `Applicables à toutes les prestations Shyft. En vigueur depuis le [DATE — à compléter].`
- Hauteur réduite, fond Oxblood profond

#### 3. Corps des CGV
Layout : conteneur étroit (max-width 760px), centré.

Sections numérotées :

##### Article 1 — Objet
Les présentes CGV régissent les relations contractuelles entre Shyft® (ci-après "le Prestataire") et toute personne morale ou physique souscrivant à une prestation (ci-après "le Client").

##### Article 2 — Prestations
Le Prestataire propose les prestations suivantes :
- Conception et développement de sites web sur-mesure
- Identité visuelle (logo, charte graphique, déclinaisons)
- Stratégie de marque et de positionnement
- Acquisition de leads (SEO, GEO, cold emailing, campagnes payantes)
- Pilotage marketing externalisé
- Audit digital

Chaque prestation fait l'objet d'un devis détaillé spécifique.

##### Article 3 — Devis et commande
Tout devis est valable 30 jours à compter de sa date d'émission. La commande est ferme dès la signature du devis et le versement de l'acompte prévu. Aucune prestation n'est engagée avant ces deux conditions.

##### Article 4 — Tarifs et modalités de paiement
- Tarifs HT, à majorer de la TVA en vigueur
- Pour les prestations one-shot (sites web, identité) : acompte de 40% à la commande, 30% à la validation des maquettes, 30% à la livraison
- Pour les prestations récurrentes (acquisition, pilotage) : facturation mensuelle, paiement à 30 jours fin de mois
- Tout retard de paiement entraîne des pénalités au taux légal en vigueur (3 fois le taux d'intérêt légal) et une indemnité forfaitaire de recouvrement de 40€ (article L.441-10 du Code de commerce)

##### Article 5 — Délais
Les délais de livraison sont **indicatifs** et précisés sur chaque devis. Si un retard de notre fait dépasse 30% du délai prévu, un avoir commercial pourra être accordé selon les circonstances. Aucun retard imputable au Client (validations, contenus manquants) ne peut être reproché au Prestataire.

##### Article 6 — Obligations du Client
Le Client s'engage à :
- Fournir tous les éléments nécessaires (textes, images, accès) dans les délais convenus
- Valider les livrables intermédiaires dans un délai maximum de 5 jours ouvrés
- Désigner un interlocuteur unique pour les échanges
- Régler les factures aux échéances prévues

##### Article 7 — Propriété intellectuelle
Une fois le paiement intégral effectué, le Client devient propriétaire :
- Du code source du site livré (transmis sous archive)
- Des fichiers sources d'identité visuelle (logo, charte)
- Des contenus produits dans le cadre de la mission

Le Prestataire conserve le droit de mentionner le projet dans son portfolio, sauf accord contraire écrit. Avant paiement intégral, l'ensemble des productions reste la propriété de Shyft.

##### Article 8 — Hébergement et maintenance
L'hébergement n'est pas inclus par défaut. Si demandé, il fait l'objet d'un contrat distinct. La maintenance corrective (suivi 30 jours post-livraison) est incluse dans le forfait site web. La maintenance évolutive (ajout de contenus, mises à jour) fait l'objet d'un contrat séparé.

##### Article 9 — Confidentialité
Le Prestataire s'engage à conserver confidentielles toutes les informations dont il aurait connaissance dans le cadre de la mission, pendant la durée de celle-ci et pendant 3 ans après son terme.

##### Article 10 — Limitation de responsabilité
Le Prestataire est soumis à une obligation de moyens, pas de résultat. Sa responsabilité ne peut être engagée :
- Pour les conséquences indirectes (perte de chiffre d'affaires, perte de clientèle)
- En cas de force majeure
- En cas de mauvaise utilisation des livrables par le Client
- En cas de modification des livrables par un tiers

En tout état de cause, la responsabilité du Prestataire est plafonnée au montant TTC de la mission concernée.

##### Article 11 — Résiliation
En cas de manquement grave par l'une des parties, l'autre peut résilier le contrat après mise en demeure restée infructueuse pendant 15 jours. Les prestations exécutées restent dues.

##### Article 12 — Droit applicable et juridiction
Les présentes CGV sont régies par le droit français. Tout litige sera de la compétence exclusive des tribunaux français compétents, après tentative de règlement amiable.

#### 4. Footer (identique à la home)

### Notes techniques
- ⚠️ **CES CGV DOIVENT ÊTRE RELUES PAR UN JURISTE** avant publication. Le contenu ci-dessus est un squelette standard, pas un texte légal validé.
- Texte standard, pas d'animations lourdes
- Mention "Dernière mise à jour : [DATE]" en haut

---

# VAGUE 2 — PAGES SECTEURS (6 pages)

## 🎨 STRUCTURE COMMUNE À TOUTES LES PAGES SECTEURS

Toutes les pages secteurs suivent la **même architecture** :

1. **Header** (identique home)
2. **Hero secteur** avec grosse photo + overlay couleur d'accent
3. **Bandeau de logos** (3-4 logos pertinents du secteur)
4. **Section "Les enjeux du secteur"** (3 enjeux)
5. **Section "Ce que nous apportons"** (3-4 leviers)
6. **Stats chiffrées** (reprendre celles de la home)
7. **Section "Cas d'usage"** (2 mini-cas anonymisés)
8. **FAQ secteur** (3 questions spécifiques)
9. **CTA final**
10. **Footer** (identique home)

### Style du Hero secteur (commun)
- Hauteur : 80vh (plus court que le hero home)
- Grosse photo en background, ratio paysage
- Overlay couleur d'accent en 60-70% opacité (gradient diagonal : `--accent` → `--accent` foncé)
- Titre en `--cream`, gros
- Sous-titre en `--cream` opacité 0.85
- CTA primaire or, classique
- Eyebrow en `--accent` sur fond crème en pastille (badge)

### Style des logos (commun)
- 3-4 logos par secteur, en monochrome `--cream` opacité 0.65
- Au survol : couleur d'origine + opacité 1
- Disposition : ligne unique sur desktop, 2 lignes sur mobile

---

## Page Retail & distribution

**URL** : `/secteurs/retail.html`
**Body class** : `secteur-page is-retail`
**Couleur d'accent** : `#D97A2C` (Orange ambré)

**Title** : `Sites web pour le retail · Shyft® · Acquisition et conversion retail`
**Meta description** : `Sites web et stratégies d'acquisition pour retailers et distributeurs. Productivité marketing +40 à 70%. Expertise Auchan, Decathlon, Castorama, Leroy Merlin.`

### Contenu détaillé

#### Hero
- **Photo background** : `/assets/img/secteurs/retail-hero.jpg` (ambiance : magasin retail moderne, scène de shopping, ou rayons de magasin lifestyle)
- **Eyebrow** : `Retail & distribution`
- **Titre** : `Le digital qui *rentabilise* chaque visite.`
- **Sous-titre** : `Sites web et systèmes d'acquisition pour retailers et distributeurs. Conçus pour transformer l'omnicanal en avantage concurrentiel, dans des marchés où chaque euro marketing compte.`
- **CTA** : `Parlons de votre projet retail →`

#### Bandeau logos
- Texte d'intro : `Notre direction stratégie a piloté des marques retail leaders :`
- **Logos** : Auchan, Decathlon, Castorama, Leroy Merlin

#### Section "Les enjeux du retail"
**Titre** : `Trois pressions, *un seul* terrain.`

3 enjeux :
1. **La pression sur les marges**
   - La concurrence pure-player rogne les marges. Chaque euro marketing doit être justifié par un retour mesurable. Plus de place pour les budgets "image" non traçables.

2. **L'orchestration omnicanale**
   - Magasin, site, app, marketplace, réseaux : le client passe d'un canal à l'autre. Votre stratégie doit suivre — ou anticiper — ces parcours, sans rupture d'expérience.

3. **L'acquisition coûteuse, la fidélisation cruciale**
   - Conquérir un nouveau client coûte 5 à 7 fois plus qu'en fidéliser un existant. Votre dispositif digital doit faire les deux, en même temps.

#### Section "Ce que nous apportons"
**Titre** : `Notre méthode appliquée au retail.`

4 leviers (cartes en grille) :
1. **Refonte des parcours conversion**
   - Audit des tunnels (e-commerce ou lead gen), élimination des frictions, A/B testing systématique. Objectif : passer le taux de conversion au-dessus de la moyenne sectorielle.

2. **Acquisition omnicanale**
   - SEO local + Google Shopping + Meta Ads + Email retention. Une vue unifiée des dépenses et des conversions, pas une superposition d'agences.

3. **Tableaux de bord business**
   - CA, panier moyen, taux de conversion, coût d'acquisition, valeur client : suivi mensuel transmis à la direction, sans jargon marketing.

4. **Optimisation du contenu produit**
   - Fiches produits qui vendent, copywriting orienté conversion, structuration SEO pour Google Shopping et marketplaces.

#### Stats secteur
- **+40 à 70%** — Productivité marketing
- **×2 à 3** — Clients ambassadeurs
- **−15 à 25%** — Coût d'acquisition

#### Cas d'usage
**Titre** : `Deux exemples *concrets*.`

**Cas 1** :
- Titre : `Enseigne de bricolage régionale, 8 magasins`
- Situation : *Site vitrine sans conversion, dépendance totale au trafic physique. Pas de visibilité sur le ROI marketing.*
- Action : *Refonte du site avec parcours "trouvez votre magasin + produit dispo", mise en place du SEO local, campagnes Google Shopping ciblées.*
- Résultat : *+58% de trafic qualifié, +32% de visites en magasin trackées en 6 mois.*

**Cas 2** :
- Titre : `Marque de produits bien-être, distribution sélective`
- Situation : *Concurrence pure-player féroce, marges sous pression, image vieillissante.*
- Action : *Refonte de l'identité, site e-shop premium, stratégie d'email marketing automation, contenu éditorial.*
- Résultat : *Panier moyen +24%, taux de réachat ×2.1 sur 12 mois.*

#### FAQ secteur
1. **Travaillez-vous avec des marketplaces (Amazon, Cdiscount, etc.) ?**
   *Notre expertise porte sur votre site propriétaire et vos canaux directs. Nous orchestrons les marketplaces dans une stratégie d'ensemble, mais nous ne sommes pas spécialistes du "marketplace management" pur.*

2. **Pouvez-vous gérer un catalogue de plusieurs milliers de références ?**
   *Oui, à condition que la structuration produit (PIM, flux) soit propre côté client. Nous nous assurons que la couche web/marketing exploite ce catalogue au mieux.*

3. **Combien de temps pour voir des résultats sur l'acquisition ?**
   *Sur du payant (Google, Meta) : 2 à 4 semaines pour les premiers signaux. Sur du SEO : 3 à 6 mois pour les premiers impacts significatifs.*

#### CTA final
- Titre : `Un projet retail à structurer ?`
- Sous-titre : `Un échange de 30 minutes pour évaluer où vous gagneriez le plus à concentrer votre dispositif digital.`
- CTA : `Parler de votre projet →` (lien vers /contact.html?secteur=retail)

---

## Page Santé · Pharma · Dermo-cosmétique

**URL** : `/secteurs/sante-pharma.html`
**Body class** : `secteur-page is-pharma`
**Couleur d'accent** : `#1E4A6E` (Bleu pétrole)

**Title** : `Sites web pour la pharma · Shyft® · Marketing santé conforme et performant`
**Meta description** : `Sites et stratégies marketing pour laboratoires et marques santé. Conformes aux contraintes réglementaires. Expertise Bioderma, UPSA, Ménarini, Expanscience.`

### Contenu détaillé

#### Hero
- **Photo background** : `/assets/img/secteurs/pharma-hero.jpg` (ambiance : laboratoire moderne, pharmacie premium, ou produits cosmétiques minimaliste)
- **Eyebrow** : `Santé · Pharma · Dermo-cosmétique`
- **Titre** : `Décider plus vite, *avec moins* de risques.`
- **Sous-titre** : `Sites web et stratégies marketing pour laboratoires, marques santé et dermo-cosmétique. Pensés pour les environnements réglementés où chaque mot pèse.`
- **CTA** : `Parlons de votre projet santé →`

#### Bandeau logos
- Texte d'intro : `Notre direction stratégie a évolué dans l'univers de la santé :`
- **Logos** : Bioderma, UPSA, Ménarini, Expanscience

#### Section "Les enjeux de la santé/pharma"
**Titre** : `Trois contraintes, *un seul* impératif.`

3 enjeux :
1. **Le cadre réglementaire**
   - LEEM, ANSM, code de la santé publique, recommandations professionnelles : chaque communication doit être validée. Pas de place pour l'approximation.

2. **Le cycle de décision long et multi-interlocuteurs**
   - Direction marketing, affaires médicales, affaires réglementaires, pharmacovigilance, juridique : votre dispositif digital doit faciliter la coordination, pas l'alourdir.

3. **L'équilibre crédibilité scientifique × accessibilité**
   - Vos contenus s'adressent à des patients, des professionnels de santé, des prescripteurs. Trois niveaux de lecture, sur les mêmes produits. Sans dégrader la rigueur scientifique.

#### Section "Ce que nous apportons"
**Titre** : `Notre méthode appliquée à la santé.`

4 leviers :
1. **Sites conformes aux contraintes pharma**
   - Architecture pensée pour la validation (espaces patient vs professionnel, mentions légales spécifiques, gestion des produits soumis à AMM).

2. **Content marketing à deux niveaux**
   - Contenu grand public (patient) et contenu pro (médecin, pharmacien) sur la même plateforme, sans confusion ni surcharge.

3. **Stratégies de lancement produit**
   - Coordination digitale du pré-lancement, lancement et suivi post-marketing. Time-to-market raccourci grâce à des templates pré-validés.

4. **Pilotage business**
   - Tableaux de bord adaptés à la santé : pénétration officines, leads professionnels qualifiés, engagement patient. Reporting compatible avec les KPI internes laboratoires.

#### Stats secteur
- **+10 à 25%** — CA récurrent
- **−20 à 35%** — Time-to-market
- **×2 à 4** — Leads professionnels qualifiés

#### Cas d'usage
**Titre** : `Deux exemples *concrets*.`

**Cas 1** :
- Titre : `Laboratoire pharmaceutique, gamme OTC`
- Situation : *Communication trop institutionnelle, taux de recommandation officine en baisse.*
- Action : *Refonte du site avec espace pro (mémo posologie, fiches produits, formation) et espace patient (parcours conseil, ergonomie mobile).*
- Résultat : *Taux de visite officine ×2.4, leads pharmacien +180% en 8 mois.*

**Cas 2** :
- Titre : `Marque de dermo-cosmétique, distribution pharmacie`
- Situation : *Lancement d'une nouvelle gamme, besoin d'un dispositif digital coordonné.*
- Action : *Identité visuelle de gamme, site marque, landing pages produit, séquences email patient et pharmacien.*
- Résultat : *Lancement en 6 semaines au lieu de 4 mois prévus initialement, atteinte d'objectifs de prescription à 130%.*

#### FAQ secteur
1. **Avez-vous l'habitude des validations LEEM ?**
   *Oui. Nos contenus sont conçus pour passer les validations affaires médicales et réglementaires. Nous travaillons en cycles courts (V1 brouillon → validation → V2 finale) pour ne pas allonger inutilement les délais.*

2. **Pouvez-vous gérer un site avec espace pro (HCP) authentifié ?**
   *Oui. Nous mettons en place l'authentification professionnels de santé (RPPS, mot de passe, etc.) et la séparation des contenus selon la cible.*

3. **Travaillez-vous sur les dispositifs médicaux ?**
   *Oui, mais avec une attention particulière aux contraintes spécifiques (marquage CE, classes de dispositifs, restrictions de communication selon classe).*

#### CTA final
- Titre : `Un projet pharma ou santé à structurer ?`
- Sous-titre : `Un échange de 30 minutes pour évaluer comment structurer votre dispositif dans le respect des contraintes réglementaires.`
- CTA : `Parler de votre projet →` (lien vers /contact.html?secteur=pharma)

---

## Page Services financiers & paiement

**URL** : `/secteurs/finance.html`
**Body class** : `secteur-page is-finance`
**Couleur d'accent** : `#2E5A7F` (Bleu marine)

**Title** : `Sites web pour la finance · Shyft® · Confiance, conformité, conversion`
**Meta description** : `Sites web et stratégies d'acquisition pour services financiers et fintech. Conçus pour la confiance et la conformité. Expertise Cofidis, Crédit Agricole, Monext.`

### Contenu détaillé

#### Hero
- **Photo background** : `/assets/img/secteurs/finance-hero.jpg` (ambiance : bureau finance moderne, tour business district, ou interface trading épurée)
- **Eyebrow** : `Services financiers & paiement`
- **Titre** : `Vendre la *confiance*. Mesurer la performance.`
- **Sous-titre** : `Sites web et stratégies d'acquisition pour banques, assureurs, fintechs et acteurs du paiement. Conçus pour les marchés où confiance et conformité priment sur le sensationnel.`
- **CTA** : `Parlons de votre projet financier →`

#### Bandeau logos
- Texte d'intro : `Notre direction stratégie a travaillé avec des acteurs financiers majeurs :`
- **Logos** : Cofidis, Crédit Agricole, Monext

#### Section "Les enjeux de la finance"
**Titre** : `Trois exigences, *un seul* terrain de jeu.`

3 enjeux :
1. **La confiance comme facteur de conversion**
   - En finance, la décision d'achat se fait à la confiance. Design rassurant, signaux de crédibilité, hiérarchie d'information claire : chaque détail compte.

2. **B2B et B2C en parallèle**
   - Une banque vend à des particuliers ET à des entreprises. Deux logiques de parcours, deux tonalités, sur une même plateforme. Sans confusion.

3. **La conformité réglementaire**
   - ACPR, AMF, RGPD financier, lutte contre le blanchiment : votre dispositif digital doit intégrer ces contraintes dès la conception, pas en patch.

#### Section "Ce que nous apportons"
**Titre** : `Notre méthode appliquée à la finance.`

4 leviers :
1. **Design rassurant, hiérarchie claire**
   - Codes visuels du secteur respectés, mais modernisés. Pas de sensationnel, pas de gadgets : sobriété, lisibilité, professionnalisme.

2. **SEO B2B sur requêtes techniques**
   - Référencement sur les requêtes longues, techniques, métier. Là où vos prospects cherchent vraiment.

3. **Tunnels de génération de leads B2B**
   - Landing pages spécialisées par persona (DAF, dirigeant PME, comptable), nurturing email long, scoring des leads.

4. **Tableaux de bord conformes**
   - KPI alignés sur les exigences directrices financières : taux de conversion, coût d'acquisition par segment, valeur client à long terme.

#### Stats secteur
- **2 à 5** — Offres lancées par an
- **−20 à 35%** — Time-to-market
- **+30 à 50%** — Leads qualifiés B2B

#### Cas d'usage
**Titre** : `Deux exemples *concrets*.`

**Cas 1** :
- Titre : `Établissement de crédit, gamme B2C`
- Situation : *Site daté, taux de conversion sous la moyenne sectorielle, dépendance aux comparateurs externes.*
- Action : *Refonte UX du tunnel de demande de crédit, simplification du formulaire, rassurance visuelle (avis, garanties, transparence des taux).*
- Résultat : *Taux de conversion +42%, baisse de la dépendance aux comparateurs externes de 35% à 18%.*

**Cas 2** :
- Titre : `Fintech B2B paiement, lancement nouvelle offre`
- Situation : *Offre innovante, mais site et discours trop techniques pour les décisionnaires non-tech.*
- Action : *Refonte du site avec deux entrées (technique vs business), landing pages par persona, séquences email nurturing pour comptes cibles.*
- Résultat : *Taux de RDV qualifiés ×3.2 sur les 6 premiers mois.*

#### FAQ secteur
1. **Êtes-vous familiers des contraintes ACPR / AMF ?**
   *Oui. Nous structurons les contenus pour que les mentions obligatoires, avertissements et clauses de risque soient intégrés dès le design, pas ajoutés en bout de chaîne.*

2. **Pouvez-vous travailler avec des données sensibles (KYC, etc.) ?**
   *Nous travaillons sur les couches marketing et acquisition. Pour les flux opérationnels (KYC, paiement, etc.), nous collaborons avec vos équipes IT/sécurité pour assurer la cohérence sans toucher au cœur opérationnel.*

3. **Gérez-vous la traduction multilingue pour les acteurs internationaux ?**
   *Oui, en coordination avec vos équipes locales. Notre approche garantit que le SEO et la performance ne sont pas dégradés par le multilingue.*

#### CTA final
- Titre : `Un projet financier à structurer ?`
- Sous-titre : `Un échange pour comprendre vos enjeux de conversion, conformité et acquisition.`
- CTA : `Parler de votre projet →` (lien vers /contact.html?secteur=finance)

---

## Page IT, logiciels & SaaS

**URL** : `/secteurs/it-saas.html`
**Body class** : `secteur-page is-it-saas`
**Couleur d'accent** : `#6B4FCF` (Violet électrique)

**Title** : `Sites web pour SaaS et IT · Shyft® · Transformer la tech en croissance commerciale`
**Meta description** : `Sites et stratégies d'acquisition pour éditeurs SaaS, services IT et logiciels B2B. Transformer l'expertise tech en système commercial. ×2 à 3 leads qualifiés.`

### Contenu détaillé

#### Hero
- **Photo background** : `/assets/img/secteurs/it-hero.jpg` (ambiance : bureau tech moderne minimaliste, espace coworking premium, ou interface logicielle abstraite)
- **Eyebrow** : `IT, logiciels & SaaS`
- **Titre** : `Transformer l'expertise tech en *système commercial*.`
- **Sous-titre** : `Sites web et stratégies d'acquisition pour éditeurs SaaS, services IT et logiciels B2B. Pensés pour combler le fossé entre expertise technique forte et commercialisation structurée.`
- **CTA** : `Parlons de votre projet SaaS →`

#### Bandeau logos
- Texte d'intro : `Nous accompagnons des éditeurs SaaS et services IT dans la structuration de leur croissance :`
- **Logos** : (à compléter avec Laurent — secteur jeune chez Shyft)

#### Section "Les enjeux du SaaS / IT"
**Titre** : `Trois fossés, *un seul* objectif.`

3 enjeux :
1. **L'expertise technique forte, la commercialisation sous-structurée**
   - Les fondateurs sont souvent tech. Le produit est bon. Mais le site ressemble à de la documentation, le marketing tâtonne, le pipeline n'est pas industrialisé.

2. **Le cycle de vente long avec démos et essais gratuits**
   - Entre la découverte et la signature : démos, essais, séances de questions, validations IT et sécurité. Votre dispositif doit qualifier vite et nourrir longtemps.

3. **La concurrence internationale**
   - Sur la plupart des verticales, vous êtes face à des acteurs US ou européens bien financés. Votre différenciation passe par la qualité du discours, pas seulement par le produit.

#### Section "Ce que nous apportons"
**Titre** : `Notre méthode appliquée au SaaS.`

4 leviers :
1. **Site qui traduit la tech en bénéfices business**
   - Pages produit qui parlent à des décisionnaires non-techniques. Hiérarchie qui répond à "qu'est-ce que ça m'apporte" avant "comment ça marche".

2. **Stratégie d'acquisition B2B multi-canale**
   - LinkedIn organique et payant, cold email industrialisé, SEO B2B sur requêtes longues, content marketing positionné expertise.

3. **Marketing automation pour qualifier en continu**
   - Scoring des leads, séquences d'email basées sur le comportement, intégration CRM (HubSpot, Salesforce, Pipedrive).

4. **Pages tarification claires**
   - Tarification visible, comparaison plans, calculateurs de ROI si pertinent. Pas de "contactez-nous pour un devis" caché.

#### Stats secteur
- **×2 à 3** — Leads qualifiés
- **+20 à 40%** — Conversion leads → clients
- **−25 à 40%** — Coût d'acquisition par lead

#### Cas d'usage
**Titre** : `Deux exemples *concrets*.`

**Cas 1** :
- Titre : `Éditeur SaaS B2B, 200 clients existants`
- Situation : *Site daté, taux de conversion essai → payant en stagnation, dépendance excessive au bouche-à-oreille.*
- Action : *Refonte du site avec landing pages par persona, intégration HubSpot, séquences nurturing post-essai, tarification publique.*
- Résultat : *Demos qualifiées +180%, taux de conversion essai → payant de 12% à 19% en 5 mois.*

**Cas 2** :
- Titre : `ESN spécialisée cybersécurité, 30 collaborateurs`
- Situation : *Discours trop technique, génération de leads aléatoire, pipeline commercial peu visible.*
- Action : *Refonte de l'identité visuelle, site éditorial, stratégie de contenu LinkedIn dirigeant, séquences cold email sur comptes cibles.*
- Résultat : *Pipeline qualifié multiplié par 4 sur 9 mois, premier contrat à 6 chiffres signé via inbound.*

#### FAQ secteur
1. **Travaillez-vous avec des outils CRM spécifiques ?**
   *Nous sommes outillés sur HubSpot principalement, mais nous intégrons aussi Salesforce, Pipedrive, et les outils internes. Le choix dépend de votre stack existante.*

2. **Pouvez-vous gérer des sites en plusieurs langues (EN obligatoire pour SaaS) ?**
   *Oui. Nos sites sont conçus dès le départ pour être multilingues, avec une approche SEO qui ne se dégrade pas en EN.*

3. **Êtes-vous à l'aise avec la documentation technique ?**
   *Pour le site marketing, oui. Pour la documentation produit ou la base de connaissances, nous travaillons en lien avec vos équipes tech, mais nous ne nous substituons pas à elles.*

#### CTA final
- Titre : `Un projet SaaS ou IT à structurer ?`
- Sous-titre : `Un échange pour identifier où votre tech mérite mieux que votre commercialisation actuelle.`
- CTA : `Parler de votre projet →` (lien vers /contact.html?secteur=it-saas)

---

## Page Énergies renouvelables

**URL** : `/secteurs/energies.html`
**Body class** : `secteur-page is-energies`
**Couleur d'accent** : `#4F7F5C` (Vert sauge)

**Title** : `Sites web pour les énergies renouvelables · Shyft® · Acquisition B2B et B2B2C`
**Meta description** : `Sites web et stratégies d'acquisition pour installateurs, intégrateurs et distributeurs en énergies renouvelables. +20 à 35% conversion, −15 à 30% coût d'acquisition.`

### Contenu détaillé

#### Hero
- **Photo background** : `/assets/img/secteurs/energies-hero.jpg` (ambiance : panneaux solaires aériens, éoliennes paysage, ou centrale photovoltaïque moderne)
- **Eyebrow** : `Énergies renouvelables`
- **Titre** : `Acquisition *maîtrisée* pour un marché en consolidation.`
- **Sous-titre** : `Sites web et systèmes d'acquisition pour installateurs, intégrateurs et distributeurs en énergies renouvelables. Conçus pour des marchés où la concurrence s'intensifie et où la qualité du lead fait la différence.`
- **CTA** : `Parlons de votre projet énergies →`

#### Bandeau logos
- Texte d'intro : `Nous accompagnons des acteurs des énergies renouvelables :`
- **Logos** : (à compléter avec Laurent)

#### Section "Les enjeux des énergies renouvelables"
**Titre** : `Trois tensions, *un seul* marché.`

3 enjeux :
1. **Un marché en consolidation rapide**
   - Le secteur des EnR voit sa concurrence s'intensifier. Petits installateurs, grands groupes, pure-players digitaux : différenciation et notoriété locale deviennent critiques.

2. **B2B et B2B2C en même temps**
   - Vous vendez à des installateurs (B2B) qui vendent à des particuliers (B2C). Votre dispositif doit servir les deux chaînes, sans canibalisation.

3. **Une réglementation mouvante**
   - MaPrimeRénov', CEE, RE2020, autoconsommation : le cadre évolue chaque année. Votre contenu doit rester frais, ou il devient un handicap commercial.

#### Section "Ce que nous apportons"
**Titre** : `Notre méthode appliquée aux EnR.`

4 leviers :
1. **Sites pour installateurs et intégrateurs B2B**
   - Pages corporate qui crédibilisent face aux donneurs d'ordre, pages produit techniques pour les bureaux d'études, calculateurs de rentabilité pour les commerciaux.

2. **Acquisition ciblée géographiquement**
   - SEO local et campagnes Google Ads par zone, pour maximiser le ROI sur les zones où vos équipes installent vraiment. Pas de prospection nationale stérile.

3. **Mise à jour réglementaire continue**
   - Veille des dispositifs (MaPrimeRénov', CEE, etc.) et mise à jour mensuelle des pages concernées. Votre site reste toujours d'actualité.

4. **Tableaux de bord pipeline B2B**
   - Suivi des leads par zone, par produit, par étape de pipeline. Coordination simplifiée avec vos équipes commerciales terrain.

#### Stats secteur
- **+20 à 35%** — Conversion leads → clients
- **−15 à 30%** — Coût d'acquisition
- **×2 à 3** — Leads géolocalisés qualifiés

#### Cas d'usage
**Titre** : `Deux exemples *concrets*.`

**Cas 1** :
- Titre : `Installateur photovoltaïque, 6 régions`
- Situation : *Site générique, dépendance aux apporteurs d'affaires, marges sous pression.*
- Action : *Refonte du site avec landing pages géolocalisées, calculateur de rentabilité, campagnes Google Ads par département.*
- Résultat : *Leads directs +120%, baisse de la dépendance aux apporteurs externes de 70% à 38%.*

**Cas 2** :
- Titre : `Distributeur de matériel solaire B2B`
- Situation : *Catalogue en PDF envoyé sur demande, processus commercial lent et lourd.*
- Action : *Site avec catalogue interactif, espace pro authentifié (tarifs, stocks, devis), automation de la prise de commande.*
- Résultat : *Cycle de vente raccourci de 18 à 7 jours, panier moyen +28%.*

#### FAQ secteur
1. **Comprenez-vous les dispositifs réglementaires (MaPrimeRénov', CEE) ?**
   *Suffisamment pour structurer le contenu et garder votre site à jour. Pour les détails légaux fins, nous travaillons en lien avec vos équipes ou conseils spécialisés.*

2. **Pouvez-vous intégrer des calculateurs (rentabilité, dimensionnement) ?**
   *Oui, en travaillant avec vos équipes techniques pour valider les formules. Ces calculateurs sont d'excellents outils de génération de leads qualifiés.*

3. **Êtes-vous outillés pour le SEO local multi-zones ?**
   *Oui. C'est même un de nos points forts pour les acteurs avec des implantations multiples ou un réseau de partenaires.*

#### CTA final
- Titre : `Un projet EnR à structurer ?`
- Sous-titre : `Un échange pour identifier où concentrer vos efforts dans un marché qui se densifie.`
- CTA : `Parler de votre projet →` (lien vers /contact.html?secteur=energies)

---

## Page Conseil B2B & services aux entreprises

**URL** : `/secteurs/conseil-b2b.html`
**Body class** : `secteur-page is-conseil`
**Couleur d'accent** : `#7A2E3F` (Bordeaux profond)

**Title** : `Sites web pour cabinets de conseil B2B · Shyft® · Transformer l'expertise en pipeline`
**Meta description** : `Sites web et stratégies d'acquisition pour cabinets de conseil et services aux entreprises. Transformer l'expertise en levier commercial durable. ×2 à 3 leads qualifiés.`

### Contenu détaillé

#### Hero
- **Photo background** : `/assets/img/secteurs/conseil-hero.jpg` (ambiance : salle de réunion exécutive moderne, bureau de consultant premium, ou architecture corporate épurée)
- **Eyebrow** : `Conseil B2B & services aux entreprises`
- **Titre** : `L'expertise comme *levier commercial durable*.`
- **Sous-titre** : `Sites web et stratégies d'acquisition pour cabinets de conseil, ESN, agences spécialisées et services aux entreprises. Conçus pour faire de votre expertise un système, pas un hasard.`
- **CTA** : `Parlons de votre projet conseil →`

#### Bandeau logos
- Texte d'intro : `Notre direction stratégie a accompagné des structures de conseil et services aux entreprises :`
- **Logos** : (à compléter avec Laurent)

#### Section "Les enjeux du conseil B2B"
**Titre** : `Trois paradoxes, *un seul* métier.`

3 enjeux :
1. **Vendre de l'intangible**
   - Votre produit, c'est de l'intelligence appliquée. Comment le rendre visible, comparable, "achetable" sans le banaliser ? Le site doit incarner la signature, pas la diluer.

2. **Le bouche-à-oreille comme moteur dominant**
   - 70% du business vient de la recommandation. Mais à mesure que vous grandissez, le bouche-à-oreille ne suffit plus. Il faut industrialiser sans perdre la qualité du lien.

3. **La différenciation par la signature intellectuelle**
   - Sur un marché saturé de "cabinets stratégie", c'est la voix, l'angle, la méthode qui font la différence. Pas la plaquette générique.

#### Section "Ce que nous apportons"
**Titre** : `Notre méthode appliquée au conseil.`

4 leviers :
1. **Site éditorial qui incarne l'expertise**
   - Pas une plaquette : un objet éditorial. Articles fond, prises de position, méthodes signature. Le site devient une preuve d'expertise en lui-même.

2. **Stratégie LinkedIn dirigeant**
   - LinkedIn est LE canal du conseil B2B. Stratégie de contenu, calendrier éditorial, ghostwriting si nécessaire, animation de réseau. Pas de growth hacking : de la construction durable.

3. **Lead nurturing long**
   - Cycles de décision en conseil : 3 à 9 mois. Vos prospects doivent rester chauds pendant cette période. Newsletters, séquences thématiques, contenus premium, événements.

4. **Page services pensées pour la conversion**
   - Au-delà du contenu éditorial, des pages services claires, qui répondent aux objections, qui rassurent sur la méthode, qui invitent au premier échange.

#### Stats secteur
- **×2 à 3** — Leads qualifiés
- **−50%** — Temps de mise en œuvre
- **+30 à 60%** — Engagement contenu LinkedIn

#### Cas d'usage
**Titre** : `Deux exemples *concrets*.`

**Cas 1** :
- Titre : `Cabinet de conseil stratégie, 12 consultants`
- Situation : *Bouche-à-oreille saturé, croissance en plateau, pas de visibilité hors du réseau historique.*
- Action : *Refonte du site en plateforme éditoriale, stratégie LinkedIn pour 3 dirigeants, séquences d'email mensuelles aux décisionnaires cibles.*
- Résultat : *Premier contrat venu d'inbound LinkedIn à 9 mois, suivi de 3 autres dans les 6 mois suivants.*

**Cas 2** :
- Titre : `Cabinet spécialisé en transformation, niche secteur banque`
- Situation : *Expertise pointue, mais perception "généraliste", problème de positionnement.*
- Action : *Refonte de l'identité, repositionnement éditorial, série de tribunes dans la presse spécialisée, structuration du site autour de la niche.*
- Résultat : *Réception spontanée d'appels d'offres pertinents +250% sur 12 mois.*

#### FAQ secteur
1. **Pouvez-vous écrire du contenu B2B technique (finance, industrie, etc.) ?**
   *Pour le copywriting "marketing", oui. Pour les contenus très techniques, nous travaillons en interview avec vos experts puis nous structurons. Vous gardez la voix, nous apportons la mise en forme.*

2. **Faites-vous du ghostwriting LinkedIn pour les dirigeants ?**
   *Oui, c'est une de nos prestations courantes en conseil B2B. Avec un cadre clair : entretiens réguliers, validations, calendrier maîtrisé. Pas de "posts génériques" envoyés à votre place.*

3. **Que se passe-t-il si nos consultants n'ont pas le temps de produire du contenu ?**
   *C'est précisément le rôle de Shyft : structurer un dispositif où vos consultants donnent 30 minutes d'interview par mois, et nous transformons ça en 4-8 contenus de qualité.*

#### CTA final
- Titre : `Un cabinet à structurer ?`
- Sous-titre : `Un échange pour identifier comment industrialiser votre acquisition sans perdre votre signature.`
- CTA : `Parler de votre projet →` (lien vers /contact.html?secteur=conseil-b2b)

---

# VAGUE 3 — PAGES PILIERS (5 pages)

## 🎨 STRUCTURE COMMUNE À TOUTES LES PAGES PILIERS

Toutes les pages piliers suivent la **même architecture** :

1. **Header** (identique home)
2. **Hero pilier** (couleur Oxblood + accent or, pas de photo géante comme les secteurs)
3. **Section "Ce que nous faisons concrètement"** (les livrables détaillés)
4. **Section "Notre méthode"** (3-4 étapes de mise en œuvre)
5. **Section "Ce que vous obtenez"** (livrables tangibles)
6. **Section "Tarification"** (à partir de X€)
7. **Section "Combinaisons recommandées"** (autres piliers qui s'articulent bien)
8. **FAQ pilier** (3 questions spécifiques)
9. **CTA final**
10. **Footer** (identique home)

### Style des pages piliers
- **Pas de photo géante en hero** (contraste avec les pages secteurs)
- Hero plus court (50-60vh), fond Oxblood profond avec mesh subtil
- Layout éditorial : conteneur étroit (max-width 920px) pour le corps
- Plus de typographie, moins d'images : on est dans l'expertise pure
- Petit pictogramme animé en hero (différent par pilier)

---

## Page Stratégie

**URL** : `/piliers/strategie.html`
**Title** : `Stratégie marketing pour PME · Shyft® · Clarifier avant de construire`
**Meta description** : `Stratégie marketing et positionnement pour PME. Plateforme de marque, segmentation cibles, roadmap 12 mois, KPI business. Sans 6 mois d'audit interminable.`

### Contenu détaillé

#### Hero
- **Eyebrow** : `01 — Stratégie`
- **Titre** : `Clarifier où vous allez avant de construire *quoi que ce soit*.`
- **Sous-titre** : `Sans 6 mois d'audit interminable. Sans 80 slides de PowerPoint. Une stratégie marketing actionnable, alignée business, livrée en quelques semaines.`
- **CTA** : `Démarrer la stratégie →`

#### Section "Ce que nous faisons concrètement"
**Titre** : `Cinq livrables stratégiques.`

5 blocs (en grille 2 colonnes) :
1. **Positionnement & proposition de valeur**
   - Énoncé clair de qui vous êtes, pour qui, contre qui, et pourquoi vous. Pas un brief, un outil de vente quotidien.

2. **Plateforme de marque**
   - Mission, vision, valeurs, ton de voix, personnalité. Les fondations narratives sur lesquelles tout le marketing s'appuie.

3. **Segmentation cibles & priorisation**
   - Quels sont vos vrais clients ? Lesquels concentrent la valeur ? Lesquels méritent un investissement marketing ? Travail data + qualitatif.

4. **Roadmap marketing 12 mois**
   - Trimestre par trimestre, ce qu'on fait, ce qu'on mesure, qui le porte. Pas une wishlist : un plan exécutable.

5. **KPI & tableaux de bord business**
   - 5 à 10 indicateurs maximum, alignés business (CA, leads, conversion, coût d'acquisition). Suivi mensuel, sans jargon.

#### Section "Notre méthode"
**Titre** : `Quatre étapes, quelques semaines.`

4 étapes :
1. **Audit éclair**
   - 2 semaines : entretiens internes, analyse concurrentielle, revue des données existantes. Sans intrusion, sans réunions inutiles.

2. **Diagnostic & options**
   - Restitution des forces, faiblesses, opportunités. Présentation de 2 ou 3 options stratégiques, avec impacts business chiffrés.

3. **Atelier de tranchage**
   - Demi-journée avec votre direction. On tranche, ensemble. Pas de "rapport stratégique" envoyé en PDF qu'on ne lit jamais.

4. **Livrables & passage à l'action**
   - Plateforme de marque, roadmap, KPI dashboard. Et surtout : qui fait quoi à partir de demain.

#### Section "Tarification"
- **À partir de [À COMPLÉTER PAR LAURENT]€ HT**
- Petite étoile : *Tarif pour une PME de 5 à 50 salariés, mission de cadrage stratégique standard. Devis adapté selon ampleur (audit data approfondi, ateliers multiples, etc.).*
- Délai indicatif : 4 à 8 semaines.

#### Section "Combinaisons recommandées"
Après la Stratégie, ces piliers s'enchaînent naturellement :
- **→ Identité** : traduire la stratégie en image cohérente
- **→ Site web** : matérialiser la stratégie dans l'outil principal
- **→ Pilotage** : faire vivre la stratégie au quotidien

#### FAQ pilier
1. **Pourquoi seulement quelques semaines, alors que les autres prennent 6 mois ?**
   *Parce qu'on ne fait pas de la "stratégie pour la stratégie". On fait de la stratégie utile, actionnable. On évite les ateliers à 12 personnes, les frameworks à 20 cases, les présentations de 80 slides. Résultat : du clair, plus vite.*

2. **Avez-vous besoin de notre data interne ?**
   *Idéalement, oui : CRM, suivi des ventes, sources de leads, NPS. Ça accélère et fiabilise tout. Si vous n'en avez pas, on s'adapte avec du qualitatif.*

3. **Que se passe-t-il si la stratégie ne nous convient pas après livraison ?**
   *On a un cycle d'itération inclus : restitution intermédiaire, ajustement, livraison finale. Si fondamentalement ça ne va pas, c'est qu'il y a eu un problème en amont. Dans 99% des cas, ça ne se produit pas.*

#### CTA final
- Titre : `Prêt à clarifier la suite ?`
- Sous-titre : `Un échange de 30 minutes pour comprendre où vous en êtes et savoir si la stratégie est votre priorité.`
- CTA : `Démarrer →` (vers /contact.html?pilier=strategie)

---

## Page Identité

**URL** : `/piliers/identite.html`
**Title** : `Identité visuelle pour PME · Shyft® · Une image qui porte votre stratégie`
**Meta description** : `Identité visuelle, logo, charte graphique, design system. Une image cohérente sur tous vos points de contact, alignée avec votre stratégie business.`

### Contenu détaillé

#### Hero
- **Eyebrow** : `02 — Identité`
- **Titre** : `Une image cohérente, qui *porte* votre stratégie.`
- **Sous-titre** : `Logo, charte, déclinaisons : pas du design pour le design, mais un système visuel au service de votre business. Pour que votre marque incarne vraiment ce que vous êtes.`
- **CTA** : `Démarrer l'identité →`

#### Section "Ce que nous faisons concrètement"
**Titre** : `Cinq livrables d'identité.`

5 blocs :
1. **Logo et déclinaisons**
   - Logo principal, versions monochrome, favicon, signature email. Pas un fichier : un système.

2. **Charte graphique & typographique**
   - Palette de couleurs (avec codes web et imprimerie), typographies, règles d'usage. Document opérationnel, pas un PDF de 50 pages.

3. **Design system & déclinaisons**
   - Les composants visuels réutilisables : boutons, cards, encadrés, icônes. Cohérence garantie sur tous vos supports.

4. **Ton éditorial & messages clés**
   - La voix de votre marque, par écrit. Comment vous parlez, quels mots vous utilisez, quels mots vous bannissez. Aligné avec la stratégie.

5. **Templates réseaux sociaux & supports**
   - LinkedIn, plaquettes, présentations commerciales, signatures email, cartes de visite. L'identité incarnée dans le quotidien.

#### Section "Notre méthode"
**Titre** : `Quatre étapes, identité verrouillée.`

4 étapes :
1. **Brief créatif & moodboard**
   - Atelier d'alignement, références visuelles, exploration des directions. Validation d'une direction avant de produire quoi que ce soit.

2. **Deux propositions complètes**
   - Pas dix esquisses, deux directions abouties. Vous tranchez en connaissance de cause.

3. **Itérations sur la direction retenue**
   - 2 à 3 cycles d'aller-retours pour affiner. Suffisant pour aboutir, sans s'éterniser.

4. **Livraison du système complet**
   - Fichiers sources (Figma, Illustrator), charte d'usage, templates, formation à l'usage si besoin.

#### Section "Tarification"
- **À partir de [À COMPLÉTER PAR LAURENT]€ HT**
- Petite étoile : *Tarif pour une refonte d'identité complète (logo + charte + déclinaisons). Si seulement logo, à partir de [montant inférieur]€. Devis adapté selon ampleur des déclinaisons.*
- Délai indicatif : 3 à 6 semaines.

#### Section "Combinaisons recommandées"
- **→ Site web** : matérialiser l'identité dans le canal principal
- **← Stratégie** : sans stratégie, l'identité est juste décorative

#### FAQ pilier
1. **Faut-il refaire le logo, ou seulement la charte ?**
   *Ça dépend. Parfois, le logo est bon mais l'usage est mauvais : refaire la charte suffit. Parfois, le logo lui-même n'est plus à la hauteur. On évalue dans le diagnostic.*

2. **Pouvez-vous travailler à partir d'un logo existant ?**
   *Oui, à condition qu'il soit techniquement utilisable (fichier vectoriel, qualité correcte). Sinon, on reconstruit proprement.*

3. **Combien de versions de logo proposez-vous ?**
   *Deux directions complètes, abouties. Pas dix esquisses. C'est plus efficace pour vous : vous tranchez vraiment, sans noyer la décision.*

#### CTA final
- Titre : `Prêt à incarner votre marque ?`
- Sous-titre : `Un échange pour comprendre où en est votre identité et si elle mérite une refonte.`
- CTA : `Démarrer →` (vers /contact.html?pilier=identite)

---

## Page Site web

**URL** : `/piliers/site-web.html`
**Title** : `Sites web sur-mesure pour PME · Shyft® · Optimisés pour la conversion`
**Meta description** : `Sites web sur-mesure pour PME, optimisés pour la conversion. Performance native, SEO intégré, tracking GA4. À partir de 3 600€ HT, livrés rapidement.`

### Contenu détaillé

#### Hero
- **Eyebrow** : `03 — Site web`
- **Titre** : `L'épine *dorsale* de votre dispositif digital.`
- **Sous-titre** : `Un site sur-mesure, pensé pour convertir, pas juste pour exister. Performance native, copywriting SEO intégré, tracking complet. L'outil qui travaille pour vous en silence.`
- **CTA** : `Démarrer le site →`

#### Section "Ce que nous faisons concrètement"
**Titre** : `Cinq livrables qui font la différence.`

5 blocs :
1. **Site sur-mesure**
   - Pas de template WordPress, pas de Wix bricolé. Code propre, performant, durable. Conçu pour vous, pas adapté de quelqu'un d'autre.

2. **Performance native, mobile-first**
   - Lighthouse 90+ obligatoire. Site qui charge en moins de 2 secondes. Conçu pour mobile d'abord, parce que c'est là que vos clients arrivent.

3. **Copywriting SEO intégré**
   - Pas "le copy après le design". Tout est conçu ensemble, dès le départ : structure, mots-clés, intentions de recherche, conversion.

4. **Tracking GA4 & Search Console**
   - Configuration complète, alignée business. Vous mesurez ce qui compte vraiment : visites, conversions, sources, parcours.

5. **Landing pages & tunnels de conversion**
   - Pages dédiées par campagne, par cible, par offre. Le site n'est pas un monolithe : c'est un écosystème de points d'entrée.

#### Section "Notre méthode"
**Titre** : `Six étapes pour livrer le site.`

(Reprendre exactement la méthode déjà sur la home, mais détaillée)

1. **Atelier de cadrage** (Jour 1, 2h)
2. **Direction artistique** (Jour 5)
3. **Maquettes & copywriting** (Jour 12)
4. **Développement** (Jour 20)
5. **Mise en ligne** (Jour 30)
6. **Suivi inclus** (30 jours post-livraison)

#### Section "Ce que vous obtenez"
**Titre** : `Au moment de la livraison.`

Liste à puces or :
- Site en ligne sur votre domaine
- Code source complet (Git ou archive)
- Documentation technique
- Formation 30 minutes pour gérer le contenu (si CMS)
- Configuration tracking complète
- Rapport SEO initial avec recommandations
- 30 jours de suivi gratuit (corrections, ajustements)

#### Section "Tarification"
- **À partir de 3 600€ HT** pour un site de 5 à 8 pages
- Petite étoile : *Tarif site standard (vitrine + landing pages). Devis adapté si besoins spécifiques (e-commerce, espace membre, intégrations particulières).*
- Délai indicatif : 30 jours en moyenne.

#### Section "Combinaisons recommandées"
- **← Stratégie** : sans stratégie claire, le site est un beau bibelot
- **← Identité** : le site incarne l'identité, donc elle doit être prête
- **→ Acquisition** : sans acquisition, même le meilleur site est invisible
- **→ Pilotage** : pour faire vivre le site dans la durée

#### FAQ pilier
1. **Travaillez-vous avec WordPress, Webflow, ou autre ?**
   *Par défaut : sur-mesure en code (plus rapide à livrer, plus performant, plus libre). WordPress sur demande explicite uniquement, si votre besoin l'impose (édition autonome quotidienne du contenu).*

2. **Est-ce qu'on peut éditer le site nous-mêmes après livraison ?**
   *Par défaut, non : nos sites sont en code, non administrables. Si l'édition autonome est critique pour vous, on installe un CMS léger (Sanity, Storyblok). À discuter en amont.*

3. **Que se passe-t-il si on quitte Shyft après la livraison ?**
   *Vous avez le code source complet. N'importe quel développeur peut reprendre. Pas de verrouillage propriétaire.*

#### CTA final
- Titre : `Prêt à structurer votre site ?`
- Sous-titre : `Un échange de 30 minutes pour comprendre vos enjeux et estimer le périmètre.`
- CTA : `Démarrer →` (vers /contact.html?pilier=site-web)

---

## Page Acquisition

**URL** : `/piliers/acquisition.html`
**Title** : `Acquisition de leads pour PME · Shyft® · SEO, GEO, cold email, ads`
**Meta description** : `Acquisition de leads B2B pour PME. SEO, GEO, cold emailing, campagnes payantes, marketing automation. Le moteur qui amène vos prospects en continu.`

### Contenu détaillé

#### Hero
- **Eyebrow** : `04 — Acquisition`
- **Titre** : `Le moteur qui amène vos prospects jusqu'à vous, *en continu*.`
- **Sous-titre** : `SEO, GEO, cold emailing B2B, campagnes payantes, marketing automation. Tous les leviers d'acquisition, orchestrés sous une même marque, sans agence externalisée.`
- **CTA** : `Démarrer l'acquisition →`

#### Section "Ce que nous faisons concrètement"
**Titre** : `Cinq leviers d'acquisition.`

5 blocs :
1. **SEO technique & sémantique**
   - Audit technique, optimisation on-page, stratégie de contenu fond, maillage interne. Pas du SEO "à la louche" : un système.

2. **GEO : référencement IA**
   - Référencement sur ChatGPT, Perplexity, Claude. Le nouveau terrain de jeu de la visibilité en 2026. Vos prospects vous trouveront même s'ils ne font plus de recherche Google.

3. **Campagnes payantes ciblées**
   - LinkedIn Ads (B2B), Google Ads (intent), Meta (B2C ou retargeting). Pas d'épandage : ciblage chirurgical, budgets maîtrisés, ROI mesuré.

4. **Cold emailing B2B & séquences nurturing**
   - Listes ciblées, séquences d'emails à valeur ajoutée, scoring de réponse, suivi commercial intégré. Pas de spam : du prospect chaud.

5. **Marketing automation**
   - HubSpot, Brevo, ou outils sur-mesure. Scénarios automatisés selon comportement, scoring des leads, hand-off automatique vers les commerciaux.

#### Section "Notre méthode"
**Titre** : `Quatre étapes, machine en route.`

4 étapes :
1. **Audit & priorisation des leviers**
   - 2 semaines : analyse de votre existant, identification des leviers prioritaires pour votre ICP, dimensionnement des budgets.

2. **Setup technique & créatif**
   - Mise en place des outils, briefing des contenus, création des séquences, configuration du tracking. 3 à 4 semaines selon ampleur.

3. **Lancement & pilotage mensuel**
   - Démarrage des leviers, tests A/B, optimisation continue. Point mensuel structuré avec votre équipe commerciale.

4. **Industrialisation**
   - Une fois la machine en route, on industrialise : automatisations, extension des canaux, montée en volume.

#### Section "Ce que vous obtenez"
- Plan d'acquisition trimestriel chiffré
- Tableaux de bord mensuel (leads, coût, conversion)
- Compte rendu d'activité chaque mois
- Optimisations continues sans surcoût
- Formation de vos équipes commerciales sur les leads entrants

#### Section "Tarification"
- **À partir de [À COMPLÉTER PAR LAURENT]€ / mois HT** (récurrent)
- Petite étoile : *Tarif pour une PME avec un objectif de 20-50 leads qualifiés / mois. Devis adapté selon ampleur (canaux activés, volume cible, géographie).*
- Engagement minimum recommandé : 6 mois (l'acquisition se construit dans la durée).

#### Section "Combinaisons recommandées"
- **← Site web** : sans site qui convertit, l'acquisition est un puits sans fond
- **← Identité** : pour avoir une image cohérente sur tous les canaux
- **→ Pilotage** : pour faire évoluer la stratégie selon les résultats

#### FAQ pilier
1. **Combien de temps pour voir des résultats ?**
   *Payant (LinkedIn, Google) : 2 à 4 semaines pour les premiers leads. SEO : 3 à 6 mois pour les premiers impacts significatifs. Cold email : 2 à 6 semaines pour les premiers rendez-vous.*

2. **Travaillez-vous avec notre CRM existant ?**
   *Oui. Nous nous adaptons à HubSpot, Salesforce, Pipedrive, ou outils internes. Si vous n'avez pas de CRM, on en met un en place adapté à votre taille.*

3. **Pouvez-vous gérer des budgets médias importants ?**
   *Oui, mais notre approche reste la même : ROI mesuré, optimisation continue, pas de "burn" budgétaire. Si votre besoin dépasse 50k€/mois en médias, on en discute pour adapter la gouvernance.*

#### CTA final
- Titre : `Prêt à structurer votre acquisition ?`
- Sous-titre : `Un échange pour identifier où concentrer vos efforts d'acquisition selon votre cible.`
- CTA : `Démarrer →` (vers /contact.html?pilier=acquisition)

---

## Page Pilotage

**URL** : `/piliers/pilotage.html`
**Title** : `Pilotage marketing externalisé pour PME · Shyft® · Direction marketing à temps partiel`
**Meta description** : `Pilotage marketing externalisé pour PME. Tableaux de bord, optimisation continue, alignement marketing-commerce. Une direction marketing sans le coût d'un CMO interne.`

### Contenu détaillé

#### Hero
- **Eyebrow** : `05 — Pilotage`
- **Titre** : `Mesurer, optimiser, *accompagner*. Pour que les résultats durent.`
- **Sous-titre** : `Direction marketing externalisée pour PME. Tableaux de bord business, tests A/B, alignement marketing-commerce. Tout ce qu'un CMO interne ferait, sans le coût d'un CMO interne.`
- **CTA** : `Démarrer le pilotage →`

#### Section "Ce que nous faisons concrètement"
**Titre** : `Cinq missions de pilotage.`

5 blocs :
1. **Tableaux de bord business**
   - Leads, conversion, CA généré, coût d'acquisition, valeur client : suivi mensuel structuré, sans jargon, aligné direction.

2. **Reporting mensuel direction**
   - Un compte rendu d'1 page pour le COMEX, un dossier complet pour la direction marketing. Pas 50 slides PowerPoint inutiles.

3. **Tests A/B & optimisation continue**
   - Hypothèses formulées, tests structurés, conclusions actionnables. Optimisation du dispositif en continu, sans tout remettre en cause chaque trimestre.

4. **Alignement marketing & commerce**
   - Réunions structurées avec vos commerciaux, qualification commune des leads, feedback loop systématique. Le marketing au service du business, pas une boîte noire.

5. **Direction marketing externalisée**
   - Pour les PME qui n'ont pas les moyens d'un CMO interne (80-120k€/an) mais qui ont besoin de la fonction. Vous gardez la décision, on porte l'opérationnel.

#### Section "Notre méthode"
**Titre** : `Une rythmique mensuelle structurée.`

4 rythmes :
1. **Daily / Weekly avec votre équipe**
   - Asynchrone (Slack, Notion, email). Présence à la demande. Pas d'envahissement de vos équipes.

2. **Point mensuel structuré (90 min)**
   - Reporting, décisions à valider, priorités du mois suivant. Cadre clair, output documenté.

3. **Comité trimestriel direction**
   - Vision d'ensemble, ajustement stratégique, allocation des moyens pour le trimestre suivant.

4. **Bilan annuel & roadmap N+1**
   - Vue 12 mois rétrospective et prospective. Préparation de l'année suivante avec votre direction.

#### Section "Ce que vous obtenez"
- Direction marketing opérationnelle, sans le coût interne
- Reporting mensuel structuré (1 page COMEX + dossier complet)
- Tableaux de bord business à jour en temps réel
- Coordination entre marketing, commerce et autres prestataires
- Veille concurrentielle et sectorielle mensuelle

#### Section "Tarification"
- **À partir de [À COMPLÉTER PAR LAURENT]€ / mois HT** (récurrent)
- Petite étoile : *Tarif pour une PME avec un dispositif marketing existant à piloter. Si création complète du dispositif, à combiner avec Site web + Acquisition.*
- Engagement minimum recommandé : 12 mois (le pilotage prend tout son sens dans la durée).

#### Section "Combinaisons recommandées"
- **← Stratégie** : le pilotage exécute ce que la stratégie a tranché
- **← Site web** : le pilotage optimise le site dans la durée
- **← Acquisition** : le pilotage fait évoluer les leviers d'acquisition selon les résultats

Le pilotage est **transversal à tout** : il est inclus dans toute mission long terme.

#### FAQ pilier
1. **Pouvez-vous remplacer un CMO interne ?**
   *Sur la fonction marketing opérationnelle : oui, intégralement. Sur la fonction marketing stratégique de très haut niveau (M&A, transformation profonde) : nous intervenons en complément d'une direction interne ou d'un dirigeant impliqué.*

2. **Êtes-vous présents physiquement chez nous ?**
   *Par défaut, en distanciel + 1 jour de présence physique par mois. Au besoin et selon proximité géographique, présence physique plus régulière.*

3. **Que se passe-t-il si on n'est pas satisfaits ?**
   *Préavis 3 mois sans justification. Si problème avéré : 0 préavis, départ propre. Nous n'avons aucun intérêt à retenir un client mécontent.*

#### CTA final
- Titre : `Prêt à industrialiser votre marketing ?`
- Sous-titre : `Un échange pour identifier si une direction marketing externalisée fait sens pour votre PME.`
- CTA : `Démarrer →` (vers /contact.html?pilier=pilotage)

---

# 📌 RECAPITULATIF DE L'ORDRE D'EXÉCUTION

### Phase 1 — Pages indispensables (3 pages, 1 semaine)
1. `/contact.html`
2. `/mentions-legales.html` (bloqué tant que infos juridiques manquantes)
3. `/cgv.html` (relecture juriste recommandée)

### Phase 2 — Pages secteurs (6 pages, 2-3 semaines)
1. `/secteurs/retail.html`
2. `/secteurs/sante-pharma.html`
3. `/secteurs/finance.html`
4. `/secteurs/it-saas.html`
5. `/secteurs/energies.html`
6. `/secteurs/conseil-b2b.html`

### Phase 3 — Pages piliers (5 pages, 2 semaines)
1. `/piliers/site-web.html` (le plus important — business principal)
2. `/piliers/strategie.html`
3. `/piliers/identite.html`
4. `/piliers/acquisition.html`
5. `/piliers/pilotage.html`

---

# 🎯 COMMENT UTILISER CE FICHIER AVEC CLAUDE CODE

Pour chaque page, donne un prompt court à Claude Code du type :

```
Crée la page [URL] selon les spécifications de PAGES.md section 
"[Nom de la section]". Réutilise le styles.css existant, ajoute 
les styles spécifiques dans /assets/css/secteurs.css (ou 
piliers.css). Garde le header et footer identiques à index.html.
```

Et tu enchaînes page par page. Tu peux aussi grouper plusieurs pages similaires dans un seul prompt (ex : "fais les 6 pages secteurs d'un coup en suivant la structure commune"), mais je te recommande de **faire 1 page à la fois** pour pouvoir vérifier la qualité avant de passer à la suivante.

---

**Fin du document PAGES.md**

⚠️ Points à compléter avant publication :
- Fourchettes de prix de chaque pilier (à fournir par Laurent)
- Infos juridiques pour les Mentions légales (SIRET, statut, etc.)
- Logos secteurs SaaS, Énergies et Conseil B2B (à choisir avec Laurent)
- Validation des photos hero secteurs (à uploader dans `/assets/img/secteurs/`)
- Relecture juridique des CGV
