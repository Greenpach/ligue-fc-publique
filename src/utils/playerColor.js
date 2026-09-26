// Palette cyclique pour le fond du badge joueur, assignee de facon
// deterministe a partir de l'id (le meme joueur garde toujours la
// meme couleur).
const PALETTE = [
  "#2563eb",
  "#16a34a",
  "#d97706",
  "#dc2626",
  "#7c3aed",
  "#0891b2",
  "#db2777",
  "#65a30d",
];

export function playerColor(playerId) {
  return PALETTE[playerId % PALETTE.length];
}
