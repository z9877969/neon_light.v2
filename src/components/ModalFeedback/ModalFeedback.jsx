import React, { useEffect } from "react";
import { createPortal } from "react-dom";

import { ReactComponent as IconClose } from "../../images/cross.svg";

import s from "./ModalFeedback.module.scss";

const modalEl = document.querySelector("#modal-root");

const ModalFeedback = ({ onClose, children }) => {
  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.code === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [onClose]);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={s.Backdrop} onClick={handleBackdropClick}>
      <div className={s.Modal}>
        <button type="button" className={s.CloseButton} onClick={onClose}>
          <IconClose className={s.CloseIcon} />
        </button>
        {children}
      </div>
    </div>,
    modalEl
  );
};

export default ModalFeedback;
