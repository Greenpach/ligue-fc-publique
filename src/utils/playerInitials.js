/**
 * Initiales d'un joueur : 1re lettre du 1er mot + 1re lettre du dernier
 * mot du nom (ex. "Joueur 01" -> "J0"). Si le nom n'a qu'un seul mot,
 * on prend ses 2 premieres lettres.
 */
export function playerInitials(name) {
  const parts = name.trim().split(/\s+/);

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
