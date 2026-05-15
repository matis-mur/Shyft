/* ============================================================
   Shyft · Configuration centralisée
   Modifier ici pour mettre à jour tous les prix sur toutes les pages.
   ============================================================ */

window.SHYFT_PRICES = {
  strategie:   { amount: '2 400€',   unit: 'HT',         note: 'À partir de' },
  identite:    { amount: '1 800€',   unit: 'HT',         note: 'À partir de' },
  siteWeb:     { amount: '3 600€',   unit: 'HT',         note: 'À partir de' },
  acquisition: { amount: '900€',     unit: '/mois HT',   note: 'À partir de' },
  pilotage:    { amount: 'Inclus',   unit: 'transversal', note: '' },
  audit:       { amount: '710€',     unit: 'HT',         note: '' }
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-price]').forEach(el => {
    const key = el.dataset.price;
    const price = window.SHYFT_PRICES[key];
    if (!price) return;
    const amountEl = el.querySelector('[data-price-amount]');
    const unitEl   = el.querySelector('[data-price-unit]');
    const noteEl   = el.querySelector('[data-price-note]');
    if (amountEl) amountEl.textContent = price.amount;
    if (unitEl)   unitEl.textContent   = price.unit;
    if (noteEl)   noteEl.textContent   = price.note;
  });
});
