import { useRef, useState } from "react";
import { shareOrDownloadPng } from "../utils/shareImage";
import "./ShareImageButton.css";

// Bouton generique : affiche une carte cachee (children), la transforme
// en image PNG au clic, puis la partage ou la telecharge.
export default function ShareImageButton({
  label,
  fileName,
  title,
  compact = false,
  children,
}) {
  const cardRef = useRef(null);
  const [isBusy, setIsBusy] = useState(false);
  const [message, setMessage] = useState("");

  const handleClick = async () => {
    setIsBusy(true);
    setMessage("");

    try {
      const result = await shareOrDownloadPng(cardRef.current, fileName, title);

      if (result === "downloaded") {
        setMessage("Image téléchargée.");
      }
    } catch (error) {
      console.error("Partage d'image :", error);
      setMessage("Impossible de créer l'image pour le moment.");
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <>
      <div
        className={`share-actions${compact ? " share-actions--compact" : ""}`}
      >
        <button
          type="button"
          className="share-button"
          onClick={handleClick}
          disabled={isBusy}
        >
          {isBusy ? "Création de l'image..." : label}
        </button>
        {message && <span className="share-actions__message">{message}</span>}
      </div>

      {/* Carte rendue hors ecran : c'est elle qui est photographiee. */}
      <div className="share-offscreen" aria-hidden="true">
        <div ref={cardRef}>{children}</div>
      </div>
    </>
  );
}
