import { BallTriangle } from "react-loader-spinner";
import { createPortal } from "react-dom";
import s from "./Loader.module.scss";

const loaderRoot = document.querySelector("#loader-root");

const Loader = () => {
  return createPortal(
    <div className={s.container}>
      <BallTriangle
        height={200}
        width={200}
        radius={5}
        // color="#d1d1465b"
        color="#5fcecac9"
        
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle=""
        visible={true}
      />
    </div>,
    loaderRoot
  );
};

export default Loader;
