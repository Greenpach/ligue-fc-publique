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
