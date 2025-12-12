import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage, VenuePage } from "../pages";
import PageNavigation from '../components/shared/PageNavigation'
import FinancePage from "../pages/FinancePage";

const AppRouting = () => {
    return(
        <BrowserRouter>
            <PageNavigation/>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/venues' element={<VenuePage/>} />
                <Route path='/finance' element={<FinancePage/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouting;