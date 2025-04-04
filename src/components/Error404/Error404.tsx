import styles from './Error404.module.scss';
import {routes} from "../../routes"
import { useNavigate } from 'react-router-dom';

export const Error404 = () => {
    const navigate = useNavigate()
  return (
    <div className={styles.wrapper}>
      <div className={styles.error}>
        <div className={styles.number}>4</div>
        <div className={styles.illustration}>
          <div className={styles.circle}></div>
          <div className={styles.clip}>
            <div className={styles.paper}>
              <div className={styles.face}>
                <div className={styles.eyes}>
                  <div className={`${styles.eye} ${styles.eye__left}`}></div>
                  <div className={`${styles.eye} ${styles.eye__right}`}></div>
                </div>
                <div className={`${styles.cheeks} ${styles.cheeks__left}`}></div>
                <div className={`${styles.cheeks} ${styles.cheeks__right}`}></div>
                <div className={styles.mouth}></div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.number}>4</div>
      </div>

      <div className={styles.text}>
        Oops. The page you're looking for doesn't exist.
      </div>
      <button className={styles.button} onClick={()=> navigate(routes.home)}>
        Back Home
      </button>
    </div>
  );
};
