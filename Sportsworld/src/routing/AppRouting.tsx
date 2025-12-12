import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage, VenuePage, AthletePage } from "../pages";
import PageNavigation from "../components/shared/PageNavigation";
import FinancePage from "../pages/FinancePage";




const AppRouting = () => {
  return (
    <BrowserRouter>
      <PageNavigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/venues" element={<VenuePage />} />
        <Route path="/athletes" element={<AthletePage />} />
                <Route path='/finance' element={<FinancePage/>}/>
                <Route path="/athletes" element={<AthletePage />} />


            </Routes>
        </BrowserRouter>
    );
};

export default AppRouting;

