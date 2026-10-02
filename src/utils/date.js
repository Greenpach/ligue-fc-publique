/**
 * Ajoute (ou retire, si negatif) un nombre de jours a une date, sans
 * modifier la date d'origine.
 */
export function addDays(date, amount) {
  const result = new Date(date);
  result.setDate(result.getDate() + amount);
  return result;
}

/**
 * Formate une date au format attendu par l'API (YYYY-MM-DD), en se
 * basant sur les composants LOCAUX de la date (pas UTC) pour eviter
 * qu'un decalage de fuseau horaire fasse changer le jour.
 */
export function toApiDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Formate une date pour l'affichage du selecteur ("25 avr.").
 */
export function formatShortDate(date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
  }).format(date);
}

/**
 * Formate une date en toutes lettres ("2 octobre 2026"), pour les
 * images de partage.
 */
export function formatLongDate(date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
