import { useState } from "react";
import clsx from "clsx";
import s from "./ColorPiker.module.scss";
import colorPickerOptions from "./colorPickerOptions";

export function ColorPicker({ setColor, color, textWidth, textHeight }) {
  const [activeOptionIdx, setActiveOptionIdx] = useState(0);

  const setActiveOptionsIndAndColor = (index, color) => {
    setActiveOptionIdx(index);
    setColor(color);
  };

  const makeOptionClassName = (index) => {
    return index === activeOptionIdx ? s.activeOption : s.option;
  };
  const handleWarrningTextColorpiscker = color === "#FEFEFE" ? false : true;
  const handleWarningText = textWidth || textHeight ? true : false;

  return (
    <div
      className={clsx(s.container, handleWarningText && s.activeWarrningText)}
    >
      <div className={s.textWrapper}>
        <p className={s.title}>Колір</p>
        <p className={s.text}>Виберіть колір вашої неонової вивіски</p>
      </div>
      <div className={s.colorPicker}>
        {colorPickerOptions.map(({ color }, index) => (
          <button
            key={index}
            className={makeOptionClassName(index)}
            style={{ backgroundColor: color }}
            onClick={() => setActiveOptionsIndAndColor(index, color)}
            type="button"
            name="color"
            aria-label="Color"
          />
        ))}
      </div>
      {handleWarrningTextColorpiscker && (
        <p className={s.warrningText}>
          Зверніть увагу: колір продукту на вашому екрані може відрізнятися від
          реального через індивідуальні налаштування екрану.
        </p>
      )}
    </div>
  );
}

export default ColorPicker;
