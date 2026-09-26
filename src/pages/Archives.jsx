import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchLeagues, fetchLeagueSeasons } from "../api/publicApi";
import "./Archives.css";

export default function Archives() {
  const [leaguesWithSeasons, setLeaguesWithSeasons] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetchLeagues()
      .then(async (response) => {
        const entries = await Promise.all(
          response.data.map(async (league) => {
            const seasons = await fetchLeagueSeasons(league.id);
            return {
              league,
              seasons: seasons.filter((season) => season.status === "finished"),
            };
          }),
        );

        setLeaguesWithSeasons(
          entries.filter((entry) => entry.seasons.length > 0),
        );
        setStatus("success");
      })
      .catch(() => setStatus("error"));
  }, []);

  if (status === "loading") {
    return <p className="archives__message">Chargement...</p>;
  }

  if (status === "error") {
    return (
      <p className="archives__message archives__message--error">
        Impossible de charger les archives.
      </p>
    );
  }

  return (
    <div className="archives">
      <p className="archives__eyebrow">Historique</p>
      <h1 className="archives__title">Archives</h1>

      {leaguesWithSeasons.length === 0 ? (
        <p className="archives__message">
          Aucune saison cloturee pour l'instant.
        </p>
      ) : (
        leaguesWithSeasons.map(({ league, seasons }) => (
          <section key={league.id} className="archives__league">
            <h2 className="archives__league-title">{league.name}</h2>
            <div className="archives__seasons">
              {seasons.map((season) => (
                <Link
                  key={season.id}
                  to={`/archives/seasons/${season.id}`}
                  className="archives__season-card"
                >
                  <span className="archives__season-name">{season.name}</span>
                </Link>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
