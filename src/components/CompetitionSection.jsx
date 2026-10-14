import MatchRow from "./MatchRow";
import { roundTitle } from "../utils/competitionLabels";
import "./CompetitionSection.css";

export default function CompetitionSection({ competition, rounds }) {
  return (
    <section className="competition-section">
      <div className="competition-section__header">
        <h2 className="competition-section__title">Ligue des Champions</h2>
        <span className="competition-section__subtitle">
          {competition.name}
        </span>
      </div>

      {rounds.map((round) => (
        <div
          key={`${round.phase}-${round.number}`}
          className="competition-card"
        >
          <div className="competition-card__header">{roundTitle(round)}</div>

          <div className="competition-card__matches">
            {round.matches.map((match) => (
              <MatchRow
                key={match.id}
                match={match}
                showRound={round.phase === "league"}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
