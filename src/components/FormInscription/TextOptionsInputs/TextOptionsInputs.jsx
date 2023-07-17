import Select from "react-select";
import fonts from "./fonts";
import s from "./TextOptionsInputs.module.scss";

const Options = ({
  widthDirty,
  widthError,
  heightDirty,
  heightError,
  blurHandler,
  textWidth,
  textHeight,
  onWidthChange,
  onHeightChange,
  onChangeSelectValue,
  getSelectValue,
}) => {
  const handleWarningText = textWidth || textHeight ? true : false;

  return (
    <div className={s.optionContainer}>
      <div className={s.optionSetting}>
        <div className={s.selectWrapper}>
          <p className={s.title}>Шрифт</p>
          <Select
            name="font"
            onChange={onChangeSelectValue}
            value={getSelectValue}
            isSearchable={false}
            className="select-container"
            classNamePrefix="select"
            options={fonts}
          />
        </div>
        <div className={s.options}>
          <div className={s.inputWrapper}>
            <label htmlFor="width">
              <p className={s.title}>Ширина</p>
              <input
                onBlur={blurHandler}
                className={s.option}
                type="number"
                name="width"
                placeholder="0"
                value={textWidth.toString()}
                onChange={onWidthChange}
              />
            </label>
            {widthDirty && widthError && (
              <span className={s.errorMessage}>{widthError}</span>
            )}
          </div>
          <div className={s.inputWrapper}>
            <label htmlFor="height">
              <p className={s.title}>Висота</p>
              <input
                onBlur={(e) => blurHandler(e)}
                className={s.option}
                type="number"
                name="height"
                placeholder="0"
                value={textHeight}
                onChange={onHeightChange}
              />
            </label>
            {heightDirty && heightError && (
              <span className={s.errorMessage}>{heightError}</span>
            )}
          </div>
        </div>
      </div>
      {handleWarningText && (
        <p className={s.warrningText}>
          Зверніть увагу, що вказані параметри ширини та висоти можуть
          відрізнятися від дійсних через процес виготовлення або вимірювання.
        </p>
      )}
    </div>
  );
};

export default Options;
