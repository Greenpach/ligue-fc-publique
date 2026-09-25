import { useState } from "react";
import Sidebar from "../components/Sidebar";
import DateSelector from "../components/DateSelector";
import MatchesToday from "../components/MatchesToday";
import "./Home.css";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(() => new Date());

  return (
    <div className="home">
      <Sidebar />

      <main className="home__content">
        <div className="home__header">
          <div>
            <p className="home__eyebrow">En direct des divisions</p>
            <h1 className="home__title">Matchs du jour</h1>
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
