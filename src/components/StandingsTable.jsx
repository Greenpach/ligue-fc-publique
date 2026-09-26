import PlayerBadge from "./PlayerBadge";
import "./StandingsTable.css";

export default function StandingsTable({ standings, divisionLevel }) {
  if (standings.length === 0) {
    return (
      <p className="standings-table__empty">
        Aucun joueur dans cette division.
      </p>
    );
  }

  const total = standings.length;

  return (
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
          const isRelegation = index >= total - 3;
          const isPromotion = divisionLevel > 1 && index < 3;

          const rowClassName = [
            isRelegation && "standings-table__row--relegation",
            isPromotion && "standings-table__row--promotion",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <tr key={row.player_id} className={rowClassName || undefined}>
              <td className="standings-table__rank">{index + 1}</td>
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
                  {Array.from({ length: 5 }, (_, i) => row.form[i] ?? null).map(
                    (result, i) => (
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
                    ),
                  )}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
