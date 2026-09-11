/* ============================================
   ENVOI DU FORMULAIRE DE CONTACT
   Fonction serverless Vercel, sans aucune dépendance npm : l'API Resend est
   appelée en REST avec le fetch natif de Node. Rien à installer, rien à
   construire, le site reste un site statique.

   Variables d'environnement à définir dans Vercel :
     RESEND_API_KEY   obligatoire, sinon la fonction répond 503 et le
                      formulaire bascule sur le mailto: de secours
     CONTACT_TO       facultatif, destinataire (défaut : contact@shyft.fr)
     CONTACT_FROM     facultatif, expéditeur vérifié chez Resend
   ============================================ */

const LIMITE_COURT = 200;
const LIMITE_LONG = 5000;
// Un humain ne remplit pas un formulaire en moins de trois secondes.
const DELAI_MINIMUM_MS = 3000;

const nettoyer = (v, max) => String(v == null ? '' : v).trim().slice(0, max);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ erreur: 'Méthode non autorisée.' });
  }

  const cle = process.env.RESEND_API_KEY;
  if (!cle) {
    // Pas encore configuré : le front bascule sur le mailto: plutôt que de
    // laisser le visiteur devant un bouton mort.
    return res.status(503).json({ erreur: 'Envoi non configuré.' });
  }

  let d = req.body;
  if (typeof d === 'string') {
    try { d = JSON.parse(d); } catch (_) { d = {}; }
  }
  d = d || {};

  // Pot de miel : champ invisible, seul un robot le remplit. On répond succès
  // pour ne pas lui apprendre qu'il a été repéré.
  if (nettoyer(d.site, 50)) return res.status(200).json({ ok: true });

  const ouvertA = Number(d.ouvertA);
  if (ouvertA && Date.now() - ouvertA < DELAI_MINIMUM_MS) {
    return res.status(200).json({ ok: true });
  }

  const nom = nettoyer([d.prenom, d.nom].filter(Boolean).join(' '), LIMITE_COURT);
  const email = nettoyer(d.email, LIMITE_COURT);
  const societe = nettoyer(d.societe, LIMITE_COURT);
  const message = nettoyer(d.message, LIMITE_LONG);
  const perimetre = Array.isArray(d.perimetre)
    ? d.perimetre.map(function (p) { return nettoyer(p, 60); }).filter(Boolean).join(', ')
    : nettoyer(d.perimetre, LIMITE_COURT);
  const source = nettoyer(d.source, LIMITE_COURT) || 'shyft.fr';

  const manquants = [];
  if (!nom) manquants.push('nom');
  if (!email) manquants.push('email');
  if (!message) manquants.push('message');
  if (manquants.length) {
    return res.status(400).json({ erreur: 'Champs manquants : ' + manquants.join(', ') + '.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return res.status(400).json({ erreur: 'Adresse electronique invalide.' });
  }

  const corps = [
    nom + (societe ? ' · ' + societe : ''),
    'Email : ' + email,
    perimetre ? 'Périmètre : ' + perimetre : null,
    '',
    'Message :',
    message,
    '',
    '···',
    'Envoyé depuis ' + source
  ].filter(function (l) { return l !== null; }).join('\n');

  try {
    const reponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + cle,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || 'Formulaire Shyft <formulaire@shyft.fr>',
        to: [process.env.CONTACT_TO || 'contact@shyft.fr'],
        reply_to: email,
        subject: 'Projet Shyft · ' + (societe || nom),
        text: corps
      })
    });

    if (!reponse.ok) {
      console.error('Resend a refuse l\'envoi :', reponse.status, await reponse.text());
      return res.status(502).json({ erreur: "L'envoi a échoué." });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('Erreur reseau vers Resend :', e);
    return res.status(502).json({ erreur: "L'envoi a échoué." });
  }
};
