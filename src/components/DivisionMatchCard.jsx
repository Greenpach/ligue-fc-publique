import MatchRow from "./MatchRow";
import ShareMatchesButton from "./ShareMatchesButton";
import "./DivisionMatchCard.css";

export default function DivisionMatchCard({
  league,
  division,
  round,
  matches,
  selectedDate,
}) {
  return (
    <div className="division-card">
      <div className="division-card__header">
        <span className="division-card__name">{division.name}</span>
        <ShareMatchesButton
          league={league}
          division={division}
          round={round}
          matches={matches}
          selectedDate={selectedDate}
        />
      </div>

      <div className="division-card__matches">
        {matches.map((match) => (
          <MatchRow key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
}
