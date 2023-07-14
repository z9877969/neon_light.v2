import s from "./ScreenText.module.scss";

const ScreenText = ({ text, textHeight, textWidth }) => {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.heightDisplayWrapper}>
          <span className={s.heightDisplay}>{`${textHeight} см`}</span>
        </div>

        <div className={s.textBar}>
          <div className={s.linesContainer}>
            <div className={s.textWrapper}>
              <span className={s.text}>{text}</span>
            </div>
          </div>
          <div className={s.widthDisplayWrapper}>
            <p className={s.widthDisplay}>
              <span className={s.widthValue}>{`${textWidth}`}</span>
              <span className={s.widthUnit}>см</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenText;
