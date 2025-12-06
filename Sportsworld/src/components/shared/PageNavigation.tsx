import { Link } from "react-router-dom";

const PageNavigation = () => {
    return(
        <nav>
            <ul>
                <li><Link to="/">Hjem</Link></li>
                <li><Link to="venues">Venues</Link></li>
            </ul>
        </nav>
    )
}

export default PageNavigation;