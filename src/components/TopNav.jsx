import { NavLink } from "react-router-dom";
import "./TopNav.css";

export default function TopNav() {
  return (
    <header className="top-nav">
      <span className="top-nav__brand">Ligue FC</span>

      <nav className="top-nav__links">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `top-nav__link ${isActive ? "top-nav__link--active" : ""}`
          }
        >
          Accueil
        </NavLink>
        <NavLink
          to="/archives"
          className={({ isActive }) =>
            `top-nav__link ${isActive ? "top-nav__link--active" : ""}`
          }
        >
          Archives
        </NavLink>
      </nav>
    </header>
  );
}
