import { Route, Routes } from "react-router-dom";
import DeltagerList from "./pages/DeltagerList";
import { DeltagerForm } from "./components/DeltagerForm";
import NavHeader from "./components/NavHeader";
import UpdateDeltagerForm from "./components/UpdateDeltagerForm";
import ErrorBoundary from "./components/ErrorBoundary";
import DeltagerDetails from "./components/DeltagerDetails";

function App() {
  return (
    <>
      <NavHeader />
      <ErrorBoundary>
        <Routes>
          <Route path="/deltager" element={<DeltagerList />} />
          <Route path="/admin" element={<DeltagerForm />} />
          <Route path="/deltager/:id/edit" element={<UpdateDeltagerForm />} />
          <Route path="/deltager/:id" element={<DeltagerDetails />} />
        </Routes>
      </ErrorBoundary>
    </>
  );
}

export default App;
