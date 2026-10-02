import ShareImageButton from "./ShareImageButton";
import ShareMatchesCard from "./ShareMatchesCard";
import { buildShareFileName } from "../utils/shareFileName";
import { toApiDateString } from "../utils/date";

export default function ShareMatchesButton({
  league,
  division,
  round,
  matches,
  selectedDate,
}) {
  return (
    <ShareImageButton
      compact
      label="Partager"
      fileName={buildShareFileName(
        "matchs",
        league.name,
        division.name,
        toApiDateString(selectedDate),
      )}
      title={`Matchs du jour ${league.name} ${division.name}`}
    >
      <ShareMatchesCard
        league={league}
        division={division}
        round={round}
        matches={matches}
        selectedDate={selectedDate}
      />
    </ShareImageButton>
  );
}
