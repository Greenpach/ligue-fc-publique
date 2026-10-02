import ShareCardFrame from "./ShareCardFrame";
import { getStandingsZones, getRowZone } from "../utils/standingsZones";
import { formatLongDate } from "../utils/date";

export default function ShareStandingsCard({ division, standings }) {
  const zones = getStandingsZones({
    divisionLevel: division.level,
    hasLowerDivision: division.has_lower_division,
    total: standings.length,
  });

  return (
    <ShareCardFrame
      leagueId={division.league.id}
      leagueName={division.league.name}
      divisionName={division.name}
      subtitle="Classement"
      dateLabel={formatLongDate(new Date())}
    >
      <div className="share-table">
        <div className="share-table__row share-table__row--head">
          <span>#</span>
          <span className="share-table__name">JOUEUR</span>
          <span>MJ</span>
          <span>V</span>
          <span>N</span>
          <span>D</span>
          <span>PTS</span>
          <span>FORME</span>
        </div>

        {standings.map((row, index) => {
          const zone = getRowZone(index, zones);

          return (
            <div
              key={row.player_id}
              className={`share-table__row${zone ? ` share-table__row--${zone}` : ""}`}
            >
              <span
                className={`share-table__rank${zone ? ` share-table__rank--${zone}` : ""}`}
              >
                {index + 1}
              </span>
              <span className="share-table__name">{row.player_name}</span>
              <span>{row.mj}</span>
              <span>{row.v}</span>
              <span>{row.n}</span>
              <span>{row.d}</span>
              <span className="share-table__points">{row.points}</span>
              <span className="share-table__form">
                {Array.from({ length: 5 }, (_, i) => row.form[i] ?? null).map(
                  (result, i) => (
                    <span
                      key={i}
                      className={`share-table__dot share-table__dot--${result ? result.toLowerCase() : "unknown"}`}
                    >
                      {result ?? "?"}
                    </span>
                  ),
                )}
              </span>
            </div>
          );
        })}
      </div>

      <div className="share-legend">
        {zones.hasRelegationZone && (
          <span className="share-legend__item">
            <span className="share-legend__swatch share-legend__swatch--relegation" />
            Zone de relégation
          </span>
        )}
        <span className="share-legend__item">
          <span className="share-legend__swatch share-legend__swatch--promotion" />
          {zones.promotionLabel}
        </span>
      </div>
    </ShareCardFrame>
  );
}
