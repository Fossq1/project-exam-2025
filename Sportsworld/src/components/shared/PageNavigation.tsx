import { Link } from "react-router-dom";

const PageNavigation = () => {
  return (
    <nav className="w-auto flex justify-evenly h-12 items-center sticky top-0 z-50 bg-blue-500 font-bold">
      <Link to="athletes" className="hover:scale-120 transition-all duration-200 ease-in-out" >Athletes</Link>
      <Link to="venues" className="hover:scale-120 transition-all duration-200 ease-in-out">Venues</Link>
      <Link to="update-venues" className="hover:scale-120 transition-all duration-200 ease-in-out">Update venues</Link>
      <Link to="editathletes" className="hover:scale-120 transition-all duration-200 ease-in-out">Create own athlete</Link>
      <Link to="finance" className="hover:scale-120 transition-all duration-200 ease-in-out">Finances</Link>
    </nav>
  );
};

export default PageNavigation;