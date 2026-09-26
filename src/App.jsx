import { Routes, Route } from "react-router-dom";
import TopNav from "./components/TopNav";
import Home from "./pages/Home";
import Division from "./pages/Division";
import Archives from "./pages/Archives";
import ArchiveSeason from "./pages/ArchiveSeason";

function App() {
  return (
    <>
      <TopNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/divisions/:id" element={<Division />} />
        <Route path="/archives" element={<Archives />} />
        <Route path="/archives/seasons/:seasonId" element={<ArchiveSeason />} />
      </Routes>
    </>
  );
}

export default App;
