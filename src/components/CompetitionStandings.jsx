import { useEffect, useState } from "react";
import { fetchCompetitionStandings } from "../api/publicApi";
import PlayerBadge from "./PlayerBadge";
import "./StandingsTable.css";
import "./CompetitionStandings.css";

export default function CompetitionStandings({ competitionId }) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("success"); // success | error
  const [loadedId, setLoadedId] = useState(null);

  useEffect(() => {
    fetchCompetitionStandings(competitionId)
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
    return <p className="standings-table__empty">Chargement...</p>;
  }

  if (status === "error") {
    return (
      <p className="standings-table__empty">
        Impossible de charger le classement.
      </p>
    );
  }

  const { standings, qualification_size: qualificationSize } = data;

  if (standings.length === 0) {
    return (
      <p className="standings-table__empty">
        Aucun joueur dans cette competition.
      </p>
    );
  }

  return (
    <>
      <div className="standings-table-wrapper">
        <table className="standings-table">
          <thead>
            <tr>
              <th>#</th>
              <th className="standings-table__player-col">Joueur</th>
              <th>MJ</th>
              <th>V</th>
              <th>N</th>
              <th>D</th>
              <th>BP</th>
              <th>BC</th>
              <th>Diff</th>
              <th>Pts</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((row) => {
              const rankBadgeClassName = [
                "standings-table__rank-badge",
                row.in_qualification_zone &&
                  "standings-table__rank-badge--promotion",
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <tr
                  key={row.player_id}
                  className={
                    row.in_qualification_zone
                      ? "standings-table__row--promotion"
                      : undefined
                  }
                >
                  <td className="standings-table__rank">
                    <span className={rankBadgeClassName}>
                      {row.rank}
                      {row.ex_aequo && "="}
                    </span>
                  </td>
                  <td className="standings-table__player-col">
                    <div className="standings-table__player">
                      <PlayerBadge
                        playerId={row.player_id}
                        name={row.player_name}
                        size={24}
                      />
                      <div>
                        <span>{row.player_name}</span>
                        <span className="competition-standings__league">
                          {row.league_name}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>{row.mj}</td>
                  <td>{row.v}</td>
                  <td>{row.n}</td>
                  <td>{row.d}</td>
                  <td>{row.bp}</td>
                  <td>{row.bc}</td>
                  <td>{row.diff > 0 ? `+${row.diff}` : row.diff}</td>
                  <td className="standings-table__points">{row.points}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="standings-table__legend">
        <span className="standings-table__legend-item">
          <span className="standings-table__legend-swatch standings-table__legend-swatch--promotion" />
          Qualifié pour la phase finale (top {qualificationSize})
        </span>
        {standings.some((row) => row.ex_aequo) && (
          <span className="standings-table__legend-item">= ex æquo</span>
        )}
      </div>

      <p className="standings-table__tiebreak">
        Départage : points, différence de buts, buts marqués, buts marqués à
        l'extérieur, victoires, victoires à l'extérieur.
      </p>
    </>
  );
}
