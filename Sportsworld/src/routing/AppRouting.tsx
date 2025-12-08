import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage, VenuePage } from "../pages";
import PageNavigation from "../components/shared/PageNavigation";
import AthletePage from "../pages/AthletePage";

const AppRouting = () => {
  return (
    <BrowserRouter>
      <PageNavigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/venues" element={<VenuePage />} />
        <Route path="/athletes" element={<AthletePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouting;
