import DivisionMatchCard from "./DivisionMatchCard";
import { leagueColor } from "../utils/leagueColor";
import "./LeagueSection.css";

export default function LeagueSection({ league, divisions }) {
  return (
    <section className="league-section">
      <div className="league-section__header">
        <span
          className="league-section__dot"
          style={{ backgroundColor: leagueColor(league.id) }}
        />
        <h2 className="league-section__title">{league.name}</h2>
      </div>

      {divisions.map(({ division, matches }) => (
        <DivisionMatchCard
          key={division.id}
          division={division}
          matches={matches}
        />
      ))}
    </section>
  );
}
