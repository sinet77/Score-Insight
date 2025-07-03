import { useNavigate } from "react-router-dom";
import { divisions } from "../divisions";
import styles from "../Navbar.module.scss"

interface NavLinksProps {
    className: string;
}

export const NavLinks = ({ className }: NavLinksProps) => {
      const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    if (path.startsWith("#")) {
      document.querySelector(path)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(path);
    }
  };
    return (
        <div className={className}>
            {divisions.map((division) => (
                <button
                    key={division.name}
                    onClick={() => handleNavigation(division.path)}
                    className={styles["navbar__button"]}
                >
                    {division.icon}
                    <span>{division.name}</span>
                </button>
            ))}
        </div>
    );
};
