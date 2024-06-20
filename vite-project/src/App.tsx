import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import DeltagerList from "./pages/DeltagerList";
import { DeltagerForm } from "./components/DeltagerForm";
import NavHeader from "./components/NavHeader";
function App() {
  return (
    <>
      <NavHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/deltager" element={<DeltagerList />} />
        <Route path="/admin" element={<DeltagerForm />} />
      </Routes>
    </>
  );
}

export default App;
