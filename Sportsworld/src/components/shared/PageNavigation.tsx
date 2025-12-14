import { Link } from "react-router-dom";

const PageNavigation = () => {
  return (
    <nav className="w-auto flex justify-evenly h-12 items-center">
      <Link to="/">Hjem</Link>

      <Link to="venues">Venues</Link>

      <Link to="athletes">Athletes</Link>

      <Link to="editathletes">Create own athlete</Link>
    </nav>
  );
};

export default PageNavigation;