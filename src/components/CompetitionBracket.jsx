import { useEffect, useState } from "react";
import { fetchCompetitionBracket } from "../api/publicApi";
import { phaseLabel } from "../utils/competitionLabels";
import "./CompetitionBracket.css";
import PlayerBadge from "./PlayerBadge";

const LEG_LABELS = { 1: "Aller", 2: "Retour" };

// Les deux nombres d'un match, dans l'ordre des joueurs de la carte
// (le mieux classe d'abord) : au retour c'est l'autre joueur qui recoit,
// donc on croise les chiffres pour ne jamais afficher un score a l'envers.
function orient(match, firstPlayerId, home, away) {
  return match.home_player.id === firstPlayerId ? [home, away] : [away, home];
}

// Ligne de detail : "Aller 1-1 · Retour 0-0 · tab 4-3".
function legsSummary(tie) {
  const firstId = tie.players[0].id;

  const parts = tie.legs.map((leg) => {
    const label = LEG_LABELS[leg.leg];
    const isPlayed = leg.status === "validated" || leg.status === "forfeit";

    if (!isPlayed) {
      return label ? `${label} à venir` : "À venir";
    }

    const [a, b] = orient(leg, firstId, leg.home_score, leg.away_score);
    const score = `${a}-${b}${leg.status === "forfeit" ? " (forfait)" : ""}`;

    return label ? `${label} ${score}` : score;
  });

  const shootout = tie.legs.find(
    (leg) => leg.home_penalties != null && leg.away_penalties != null,
  );

  if (shootout) {
    const [a, b] = orient(
      shootout,
      firstId,
      shootout.home_penalties,
      shootout.away_penalties,
    );
    parts.push(`tab ${a}-${b}`);
  }

  return parts.join(" · ");
}

function TieCard({ tie }) {
  return (
    <div className="bracket-tie">
      {tie.players.map((player) => (
        <div
          key={player.id}
          className={`bracket-tie__player${tie.winner_id === player.id ? " bracket-tie__player--winner" : ""}`}
        >
          <span className="bracket-tie__who">
            <PlayerBadge playerId={player.id} name={player.name} size={26} />
            <span className="bracket-tie__name">
              {player.name}
              <span className="bracket-tie__league">{player.league_name}</span>
            </span>
          </span>
          <span className="bracket-tie__goals">{player.goals ?? "-"}</span>
        </div>
      ))}
      <div className="bracket-tie__detail">{legsSummary(tie)}</div>
    </div>
  );
}

export default function CompetitionBracket({ competitionId }) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("success"); // success | error
  const [loadedId, setLoadedId] = useState(null);

  useEffect(() => {
    fetchCompetitionBracket(competitionId)
      .then((response) => {
        setData(response);
        setLoadedId(competitionId);
        setStatus("success");
      })
      .catch(() => {
        setLoadedId(competitionId);
        setStatus("error");
      });
  }, [competitionId]);

  const isLoading = loadedId !== competitionId;

  if (isLoading) {
    return <p className="bracket__message">Chargement...</p>;
  }

  if (status === "error") {
    return (
      <p className="bracket__message">Impossible de charger la phase finale.</p>
    );
  }

  const { phases, champion } = data;
  const hasAnyTie = phases.some((phase) => phase.ties.length > 0);

  if (!hasAnyTie) {
    return (
      <p className="bracket__message">
        La phase finale n'a pas encore commencé.
      </p>
    );
  }

  return (
    <>
      {champion && (
        <p className="bracket__champion">Champion : {champion.name}</p>
      )}

      <div className="bracket">
        {phases.map((phase) => (
          <div key={phase.phase} className="bracket__col">
            <h3 className="bracket__title">{phaseLabel(phase.phase)}</h3>

            <div className="bracket__ties">
              {/* Une case par confrontation attendue : celles pas encore
                  creees s'affichent "a venir" a leur place. */}
              {Array.from({ length: phase.expected_ties }, (_, index) => {
                const tie = phase.ties.find((t) => t.position === index + 1);

                return tie ? (
                  <TieCard key={tie.position} tie={tie} />
                ) : (
                  <div
                    key={`pending-${index}`}
                    className="bracket-tie bracket-tie--pending"
                  >
                    À venir
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
