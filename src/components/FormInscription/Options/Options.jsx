import { Field } from "formik";
import fonts from "./fonts";
import s from "./Options.module.scss";

const Options = ({ textWidth, textHeight, onWidthChange, onHeightChange }) => {
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
          <Field className={s.select} as="select" name="fonts">
            {fonts.map(({ name, value }) => (
              <option key={name} value={value}>
                {name}
              </option>
            ))}
          </Field>
        </div>
        <div className={s.options}>
          <label>
            <p className={s.title}>Ширина</p>
            <Field
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
            <Field
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
      <p className={s.warrningText}>
        Зверніть увагу, що вказані параметри ширини та висоти можуть
        відрізнятися від дійсних через процес виготовлення або вимірювання.
      </p>
    </div>
  );
};

export default Options;
