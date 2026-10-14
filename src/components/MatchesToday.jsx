import { useEffect, useState } from "react";
import {
  fetchMatchesToday,
  fetchCompetitionMatchesToday,
} from "../api/publicApi";
import { toApiDateString } from "../utils/date";
import LeagueSection from "./LeagueSection";
import CompetitionSection from "./CompetitionSection";
import "./MatchesToday.css";

export default function MatchesToday({ selectedDate }) {
  const dateKey = toApiDateString(selectedDate);

  const [leagues, setLeagues] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [status, setStatus] = useState("success"); // success | error
  const [loadedDateKey, setLoadedDateKey] = useState(null);

  useEffect(() => {
    Promise.all([
      fetchMatchesToday(dateKey),
      // La Ligue des Champions est un "plus" : si sa route echoue, on
      // affiche quand meme les ligues au lieu de casser toute la page.
      fetchCompetitionMatchesToday(dateKey).catch(() => ({
        competitions: [],
      })),
    ])
      .then(([data, competitionData]) => {
        setLeagues(data.leagues);
        setCompetitions(competitionData.competitions);
        setLoadedDateKey(dateKey);
        setStatus("success");
      })
      .catch(() => {
        setLoadedDateKey(dateKey);
        setStatus("error");
      });
  }, [dateKey]);

  // Tant que la reponse recue ne correspond pas a la date actuellement
  // selectionnee, on est en chargement. Cette comparaison remplace un
  // "setStatus('loading')" appele en synchrone au debut de l'effet
  // (deconseille par eslint-plugin-react-hooks : ca peut provoquer un
  // rendu en cascade). Effet secondaire utile : une reponse perimee
  // (l'utilisateur a change de date entre-temps) ne peut jamais s'afficher,
  // puisque sa date ne correspondra plus a dateKey a son arrivee.
  const isLoading = loadedDateKey !== dateKey;

  if (isLoading) {
    return <p className="matches-today__message">Chargement des matchs...</p>;
  }

  if (status === "error") {
    return (
      <p className="matches-today__message matches-today__message--error">
        Impossible de charger les matchs pour le moment.
      </p>
    );
  }

  if (leagues.length === 0 && competitions.length === 0) {
    return (
      <p className="matches-today__message">
        Aucun match prevu pour cette date.
      </p>
    );
  }

  return (
    <div className="matches-today">
      {leagues.map((entry) => (
        <LeagueSection
          key={entry.league.id}
          league={entry.league}
          divisions={entry.divisions}
          selectedDate={selectedDate}
        />
      ))}

      {competitions.map((entry) => (
        <CompetitionSection
          key={entry.competition.id}
          competition={entry.competition}
          rounds={entry.rounds}
        />
      ))}
    </div>
  );
}
