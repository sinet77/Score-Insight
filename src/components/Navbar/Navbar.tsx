import { useNavigate } from "react-router-dom";
import logo from "../../assets/football_logo_transparent.png";
import "./Navbar.scss";

export const Navbar = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <nav className="navbar">
        <div className="navbar__content">
          <button onClick={handleGoHome}>
           <img src={logo} alt="Football App Logo" className="navbar__logo" />     
          </button>
        
        </div>
      
    </nav>
  );
};
