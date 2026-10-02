import ShareImageButton from "./ShareImageButton";
import ShareStandingsCard from "./ShareStandingsCard";
import { buildShareFileName } from "../utils/shareFileName";

export default function ShareStandingsButton({ division, standings }) {
  return (
    <ShareImageButton
      label="Partager le classement"
      fileName={buildShareFileName(
        "classement",
        division.league.name,
        division.name,
      )}
      title={`Classement ${division.league.name} ${division.name}`}
    >
      <ShareStandingsCard division={division} standings={standings} />
    </ShareImageButton>
  );
}
