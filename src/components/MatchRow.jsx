import PlayerBadge from "./PlayerBadge";
import "./MatchRow.css";

export default function MatchRow({ match, showRound = true }) {
  const isPlayed = match.status === "validated" || match.status === "forfeit";

  // Tirs au but : seulement en phase finale, quand le match s'est termine
  // sur un nul. L'API renvoie null pour les matchs de division.
  const hasPenalties =
    match.home_penalties != null && match.away_penalties != null;

  return (
    <div className="match-row">
      {showRound ? (
        <span className="match-row__round">J{match.round}</span>
      ) : (
        <span />
      )}

      <span className="match-row__player match-row__player--home">
        {match.home_player.name}
      </span>
      <span className="match-row__avatar">
        <PlayerBadge
          playerId={match.home_player.id}
          name={match.home_player.name}
          size={32}
        />
      </span>

      <div className="match-row__center">
        {isPlayed ? (
          <>
            <span className="match-row__score">
              {match.home_score} - {match.away_score}
            </span>
            {match.aggregate && (
              <span className="match-row__aggregate">
                (cumul {match.aggregate.home}-{match.aggregate.away})
              </span>
            )}
            {hasPenalties && (
              <span className="match-row__aggregate">
                (tab {match.home_penalties}-{match.away_penalties})
              </span>
            )}
            <span className="match-row__status match-row__status--played">
              {match.status === "forfeit" ? "Forfait" : "Joue"}
            </span>
          </>
        ) : (
          <>
            <span className="match-row__vs">VS</span>
            <span className="match-row__status match-row__status--upcoming">
              A venir
            </span>
          </>
        )}
      </div>

      <span className="match-row__avatar">
        <PlayerBadge
          playerId={match.away_player.id}
          name={match.away_player.name}
          size={32}
        />
      </span>
      <span className="match-row__player match-row__player--away">
        {match.away_player.name}
      </span>
    </div>
  );
}
