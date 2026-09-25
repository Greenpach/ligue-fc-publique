import "./MatchRow.css";

export default function MatchRow({ match }) {
  const isPlayed = match.status === "validated" || match.status === "forfeit";

  return (
    <div className="match-row">
      <span className="match-row__round">J{match.round}</span>

      <span className="match-row__player match-row__player--home">
        {match.home_player.name}
      </span>
      <span className="match-row__avatar" />

      <div className="match-row__center">
        {isPlayed ? (
          <>
            <span className="match-row__score">
              {match.home_score} - {match.away_score}
            </span>
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

      <span className="match-row__avatar" />
      <span className="match-row__player match-row__player--away">
        {match.away_player.name}
      </span>
    </div>
  );
}
