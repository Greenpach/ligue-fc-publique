import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchDivision, fetchDivisionStandings } from "../api/publicApi";
import StandingsTable from "../components/StandingsTable";
import "./Division.css";

export default function Division() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [division, setDivision] = useState(null);
  const [standings, setStandings] = useState([]);
  const [status, setStatus] = useState("success"); // success | error
  const [loadedId, setLoadedId] = useState(null);

  useEffect(() => {
    Promise.all([fetchDivision(id), fetchDivisionStandings(id)])
      .then(([divisionData, standingsData]) => {
        setDivision(divisionData);
        setStandings(standingsData);
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
    return <p className="division-page__message">Chargement...</p>;
  }

  if (status === "error") {
    return (
      <p className="division-page__message division-page__message--error">
        Impossible de charger cette division.
      </p>
    );
  }

  return (
    <div className="division-page">
      <button
        type="button"
        className="division-page__back"
        onClick={() => navigate(-1)}
      >
        ‹ Retour
      </button>

      <p className="division-page__breadcrumb">
        {division.league.name} · {division.season.name}
      </p>
      <h1 className="division-page__title">{division.name}</h1>

      <StandingsTable
        standings={standings}
        divisionLevel={division.level}
        hasLowerDivision={division.has_lower_division}
      />
    </div>
  );
}
