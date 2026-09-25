/**
 * Deduit un badge court a partir du nom de la ligue, ex. "Ligue 1" -> "L1".
 * Si le nom ne suit pas ce format, on retombe sur les 2 premieres lettres.
 */
export function leagueInitials(name) {
  const parts = name.trim().split(/\s+/);
  const lastPart = parts[parts.length - 1];

  if (parts.length >= 2 && /^\d+$/.test(lastPart)) {
    return `${parts[0][0].toUpperCase()}${lastPart}`;
  }

  return name.slice(0, 2).toUpperCase();
}
