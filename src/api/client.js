const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Wrapper fetch minimal : construit l'URL avec ses parametres de query,
 * et transforme un statut HTTP d'echec en erreur JS exploitable —
 * evite de dupliquer cette logique dans chaque appel API.
 */
export async function apiGet(path, params = {}) {
  const url = new URL(`${BASE_URL}${path}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, value);
    }
  });

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Erreur API (${response.status}) sur ${path}`);
  }

  return response.json();
}
