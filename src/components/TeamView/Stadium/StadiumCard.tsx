import styles from "./Stadium.module.scss";
import { StadiumProps } from "./stadium-types";

interface StadiumCardProps {
  stadium: StadiumProps;
}

const StadiumCard = ({ stadium }: StadiumCardProps) => {
  return (
    <div className={styles["stadium-container"]}>
      <div className={styles["stadium-image"]}>
        <img src={stadium.image || "/placeholder.svg"} alt={stadium.name} />
      </div>
      <div className={styles["stadium-info"]}>
        <h2 className={styles["stadium-name"]}>{stadium.name}</h2>
        <div className={styles["stadium-details"]}>
          <div className={styles["detail-item"]}>
            <span className={styles["icon"]}>👤</span>
            <span className={styles["value"]}>{stadium.capacity.toLocaleString()}</span>
          </div>
          <div className={styles["detail-item"]}>
            <span className={styles["icon"]}>📍</span>
            <span className={styles["value"]}>
              {stadium.city}, {stadium.country}
            </span>
          </div>
        </div>
        <div className={styles["map-link"]}>
          <a
            href={`https://maps.google.com/?q=${stadium.address},${stadium.city},${stadium.country}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Map view
          </a>
        </div>
      </div>
    </div>
  );
};

export default StadiumCard;