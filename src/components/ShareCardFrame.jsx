import { leagueColor } from "../utils/leagueColor";
import "./ShareCard.css";

// Assombrit une couleur hexadecimale pour que le texte blanc de la
// pastille de division reste lisible meme sur les couleurs claires.
function darken(hex, factor = 0.72) {
  const value = parseInt(hex.slice(1), 16);
  const r = Math.round(((value >> 16) & 255) * factor);
  const g = Math.round(((value >> 8) & 255) * factor);
  const b = Math.round((value & 255) * factor);
  return `rgb(${r}, ${g}, ${b})`;
}

export default function ShareCardFrame({
  leagueId,
  leagueName,
  divisionName,
  subtitle,
  dateLabel,
  children,
}) {
  return (
    <div className="share-card">
      <div className="share-card__header">
        <div className="share-card__brand">
          <img className="share-card__logo" src="/favicon.png" alt="" />
          <span>Ligue FC</span>
        </div>
        <span className="share-card__date">{dateLabel}</span>
      </div>

      <div className="share-card__title-block">
        <h2 className="share-card__league">{leagueName}</h2>
        <span
          className="share-card__division"
          style={{ backgroundColor: darken(leagueColor(leagueId)) }}
        >
          {divisionName}
        </span>
        <p className="share-card__subtitle">{subtitle}</p>
      </div>

      <div className="share-card__body">{children}</div>

      <p className="share-card__footer">{window.location.host}</p>
    </div>
  );
}
