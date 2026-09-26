// Palette cyclique pour le fond du badge joueur, assignee de facon
// deterministe a partir de l'id (le meme joueur garde toujours la
// meme couleur). 20 couleurs pour couvrir le maximum de joueurs actifs
// d'une division (regle metier admin : jusqu'a 20) sans repetition.
const PALETTE = [
  "#2563eb",
  "#16a34a",
  "#d97706",
  "#dc2626",
  "#7c3aed",
  "#0891b2",
  "#db2777",
  "#65a30d",
  "#0d9488",
  "#ca8a04",
  "#9333ea",
  "#e11d48",
  "#059669",
  "#4f46e5",
  "#ea580c",
  "#0284c7",
  "#be123c",
  "#15803d",
  "#7e22ce",
  "#b45309",
];

export function playerColor(playerId) {
  return PALETTE[playerId % PALETTE.length];
}
