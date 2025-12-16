import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage, VenuePage, AthletePage } from "../pages";
import PageNavigation from "../components/shared/PageNavigation";
import FinancePage from "../pages/FinancePage";
import AddVenuePage from "../pages/UpdateVenuesPage";




const AppRouting = () => {
  return (
    <BrowserRouter>
      <PageNavigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/venues" element={<VenuePage />} />
          <Route path="/update-venues" element={<AddVenuePage />} />
          <Route path="/athletes" element={<AthletePage />} />
          <Route path='/finance' element={<FinancePage/>}/>
          <Route path="/athletes" element={<AthletePage />} />
         </Routes>
      </BrowserRouter>
    );
};

export default AppRouting;

