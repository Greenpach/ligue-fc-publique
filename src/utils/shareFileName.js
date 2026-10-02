/**
 * Construit un nom de fichier propre pour une image partagee, sans
 * accents ni espaces : ("classement", "Ligue 1", "D1")
 * -> "classement-ligue-1-d1.png".
 */
export function buildShareFileName(prefix, ...parts) {
  const slug = parts
    .join(" ")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `${prefix}-${slug}.png`;
}
