import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
import type { ReactNode } from "react";
import { Overlay } from "../../UI/Overlay/Overlay";

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
};

export const Modal = ({ children, onClose }: ModalProps) => {
  const modalElement = document.getElementById("modal");
  if (!modalElement) return null;

  return createPortal(
    <>
      <div className={styles.modal}>
        <button
          className={styles["close-button"]}
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        {children}
      </div>
      <Overlay onClose={onClose} />
    </>,
    modalElement
  );
};
