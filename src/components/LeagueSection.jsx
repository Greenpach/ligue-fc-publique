import DivisionMatchCard from "./DivisionMatchCard";
import { leagueColor } from "../utils/leagueColor";
import "./LeagueSection.css";

export default function LeagueSection({ league, divisions, selectedDate }) {
  return (
    <section className="league-section">
      <div className="league-section__header">
        <span
          className="league-section__dot"
          style={{ backgroundColor: leagueColor(league.id) }}
        />
        <h2 className="league-section__title">{league.name}</h2>
      </div>

      {divisions.map(({ division, round, matches }) => (
        <DivisionMatchCard
          key={division.id}
          league={league}
          division={division}
          round={round}
          matches={matches}
          selectedDate={selectedDate}
        />
      ))}
    </section>
  );
}
