import { useState } from "react";
import Sidebar from "../components/Sidebar";
import SidebarToggle from "../components/SidebarToggle";
import DateSelector from "../components/DateSelector";
import MatchesToday from "../components/MatchesToday";
import "./Home.css";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="home">
      {isSidebarOpen && <Sidebar />}

      <main className="home__content">
        <div className="home__header">
          <div className="home__header-left">
            <SidebarToggle
              isOpen={isSidebarOpen}
              onToggle={() => setIsSidebarOpen((open) => !open)}
            />
            <div>
              <p className="home__eyebrow">En direct des divisions</p>
              <h1 className="home__title">Matchs du jour</h1>
            </div>
          </div>

          <DateSelector
            selectedDate={selectedDate}
            onChange={setSelectedDate}
          />
        </div>

        <MatchesToday selectedDate={selectedDate} />
      </main>
    </div>
  );
}
