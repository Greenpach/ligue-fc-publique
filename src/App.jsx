import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* La route "/divisions/:id" sera ajoutee avec la page Division */}
    </Routes>
  );
}

export default App;
