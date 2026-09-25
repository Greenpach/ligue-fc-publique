import MatchRow from "./MatchRow";
import "./DivisionMatchCard.css";

export default function DivisionMatchCard({ division, matches }) {
  return (
    <div className="division-card">
      <div className="division-card__header">
        <span className="division-card__name">{division.name}</span>
      </div>

      <div className="division-card__matches">
        {matches.map((match) => (
          <MatchRow key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
}
