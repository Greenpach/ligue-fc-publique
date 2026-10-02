import { useRef, useState } from "react";
import ShareStandingsCard from "./ShareStandingsCard";
import { shareOrDownloadPng } from "../utils/shareImage";
import "./ShareStandingsButton.css";

// "Ligue Colosse" + "DIVISION 1" -> "classement-ligue-colosse-division-1.png"
function toFileName(division) {
  const slug = `${division.league.name} ${division.name}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `classement-${slug}.png`;
}

export default function ShareStandingsButton({ division, standings }) {
  const cardRef = useRef(null);
  const [isBusy, setIsBusy] = useState(false);
  const [message, setMessage] = useState("");

  const handleClick = async () => {
    setIsBusy(true);
    setMessage("");

    try {
      const result = await shareOrDownloadPng(
        cardRef.current,
        toFileName(division),
        `Classement ${division.league.name} ${division.name}`,
      );

      if (result === "downloaded") {
        setMessage("Image téléchargée.");
      }
    } catch (error) {
      console.error("Partage du classement :", error);
      setMessage("Impossible de créer l'image pour le moment.");
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <>
      <div className="share-actions">
        <button
          type="button"
          className="share-button"
          onClick={handleClick}
          disabled={isBusy}
        >
          {isBusy ? "Création de l'image..." : "Partager le classement"}
        </button>
        {message && <span className="share-actions__message">{message}</span>}
      </div>

      {/* Carte rendue hors ecran : c'est elle qui est photographiee. */}
      <div className="share-offscreen" aria-hidden="true">
        <div ref={cardRef}>
          <ShareStandingsCard division={division} standings={standings} />
        </div>
      </div>
    </>
  );
}
