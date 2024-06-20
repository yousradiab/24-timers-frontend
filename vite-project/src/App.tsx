import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import DeltagerList from "./pages/DeltagerList";
import { DeltagerForm } from "./components/DeltagerForm";
import NavHeader from "./components/NavHeader";
import UpdateDeltagerForm from "./components/UpdateDeltagerForm";
import RegisterResultForm from "./components/RegisterResultForm";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <>
      <NavHeader />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/deltager" element={<DeltagerList />} />
          <Route path="/admin" element={<DeltagerForm />} />
          <Route path="/deltager/:id/edit" element={<UpdateDeltagerForm />} />

          <Route
            path="/registerResultForm"
            element={<RegisterResultForm />} // Kontrollér denne rute
          />
        </Routes>
      </ErrorBoundary>
    </>
  );
}

export default App;
