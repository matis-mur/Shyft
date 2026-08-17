# CLAUDE.md — Shyft

## Le projet

Shyft est une agence web française fondée par Matis, Noé, Laurent et Anne-Carole. Ce dépôt est son site vitrine : il vend des sites sur-mesure optimisés pour la conversion à des dirigeants de PME (plus de 1 M€ de CA), avec quatre briques additionnelles : stratégie, identité, acquisition, pilotage. La cible est senior : sobriété et crédibilité priment, aucun gadget, rien qui « fasse IA ».

## Stack et hébergement

- HTML / CSS / JS vanilla. **Zéro build, zéro dépendance, zéro framework.** Ça doit le rester.
- Hébergé sur **Vercel**, domaine **https://shyft.fr**. Chaque push sur `main` déploie automatiquement en ~20 s.
- **URLs propres** : `cleanUrls: true` dans `vercel.json`. Tous les liens internes sont absolus et sans `.html` (`/secteurs/retail`). Les fichiers sur le disque gardent leur extension. Ne jamais réintroduire de lien en `.html` ou en relatif.
- Conséquence : l'aperçu local par double-clic ne marche plus. Tester avec `python3 -m http.server 8000` depuis la racine.

## Structure

- 18 pages HTML : `index`, `services`, `secteurs`, `agence`, `contact`, `mentions-legales`, `404`, 5 pages `piliers/`, 6 pages `secteurs/`
- `assets/css/styles.css` : un seul fichier CSS pour tout le site (~5 800 lignes)
- `assets/js/` : `main.js` (nav, curseur, menu mobile), `motion.js` (reveals, accordéon piliers), `config.js`
- `assets/templates/` : 9 maquettes de démonstration autonomes. **Hors périmètre : ne jamais les modifier.** Exclues de l'indexation via `robots.txt`.
- `sitemap.xml` : 17 URLs. À mettre à jour à chaque ajout ou suppression de page.
- `EVOL.md` et `PAGES.md` : specs historiques de la refonte, **partiellement obsolètes** (CGV supprimées, GitHub Pages abandonné, emails en @shyft.fr). Utiles pour comprendre le pourquoi des décisions, pas comme état des lieux.

## Design system

Variables CSS dans `:root` de `styles.css` :

- Couleurs : `--oxblood` #3A0F12 (fond principal), `--oxblood-deep` #1F0608, `--cream` #F2EBDC, `--gold` #D4A537 (couleur d'action, exclusive aux CTAs), `--burnt`
- Chaque page secteur a un `--accent` propre, posé par une classe `is-*` sur le body ; l'accent ne remplace jamais l'or sur les CTAs
- Polices : Satoshi (`--font-display`), Fraunces (`--font-editorial`), Sirage (`--font-emphasis`, manuscrite), JetBrains Mono (`--font-mono`, labels)
- Classes d'état posées par JS : `is-open`, `has-open`, `is-visible`, `cursor-on-gold`. Les vérifier dans les JS avant de déclarer une classe CSS orpheline.

## Règles absolues

1. **Jamais de tiret cadratin** nulle part : ni dans le site, ni dans les commits, ni dans les textes proposés.
2. **Jamais le mot « studio »** : Shyft est une agence.
3. **Ne jamais pusher sans demande explicite de Matis.** Commits locaux OK.
4. Tout le contenu, les commentaires de code et les messages de commit sont **en français**.
5. Aucune promesse contractuelle dans les textes : pas de « prix fixe », pas de « délai garanti ». Les prix sont « à partir de », les délais indicatifs.
6. Ne pas revendiquer les grandes marques (UPSA, Bioderma, Auchan…) comme clientes de Shyft : c'est l'expérience passée de la direction stratégie, formulée prudemment, uniquement sur les pages secteurs.
7. Email de contact : `contact@shyft.fr`, toujours obfusqué en entités HTML dans les `mailto:`.

## Zones fragiles (tester après toute modification)

- **Roue orbitale des 5 piliers** (index, desktop) : animation continue + accordéon + pause au clic + z-index. L'équivalent mobile est un accordéon `.duo` séparé, affiché sous 900 px.
- **Modal profil** (agence) : bug historique d'overlay invisible bloquant toute la page, corrigé par `.profil-overlay[hidden] { display: none !important }`. Ne pas toucher à cette règle.
- **Curseur personnalisé** : doré par défaut, oxblood sur surfaces dorées via la classe JS `cursor-on-gold`. Volontairement sans interpolation (cible senior : pas de latence).
- **Menu mobile** : ouvert par un clic sur le logo, pas par un burger.
- **Méga-menu** nav desktop (Services + Secteurs déroulants).
- Reveals IntersectionObserver sur toutes les pages.

## Vérifications avant tout commit

- Aucun tiret cadratin ni « studio » introduit
- Liens internes : absolus, sans `.html`, cible existante sur le disque
- Si une page est ajoutée ou supprimée : `sitemap.xml` mis à jour (URLs sans `.html`)
- Balises `canonical` et `og:url` au format `https://shyft.fr/...` sans `.html`
