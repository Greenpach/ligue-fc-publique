import { apiGet } from "./client";

/**
 * Ligues actives, avec leur saison en cours et les divisions de cette
 * saison. Alimente la sidebar.
 */
export function fetchLeagues() {
  return apiGet("/public/leagues");
}

/**
 * Matchs "du jour" pour une date donnee (YYYY-MM-DD), groupes par
 * ligue puis par division.
 */
export function fetchMatchesToday(date) {
  return apiGet("/public/matches/today", { date });
}

/**
 * En-tete d'une division (nom, ligue, saison) pour le fil d'ariane
 * de la page Division.
 */
export function fetchDivision(divisionId) {
  return apiGet(`/public/divisions/${divisionId}`);
}

/**
 * Classement d'une division.
 */
export function fetchDivisionStandings(divisionId) {
  return apiGet(`/public/divisions/${divisionId}/standings`);
}
