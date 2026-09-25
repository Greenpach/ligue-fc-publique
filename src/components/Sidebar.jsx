import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchLeagues } from "../api/publicApi";
import { leagueColor } from "../utils/leagueColor";
import { leagueInitials } from "../utils/leagueInitials";
import "./Sidebar.css";

export default function Sidebar() {
  const [leagues, setLeagues] = useState([]);
  const [openLeagueIds, setOpenLeagueIds] = useState(new Set());

  useEffect(() => {
    fetchLeagues()
      .then((response) => setLeagues(response.data))
      .catch(() => setLeagues([]));
  }, []);

  const toggleLeague = (leagueId) => {
    setOpenLeagueIds((current) => {
      const next = new Set(current);
      if (next.has(leagueId)) {
        next.delete(leagueId);
      } else {
        next.add(leagueId);
      }
      return next;
    });
  };

  return (
    <aside className="sidebar">
      <p className="sidebar__section-title">Ligues</p>

      <nav className="sidebar__list">
        {leagues.map((league) => {
          const isOpen = openLeagueIds.has(league.id);
          const divisions = league.current_season?.divisions ?? [];

          return (
            <div key={league.id} className="sidebar__league">
              <button
                type="button"
                className="sidebar__league-button"
                onClick={() => toggleLeague(league.id)}
              >
                <span
                  className="sidebar__league-badge"
                  style={{ backgroundColor: leagueColor(league.id) }}
                >
                  {leagueInitials(league.name)}
                </span>
                <span className="sidebar__league-name">{league.name}</span>
                <span
                  className={`sidebar__chevron ${isOpen ? "sidebar__chevron--open" : ""}`}
                >
                  ›
                </span>
              </button>

              {isOpen && divisions.length > 0 && (
                <div className="sidebar__divisions">
                  {divisions.map((division) => (
                    <Link
                      key={division.id}
                      to={`/divisions/${division.id}`}
                      className="sidebar__division"
                    >
                      {division.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
