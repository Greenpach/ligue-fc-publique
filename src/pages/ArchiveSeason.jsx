import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchSeasonDivisions } from "../api/publicApi";
import "./ArchiveSeason.css";

export default function ArchiveSeason() {
  const { seasonId } = useParams();
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetchSeasonDivisions(seasonId)
      .then((result) => {
        setData(result);
        setStatus("success");
      })
      .catch(() => setStatus("error"));
  }, [seasonId]);

  if (status === "loading") {
    return <p className="archive-season__message">Chargement...</p>;
  }

  if (status === "error") {
    return (
      <p className="archive-season__message archive-season__message--error">
        Impossible de charger cette saison.
      </p>
    );
  }

  return (
    <div className="archive-season">
      <Link to="/archives" className="archive-season__back">
        ‹ Retour aux archives
      </Link>

      <p className="archive-season__breadcrumb">{data.league.name}</p>
      <h1 className="archive-season__title">{data.season.name}</h1>

      <div className="archive-season__divisions">
        {data.divisions.map((division) => (
          <Link
            key={division.id}
            to={`/divisions/${division.id}`}
            className="archive-season__division-card"
          >
            {division.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
