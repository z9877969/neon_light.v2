import { useState } from "react";
import s from "./ColorPiker.module.scss";

export function ColorPicker({ options }) {
  const [activeOptionIdx, setActiveOptionIdx] = useState(0);

  const makeOptionClassName = (index) => {
    return index === activeOptionIdx ? s.activeOption : s.option;
  };

  return (
    <>
      <div className={s.colorPicker}>
        <div className={s.textWrapper}>
          <p className={s.title}>Колір</p>
          <p className={s.text}>Виберіть колір вашої неонової вивіски</p>
        </div>
        <div className={s.container}>
          <div className={s.item}>
            {options.map(({ label, color }, index) => (
              <button
                key={index}
                aria-label={label}
                className={makeOptionClassName(index)}
                style={{ backgroundColor: color }}
                onClick={() => setActiveOptionIdx(index)}
              ></button>
            ))}
          </div>
        </div>
        <p className={s.warrningText}>
          Зверніть увагу: колір продукту на вашому екрані може відрізнятися від
          реального через індивідуальні налаштування екрану.
        </p>
      </div>
    </>
  );
}

export default ColorPicker;
