// Noms affichables des phases d'une competition (l'API renvoie des codes).
const PHASE_LABELS = {
  league: "Phase de ligue",
  round_of_32: "Seiziemes de finale",
  round_of_16: "Huitiemes de finale",
  quarter_final: "Quarts de finale",
  semi_final: "Demi-finales",
  final: "Finale",
};

/**
 * Titre d'un tour : "Phase de ligue · J3", "Quarts de finale · Aller"...
 * L'aller/retour se lit sur le match (leg 1 ou 2) : la finale, match
 * unique (leg null), n'a pas de suffixe.
 */
export function roundTitle(round) {
  const label = PHASE_LABELS[round.phase] ?? round.phase;

  if (round.phase === "league") {
    return `${label} · J${round.number}`;
  }

  const leg = round.matches[0]?.leg;

  if (leg === 1) return `${label} · Aller`;
  if (leg === 2) return `${label} · Retour`;

  return label;
}

/**
 * Nom affichable d'une phase ("quarter_final" -> "Quarts de finale").
 */
export function phaseLabel(phase) {
  return PHASE_LABELS[phase] ?? phase;
}
