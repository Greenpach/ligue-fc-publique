import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Division from "./pages/Division";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/divisions/:id" element={<Division />} />
    </Routes>
  );
}

export default App;
