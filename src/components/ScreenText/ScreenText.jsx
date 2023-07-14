import clsx from "clsx";
import s from "./ScreenText.module.scss";

const ScreenText = ({ text, textHeight, textWidth, isTextLight }) => {
  return (
    <div className={s.container}>
      <div className={s.textBar}>
        <div className={s.markerHeightWrapper}>
          <span className={s.markerHeight}>{`${textHeight} см`}</span>
        </div>
        <div className={s.linesContainer}>
          <span className={clsx(s.text, isTextLight && s.onLightText)}>
            {text}
          </span>
        </div>
        <div className={s.markerWidthWrapper}>
            <p className={s.markerWidth}>
              <span className={s.widthValue}>{`${textWidth}`}</span>
              <span className={s.widthUnit}>см</span>
            </p>
          </div>
      </div>
    </div>
  );
};

export default ScreenText;
