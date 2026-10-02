import ShareCardFrame from "./ShareCardFrame";
import PlayerBadge from "./PlayerBadge";
import { leagueColor } from "../utils/leagueColor";
import { formatLongDate } from "../utils/date";

// Moins il y a de matchs, plus on aere les lignes pour que l'image soit
// bien remplie. Avec 9-10 matchs (division de 18-20 joueurs) on resserre
// pour rester proche du format 4:5.
function getSpacing(matchCount) {
  if (matchCount <= 5) {
    return "roomy";
  }

  if (matchCount <= 8) {
    return "normal";
  }

  return "compact";
}

export default function ShareMatchesCard({
  league,
  division,
  round,
  matches,
  selectedDate,
}) {
  return (
    <ShareCardFrame
      leagueId={league.id}
      leagueName={league.name}
      divisionName={division.name}
      subtitle={`Matchs du jour · Journée ${round}`}
      dateLabel={formatLongDate(selectedDate)}
    >
      <div
        className={`share-matches share-matches--${getSpacing(matches.length)}`}
        style={{ borderLeftColor: leagueColor(league.id) }}
      >
        {matches.map((match) => {
          const isPlayed =
            match.status === "validated" || match.status === "forfeit";

          return (
            <div key={match.id} className="share-match">
              <span className="share-match__player share-match__player--home">
                {match.home_player.name}
              </span>
              <PlayerBadge
                playerId={match.home_player.id}
                name={match.home_player.name}
                size={52}
              />

              <div className="share-match__center">
                {isPlayed ? (
                  <>
                    <span className="share-match__score">
                      {match.home_score} - {match.away_score}
                    </span>
                    <span className="share-match__status share-match__status--played">
                      {match.status === "forfeit" ? "FORFAIT" : "JOUÉ"}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="share-match__vs">VS</span>
                    <span className="share-match__status">À VENIR</span>
                  </>
                )}
              </div>

              <PlayerBadge
                playerId={match.away_player.id}
                name={match.away_player.name}
                size={52}
              />
              <span className="share-match__player">
                {match.away_player.name}
              </span>
            </div>
          );
        })}
      </div>
    </ShareCardFrame>
  );
}
