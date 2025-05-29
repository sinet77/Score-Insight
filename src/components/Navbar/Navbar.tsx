import { useNavigate } from "react-router-dom";
import logo from "../../assets/football_logo_transparent.png";
import styles from "./Navbar.module.scss";
import { divisions } from "./divisions"
import { NavMobile } from "./NavMobile/NavMobile";

export const Navbar = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleNavigation = (path: string) => {
    if (path.startsWith("#")) {
      document.querySelector(path)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(path);
    }
  };

  return (
    <nav className={styles["navbar"]}>
      <div className={styles["navbar__content"]}>
        <button onClick={handleGoHome}>
          <img src={logo} alt="Football App Logo" className={styles["navbar__logo"]} />
        </button>

        <NavMobile />

        <div className={styles["navbar__links"]}>
          {divisions.map((division) => (
            <span key={division.name}>
              <button onClick={() => handleNavigation(division.path)} className={styles["navbar__button"]}>
                {division.icon}
                <span>{division.name}</span>
              </button>
            </span>
          ))}
        </div>
      </div>
    </nav>
  );
};