// Palette cyclique pour les pastilles de couleur par ligue (l'API ne
// fournit pas de couleur, on en assigne une selon l'id de la ligue).
const PALETTE = ["#22c55e", "#3b82f6", "#f59e0b", "#ec4899", "#8b5cf6"];

export function leagueColor(leagueId) {
  return PALETTE[leagueId % PALETTE.length];
}
