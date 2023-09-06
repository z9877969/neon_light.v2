import { useCallback, useEffect, useRef, useState } from "react";

import Select from "react-select";
import debounce from "lodash.debounce";
import s from "./TextOptionsInputs.module.scss";
import { selectorFonts } from "constants";

const DebouncedInput = ({ textWidth, cb, value, ...props }) => {
  const [curValue, setCurValue] = useState(value);

  const inputRef = useRef(null);

  // eslint-disable-next-line
  const debouncedCb = useCallback(debounce(cb, 1500), [cb]);

  useEffect(() => {
    setCurValue(Number(value));
    inputRef.current.blur();
  }, [value]);

  return (
    <input
      {...props}
      ref={inputRef}
      value={String(curValue)}
      onChange={(e) => {
        const { value: text } = e.target;
        debouncedCb(Number(text));
        setCurValue(Number(text));
      }}
      onFocus={e => e.target.select()}
    />
  );
};

const TextOptionsInputs = ({
  validForm,
  errorTextHeight,
  errorTextWidth,
  textWidth,
  textHeight,
  setSides,
  fontOption,
  setFontOption,
}) => {
  // const handleWarningText = textWidth || textHeight ? true : false;

  const changeWidth = (value) => {
    setSides((p) => ({ ...p, width: value }));
  };
  const changeHeight = (value) => {
    setSides((p) => ({ ...p, height: value }));
  };

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
              <DebouncedInput
                className={s.option}
                type="number"
                name="width"
                placeholder="0"
                value={Math.round(textWidth)}
                cb={changeWidth}
              />
            </label>
            {errorTextWidth && !validForm && (
              <span className={s.errorMessage}>{errorTextWidth}</span>
            )}
          </div>
          <div className={s.inputWrapper}>
            <label htmlFor="height">
              <p className={s.title}>Висота, см</p>
              <DebouncedInput
                className={s.option}
                type="number"
                name="height"
                placeholder="0"
                value={Math.round(textHeight)}
                cb={changeHeight}
              />
            </label>
            {errorTextHeight && !validForm && (
              <span className={s.errorMessage}>{errorTextHeight}</span>
            )}
          </div>
        </div>
      </div>
      {/* {handleWarningText && (
        <p className={s.warrningText}>
          Зверніть увагу, що вказані параметри ширини та висоти можуть
          відрізнятися від дійсних через процес виготовлення або вимірювання.
        </p>
      )} */}
    </div>
  );
};

export default TextOptionsInputs;
