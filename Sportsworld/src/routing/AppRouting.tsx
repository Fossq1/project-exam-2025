import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage, VenuePage } from "../pages";
import PageNavigation from '../components/shared/PageNavigation'

const AppRouting = () => {
    return(
        <BrowserRouter>
            <PageNavigation/>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/venues' element={<VenuePage/>} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouting;