import { Link } from "react-router-dom";

const PageNavigation = () => {
    return(
       
        <nav>
            <ul className="list-disc pl-6">
                <li className="hover:underline"><Link to="/">Hjem</Link></li>
                <li className="hover:underline"><Link to="venues">Venues</Link></li>
                <li><Link to="finance">Finance</Link></li>
                
            </ul>
        </nav>
    )
}

export default PageNavigation;