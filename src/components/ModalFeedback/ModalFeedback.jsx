import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { ReactComponent as IconClose } from "../../images/cross.svg";

import s from "./ModalFeedback.module.scss";

const modalEl = document.querySelector("#modal-root");

const ModalFeedback = ({ onClose, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.code === "Escape") {
        onClose();
      }
    };

    const body = document.querySelector("body");

    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    body.style.paddingRight = `${scrollBarWidth}px`;

    window.addEventListener("keydown", handleKeydown);
    modalRef.current.focus();
    return () => {
      window.removeEventListener("keydown", handleKeydown);
      body.style.overflow = "";
      body.style.paddingRight = "";
    };
  }, [onClose]);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={s.Backdrop}
      onClick={handleBackdropClick}
      tabIndex={-1}
      ref={modalRef}
    >
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
