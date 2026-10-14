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
/**
 * Toutes les saisons d'une ligue (toutes statuts confondus).
 */
export function fetchLeagueSeasons(leagueId) {
  return apiGet(`/public/leagues/${leagueId}/seasons`);
}

/**
 * Divisions d'une saison, avec son contexte ligue.
 */
export function fetchSeasonDivisions(seasonId) {
  return apiGet(`/public/seasons/${seasonId}/divisions`);
}


/**
 * Matchs "du jour" des competitions (Ligue des Champions) pour une date
 * donnee (YYYY-MM-DD). Un tour s'affiche si la date est dans ses dates.
 */
export function fetchCompetitionMatchesToday(date) {
  return apiGet("/public/competitions/matches-today", { date });
}

/**
 * Competitions visibles du public (hors brouillons), les plus recentes
 * d'abord.
 */
export function fetchCompetitions() {
  return apiGet("/public/competitions");
}

/**
 * Classement de la phase de ligue d'une competition.
 */
export function fetchCompetitionStandings(competitionId) {
  return apiGet(`/public/competitions/${competitionId}/standings`);
}

/**
 * Tableau de la phase finale d'une competition.
 */
export function fetchCompetitionBracket(competitionId) {
  return apiGet(`/public/competitions/${competitionId}/bracket`);
}