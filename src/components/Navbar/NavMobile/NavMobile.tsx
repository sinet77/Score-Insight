import { useClickAway } from "react-use";
import { useRef, useState } from "react";
import { Squash as Hamburger } from "hamburger-react";
import { AnimatePresence, motion } from "framer-motion";
import { routes } from "../../../routes";
import styles from './NavMobile.module.scss';

export const NavMobile = () => {
  const [isOpen, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Zamknięcie menu po kliknięciu poza nim
  useClickAway(menuRef, () => setOpen(false));

  const handleNavigation = (path: string) => {
    window.location.href = path; // navigate(path)
  };

  return (
    <div className={styles["navmobile-container"]}>
      <Hamburger toggled={isOpen} size={20} toggle={setOpen} color="white"/>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef} // Ref dla menu, by móc monitorować kliknięcia poza nim
            initial={{ x: "100%" }} // Menu zaczyna się poza ekranem po prawej stronie
            animate={{ x: 0 }} // Menu przesuwa się na ekran od prawej
            exit={{ x: "100%" }} // Menu znika (przesuwa się z powrotem poza ekran)
            transition={{ duration: 0.3 }} // Czas trwania animacji
            className={styles.styledMenu} // Menu zawsze po prawej stronie
          >
            <div>
              {["Choose league", "H2H Teams", "H2H Players", "News", "FIFA World Ranking"].map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavigation(routes[item.toLowerCase().replace(/ /g, "")])} 
                  className={styles.menuButton}
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
