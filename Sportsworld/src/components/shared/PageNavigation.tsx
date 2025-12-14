import { Link } from "react-router-dom";

const PageNavigation = () => {
  return (
    <nav className="w-auto flex justify-evenly h-12 items-center">
      <ul>
        <li>
          <Link to="/">Hjem</Link>
        </li>
        <li>
          <Link to="venues">Venues</Link>
        </li>
        <li>
          <Link to="athletes">Athletes</Link>
        </li>
                <li><Link to="finance">Finance</Link></li>
            </ul>
        </nav>
    )
}

export default PageNavigation;

