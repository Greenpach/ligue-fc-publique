import PlayerBadge from "./PlayerBadge";
import { getStandingsZones, getRowZone } from "../utils/standingsZones";
import "./StandingsTable.css";

export default function StandingsTable({
  standings,
  divisionLevel,
  hasLowerDivision,
}) {
  if (standings.length === 0) {
    return (
      <p className="standings-table__empty">
        Aucun joueur dans cette division.
      </p>
    );
  }

  const zones = getStandingsZones({
    divisionLevel,
    hasLowerDivision,
    total: standings.length,
  });

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
              <th>Forme</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((row, index) => {
              const zone = getRowZone(index, zones);

              const rowClassName = zone
                ? `standings-table__row--${zone}`
                : undefined;

              const rankBadgeClassName = [
                "standings-table__rank-badge",
                zone && `standings-table__rank-badge--${zone}`,
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <tr key={row.player_id} className={rowClassName}>
                  <td className="standings-table__rank">
                    <span className={rankBadgeClassName}>{index + 1}</span>
                  </td>
                  <td className="standings-table__player-col">
                    <div className="standings-table__player">
                      <PlayerBadge
                        playerId={row.player_id}
                        name={row.player_name}
                        size={24}
                      />
                      <span>{row.player_name}</span>
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
                  <td>
                    <div className="standings-table__form">
                      {Array.from(
                        { length: 5 },
                        (_, i) => row.form[i] ?? null,
                      ).map((result, i) => (
                        <span
                          key={i}
                          className={
                            result
                              ? `standings-table__form-dot standings-table__form-dot--${result.toLowerCase()}`
                              : "standings-table__form-dot standings-table__form-dot--unknown"
                          }
                        >
                          {result ?? "?"}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="standings-table__legend">
        {zones.hasRelegationZone && (
          <span className="standings-table__legend-item">
            <span className="standings-table__legend-swatch standings-table__legend-swatch--relegation" />
            Zone de relegation
          </span>
        )}
        <span className="standings-table__legend-item">
          <span className="standings-table__legend-swatch standings-table__legend-swatch--promotion" />
          {zones.promotionLabel}
        </span>
      </div>
    </>
  );
}
