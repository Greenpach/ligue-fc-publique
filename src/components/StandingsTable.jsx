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
        </tr>
      </thead>
      <tbody>
        {standings.map((row, index) => {
          // Niveau 1 = division la plus haute : rien a promouvoir au-dessus,
          // seule la relegation (3 derniers) s'applique. A partir du niveau 2,
          // les 3 premiers sont promouvables vers la division du dessus.
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
              <td className="standings-table__player-col">{row.player_name}</td>
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
  );
}
