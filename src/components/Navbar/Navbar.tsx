import { useNavigate } from "react-router-dom";
import logo from "../../assets/football_logo_transparent.png";
import styles from "./Navbar.module.scss";
import { NavMobile } from "./NavMobile/NavMobile";
import { NavLinks } from "./NavLinks/NavLinks";

export const Navbar = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <nav className={styles["navbar"]}>
      <div className={styles["navbar__content"]}>
        <button onClick={handleGoHome}>
          <img src={logo} alt="Football App Logo" className={styles["navbar__logo"]} />
        </button>

        <NavMobile />
        <NavLinks
          className={styles["navbar__links"]}
        />
      </div>
    </nav>
  );
};