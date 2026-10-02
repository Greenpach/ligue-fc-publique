import { toBlob } from "html-to-image";

/**
 * Transforme un element de la page en image PNG, puis la partage via le
 * menu natif du telephone (WhatsApp, Instagram...) si c'est possible,
 * sinon la telecharge. Retourne "shared", "downloaded" ou "cancelled".
 */
export async function shareOrDownloadPng(node, filename, title) {
  const blob = await toBlob(node, { pixelRatio: 1, cacheBust: true });

  if (!blob) {
    throw new Error("Impossible de generer l'image");
  }

  const file = new File([blob], filename, { type: "image/png" });

  // Le menu de partage natif peut etre refuse si la generation de
  // l'image a pris trop de temps apres le clic : dans ce cas on retombe
  // simplement sur le telechargement.
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title });
      return "shared";
    } catch (error) {
      if (error.name === "AbortError") {
        return "cancelled";
      }
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
