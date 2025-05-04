import styles from "./GoToH2H.module.scss";

type GoToH2HProps ={
  image: string;
  title: string;
  where: () => void;
}

export const GoToH2H = ({ image, title, where }: GoToH2HProps) => {
  return (
    <div className={styles["wrapper"]}>
      <button className={styles["go-to-button"]} onClick={where}>
        <h2 className={"title title--fs24"}>{title}</h2>
        <img src={image} alt="Comparision" className={styles["image"]} />
      </button>
    </div>
  );
};
