import Select from "react-select";
import fonts from "./fonts";
import s from "./TextOptionsInputs.module.scss";

const Options = ({
  validForm,
  errorTextHeight,
  errorTextWidth,
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
            onChange={({ value }) => onChangeSelectValue(value)}
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
                className={s.option}
                type="number"
                name="width"
                placeholder="0"
                value={textWidth.toString()}
                onChange={(e) => onWidthChange(e.target.value)}
              />
            </label>
            {errorTextWidth && !validForm && (
              <span className={s.errorMessage}>{errorTextWidth}</span>
            )}
          </div>
          <div className={s.inputWrapper}>
            <label htmlFor="height">
              <p className={s.title}>Висота</p>
              <input
                className={s.option}
                type="number"
                name="height"
                placeholder="0"
                value={textHeight}
                onChange={(e) => onHeightChange(e.target.value)}
              />
            </label>
            {errorTextHeight && !validForm && (
              <span className={s.errorMessage}>{errorTextHeight}</span>
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
