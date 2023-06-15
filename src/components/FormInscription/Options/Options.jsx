import fonts from "./fonts";
import s from "./Options.module.scss";
import Select from "react-select";
import InputField from "../../../shared/components/InputField/InputField";
import ErrorMessageField from "../../../shared/components/ErrorMessage/ErrorMessage";

const Options = ({
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
          <ErrorMessageField className={s.errorMessage} name="font" />
        </div>
        <div className={s.options}>
          <div className={s.inputWrapper}>
            <label htmlFor="width">
              <p className={s.title}>Ширина</p>
              <InputField
                className={s.option}
                type="number"
                name="width"
                placeholder="0"
                value={textWidth}
                onChange={onWidthChange}
              />
              <ErrorMessageField className={s.errorMessage} name="width" />
            </label>
          </div>
          <div className={s.inputWrapper}>
            <label htmlFor="height">
              <p className={s.title}>Висота</p>
              <InputField
                className={s.option}
                type="number"
                name="height"
                placeholder="0"
                value={textHeight}
                onChange={onHeightChange}
              />
              <ErrorMessageField className={s.errorMessage} name="height" />
            </label>
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
