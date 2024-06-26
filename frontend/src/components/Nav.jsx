import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

const Nav = () => {
  return (
    <nav className="flex items-center justify-between md:justify-around px-20 border py-4 border-b[#e6ebf4] sticky top-0 z-50 bg-white">
      <Link to={"/"}>
        <img src={logo} alt="logo" className="w-28" />
      </Link>
      <div className="hidden md:flex"></div>
      <Link
        to={"/create"}
        
        className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
      >
        Create
      </Link>
    
    </nav>
  );
};

export default Nav;
