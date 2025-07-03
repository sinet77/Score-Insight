import { useClickAway } from "react-use";
import { useEffect, useRef, useState } from "react";
import { Squash as Hamburger } from "hamburger-react";
import { AnimatePresence, motion } from "framer-motion";
import styles from './NavMobile.module.scss';
import { NavLinks } from "../NavLinks/NavLinks";

export const NavMobile = () => {
  const [isOpen, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Zamknięcie menu po kliknięciu poza nim
  useClickAway(menuRef, () => setOpen(false));

    useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <div className={styles["navmobile-container"]} ref={menuRef}>
      <div className={styles["hamburger-wrapper"]}>
        <Hamburger toggled={isOpen} size={20} toggle={setOpen} color="white" />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
         
            initial={{ x: "100%" }} // Menu zaczyna się poza ekranem po prawej stronie
            animate={{ x: 0 }} // Menu przesuwa się na ekran od prawej
            exit={{ x: "100%" }} // Menu znika (przesuwa się z powrotem poza ekran)
            transition={{ duration: 0.3 }} // Czas trwania animacji
            className={styles.styledMenu} // Menu zawsze po prawej stronie
          >
            <NavLinks
              className={styles["mobileLinks"]}

            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
