import fonts from "./fonts";
import s from "./Options.module.scss";
import Select from "react-select";
import InputField from "../../../shared/components/InputField/InputField";

const Options = ({
  textWidth,
  textHeight,
  onWidthChange,
  onHeightChange,
  onChangeSelectValue,
  getSelectValue,
}) => {
  const handleWarningText = textWidth || textHeight ? true : false;

  const handleWidthChange = (event) => {
    const newWidth = event.target.value;
    onWidthChange(newWidth);
  };

  const handleHeightChange = (event) => {
    const newHeight = event.target.value;
    onHeightChange(newHeight);
  };

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
          <label>
            <p className={s.title}>Ширина</p>
            <InputField
              className={s.option}
              type="text"
              name="width"
              placeholder="0"
              value={textWidth}
              onChange={handleWidthChange}
            />
          </label>
          <label>
            <p className={s.title}>Висота</p>

            <InputField
              className={s.option}
              type="text"
              name="height"
              placeholder="0"
              value={textHeight}
              onChange={handleHeightChange}
            />
          </label>
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
