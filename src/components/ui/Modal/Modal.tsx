import styles from "./Modal.module.scss";

type ModalProps = {
  handleClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ handleClose, children }: ModalProps) => {
  return (
    <div className={styles["modal-backdrop"]}>
      <div className={styles["modal"]}>
        <div className={styles["modal-body"]}>{children}</div>
        <button className="button button--modal" onClick={() => handleClose()}>
          X
        </button>
      </div>
    </div>
  );
};

export default Modal;
