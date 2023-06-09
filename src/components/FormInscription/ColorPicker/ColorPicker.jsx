import { useState } from "react";
import s from "../FormInscription.module.scss";
import styles from "./ColorPiker.module.scss";

export function ColorPicker({ options }) {
  const [activeOptionIdx, setActiveOptionIdx] = useState(0);

  const makeOptionClassName = (index) => {
    return index === activeOptionIdx ? styles.activeOption : styles.option;
  };

  return (
    <>
      <div className={s.colorPicker}>
        <div className={s.textWrapper}>
          <p className={s.title}>Колір</p>
          <p className={s.text}>Виберіть колір вашої неонової вивіски</p>
        </div>
        <div className={styles.container}>
          <div>
            {options.map(({ label, color }, index) => (
              <button
                key={label}
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
