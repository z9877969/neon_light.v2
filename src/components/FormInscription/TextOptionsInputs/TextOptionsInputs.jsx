import { useCallback, useEffect, useState } from "react";

import Select from "react-select";
import debounce from "lodash.debounce";
import s from "./TextOptionsInputs.module.scss";
import { selectorFonts } from "constants";

const DebouncedInput = ({ textWidth, cb, value, ...props }) => {
  const [curValue, setCurValue] = useState(value);

  const debouncedCb = useCallback(debounce(cb, 300), [cb]);

  useEffect(() => {
    setCurValue(Number(value));
  }, [value]);

  return (
    <input
      {...props}
      value={String(curValue)}
      onChange={(e) => {
        const { value: text } = e.target;
        debouncedCb(Number(text));
        setCurValue(Number(text));
      }}
    />
  );
};

const TextOptionsInputs = ({
  validForm,
  errorTextHeight,
  errorTextWidth,
  textWidth,
  textHeight,
  onWidthChange,
  onHeightChange,
  fontOption,
  setFontOption,
}) => {
  const handleWarningText = textWidth || textHeight ? true : false;

  return (
    <div className={s.optionContainer}>
      <div className={s.optionSetting}>
        <div className={s.selectWrapper}>
          <p className={s.title}>Шрифт</p>
          <Select
            name="font"
            onChange={(option) => setFontOption(option)}
            value={fontOption}
            isSearchable={false}
            className="select-container"
            classNamePrefix="select"
            options={selectorFonts}
          />
        </div>
        <div className={s.options}>
          <div className={s.inputWrapper}>
            <label htmlFor="width">
              <p className={s.title}>Ширина, см</p>
              {/* <input
                className={s.option}
                type="number"
                name="width"
                placeholder="0"
                value={Math.round(Number(textWidth))}
                onChange={(e) => onWidthChange(e.target.value)}
              /> */}
              <DebouncedInput
                className={s.option}
                type="number"
                name="width"
                placeholder="0"
                value={Math.round(textWidth)}
                cb={onWidthChange}
              />
            </label>
            {errorTextWidth && !validForm && (
              <span className={s.errorMessage}>{errorTextWidth}</span>
            )}
          </div>
          <div className={s.inputWrapper}>
            <label htmlFor="height">
              <p className={s.title}>Висота, см</p>
              {/* <input
                className={s.option}
                type="number"
                name="height"
                placeholder="0"
                value={Math.round(Number(textHeight))}
                onChange={(e) => onHeightChange(e.target.value)}
              /> */}
              <DebouncedInput
                className={s.option}
                type="number"
                name="height"
                placeholder="0"
                value={Math.round(textHeight)}
                cb={onHeightChange}
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

export default TextOptionsInputs;
