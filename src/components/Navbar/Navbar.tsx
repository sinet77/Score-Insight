import logo from "../../assets/football_logo_transparent.png";
import "./Navbar.scss";

export const Navbar = () => {
  return (
    <nav className="navbar">
        <div className="navbar__content">
        <img src={logo} alt="Football App Logo" className="navbar__logo" />    
        </div>
      
    </nav>
  );
};
