import { playerInitials } from "../utils/playerInitials";
import { playerColor } from "../utils/playerColor";
import "./PlayerBadge.css";

export default function PlayerBadge({ playerId, name, size = 32 }) {
  return (
    <span
      className="player-badge"
      style={{
        width: size,
        height: size,
        backgroundColor: playerColor(playerId),
        fontSize: Math.round(size * 0.4),
      }}
    >
      {playerInitials(name)}
    </span>
  );
}
