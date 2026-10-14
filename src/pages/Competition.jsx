import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCompetitions } from "../api/publicApi";
import SlideSwitch from "../components/SlideSwitch";
import "./Competition.css";
import CompetitionStandings from "../components/CompetitionStandings";

const VIEWS = [
  { value: "standings", label: "Classement" },
  { value: "bracket", label: "Phase finale" },
];

export default function Competition() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [competition, setCompetition] = useState(null);
  const [status, setStatus] = useState("success"); // success | error
  const [loadedId, setLoadedId] = useState(null);
  const [view, setView] = useState("standings");

  useEffect(() => {
    // Pas de route "une seule competition" cote API : on prend la liste
    // publique (petite, brouillons exclus) et on y cherche l'id.
    fetchCompetitions()
      .then((response) => {
        setCompetition(
          response.data.find((item) => String(item.id) === id) ?? null,
        );
        setLoadedId(id);
        setStatus("success");
      })
      .catch(() => {
        setLoadedId(id);
        setStatus("error");
      });
  }, [id]);

  const isLoading = loadedId !== id;

  if (isLoading) {
    return <p className="competition-page__message">Chargement...</p>;
  }

  if (status === "error") {
    return (
      <p className="competition-page__message competition-page__message--error">
        Impossible de charger cette competition.
      </p>
    );
  }

  if (!competition) {
    return (
      <p className="competition-page__message">Competition introuvable.</p>
    );
  }

  return (
    <div className="competition-page">
      <button
        type="button"
        className="competition-page__back"
        onClick={() => navigate(-1)}
      >
        ‹ Retour
      </button>

      <p className="competition-page__breadcrumb">{competition.name}</p>
      <h1 className="competition-page__title">Ligue des Champions</h1>

      <SlideSwitch options={VIEWS} value={view} onChange={setView} />

      <div className="competition-page__content">
        {view === "standings" ? (
          <CompetitionStandings competitionId={id} />
        ) : (
          <p className="competition-page__message">Phase finale a venir.</p>
        )}
      </div>
    </div>
  );
}
