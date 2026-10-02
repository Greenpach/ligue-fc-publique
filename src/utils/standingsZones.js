/**
 * Regles d'affichage des zones du classement (cahier des charges §10),
 * partagees par le tableau du site et l'image de partage : ainsi les
 * deux ne peuvent jamais afficher des zones differentes.
 */
export function getStandingsZones({ divisionLevel, hasLowerDivision, total }) {
  const isTopDivision = divisionLevel === 1;

  return {
    promotionCount: isTopDivision ? 4 : 3,
    promotionLabel: isTopDivision
      ? "Qualifié pour la Ligue des Champions"
      : "Zone de promotion",
    hasRelegationZone: Boolean(hasLowerDivision),
    relegationStartIndex: total - 3,
  };
}

/**
 * Zone d'une ligne du classement : "promotion", "relegation" ou null.
 * La promotion est testee en premier, comme avant, pour les toutes
 * petites divisions ou les deux zones se chevaucheraient.
 */
export function getRowZone(index, zones) {
  if (index < zones.promotionCount) {
    return "promotion";
  }

  if (zones.hasRelegationZone && index >= zones.relegationStartIndex) {
    return "relegation";
  }

  return null;
}
