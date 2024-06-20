import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import DeltagerList from "./pages/DeltagerList";
import Hotel from "./pages/Hotel";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/deltager" element={<DeltagerList />} />
        <Route path="/hotels/:id" element={<Hotel />} />
      </Routes>
    </>
  );
}

export default App;
