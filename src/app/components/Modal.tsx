// src/app/components/Modal.tsx
import React from "react";
import styles from "../page.module.css";

type ModalProps = {
  onClose: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ onClose, onConfirm, children }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <p>{children}</p>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onClose}>No</button>
      </div>
    </div>
  );
};

export default Modal;
