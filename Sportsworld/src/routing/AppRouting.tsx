import { BrowserRouter, Routes, Route } from "react-router-dom";
import {  VenuePage, AthletePage, AthleteEditPage } from "../pages";
import PageNavigation from "../components/shared/PageNavigation";
import FinancePage from "../pages/FinancePage";
import AddVenuePage from "../pages/UpdateVenuesPage";




const AppRouting = () => {
  return (
    <BrowserRouter>
      <PageNavigation />
        <Routes>
          <Route path="/" element={<AthletePage />} />
          <Route path="/venues" element={<VenuePage />} />
          <Route path="/update-venues" element={<AddVenuePage />} />
          <Route path='/finance' element={<FinancePage/>}/>
          <Route path="/athletes" element={<AthletePage />} />
          <Route path="/editathletes" element={<AthleteEditPage />} />

         </Routes>
      </BrowserRouter>
    );
};

export default AppRouting;

