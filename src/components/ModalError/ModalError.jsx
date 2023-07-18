import { useCallback, useEffect } from "react";

import { createPortal } from "react-dom";
import s from "./ModalError.module.scss";

const modalRoot = document.getElementById("modal-root");

const ModalError = ({ errorMessage, setError }) => {
  const handleCloseError = useCallback(
    (e) => {
      if (e.code === "Escape" || e.target === e.currentTarget) {
        setError(null);
      }
    },
    [setError]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleCloseError);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleCloseError);
      document.body.style.overflow = "visible";
    };
  }, [handleCloseError]);

  return createPortal(
    <div className={s.container} onClick={handleCloseError}>
      <p className={s.errorDescr}>{errorMessage}</p>
    </div>,
    modalRoot
  );
};

export default ModalError;
