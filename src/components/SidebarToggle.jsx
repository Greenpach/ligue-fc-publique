import "./SidebarToggle.css";

export default function SidebarToggle({ isOpen, onToggle }) {
  return (
    <button
      type="button"
      className="sidebar-toggle"
      onClick={onToggle}
      aria-label={
        isOpen ? "Masquer la liste des ligues" : "Afficher la liste des ligues"
      }
      aria-expanded={isOpen}
    >
      <span className="sidebar-toggle__bar" />
      <span className="sidebar-toggle__bar" />
      <span className="sidebar-toggle__bar" />
    </button>
  );
}
