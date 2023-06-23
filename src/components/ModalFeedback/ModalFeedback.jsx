import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { ReactComponent as IconClose } from "../../images/cross.svg";

import s from "./ModalFeedback.module.scss";

const modalEl = document.querySelector("#modal-root");

const ModalFeedback = ({ onClose, children }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.code === "Escape") {
        setModalOpen(false);
        setTimeout(onClose, 300);
      }
    };

    const body = document.querySelector("body");

    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    body.style.paddingRight = `${scrollBarWidth}px`;

    window.addEventListener("keydown", handleKeydown);
    setModalOpen(true);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
      body.style.overflow = "";
      body.style.paddingRight = "";
    };
  }, [onClose]);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      setModalOpen(false);
      setTimeout(onClose, 300);
    }
  };

  const handleClose = () => {
    setModalOpen(false);
    setTimeout(onClose, 300);
  };

  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isModalOpen]);

  return createPortal(
    <div
      className={`${s.Backdrop} ${isModalOpen ? s.Open : ""}`}
      onClick={handleBackdropClick}
      tabIndex={-1}
      ref={modalRef}
    >
      <div className={`${s.Modal} ${isModalOpen ? s.Open : ""}`} tabIndex={0}>
        <button
          aria-label="Close"
          type="button"
          className={s.CloseButton}
          onClick={handleClose}
        >
          <IconClose className={s.CloseIcon} />
        </button>
        {children}
      </div>
    </div>,
    modalEl
  );
};

export default ModalFeedback;
