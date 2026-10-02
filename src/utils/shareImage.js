import { toBlob } from "html-to-image";

const GENERATION_TIMEOUT_MS = 15000;

// La librairie ne renvoie jamais d'erreur si le decodage de l'image
// echoue : elle reste simplement en attente. Ce delai garantit qu'on
// finit toujours par afficher un message au lieu de bloquer le bouton.
function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error("La creation de l'image a pris trop de temps")),
        ms,
      ),
    ),
  ]);
}

// Le menu de partage natif n'a de sens que sur telephone/tablette. Sur
// ordinateur, il ouvre une fenetre systeme peu pratique (et parfois
// cachee) : on prefere telecharger directement le fichier.
function isMobileDevice() {
  return (
    navigator.maxTouchPoints > 0 &&
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
  );
}

/**
 * Transforme un element de la page en image PNG, puis la partage via le
 * menu natif du telephone (WhatsApp, Instagram...) si c'est possible,
 * sinon la telecharge. Retourne "shared", "downloaded" ou "cancelled".
 */
export async function shareOrDownloadPng(node, filename, title) {
  const blob = await withTimeout(
    toBlob(node, { pixelRatio: 1, cacheBust: true, skipFonts: true }),
    GENERATION_TIMEOUT_MS,
  );

  if (!blob) {
    throw new Error("Impossible de generer l'image");
  }

  const file = new File([blob], filename, { type: "image/png" });

  if (isMobileDevice() && navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title });
      return "shared";
    } catch (error) {
      if (error.name === "AbortError") {
        return "cancelled";
      }
      // Partage refuse (ex. delai trop long apres le clic) : on retombe
      // sur le telechargement ci-dessous.
    }
  }

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);

  return "downloaded";
}
