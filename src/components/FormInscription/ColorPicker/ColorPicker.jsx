import clsx from "clsx";
import { colorPickerOptions } from "constants";
import s from "./ColorPiker.module.scss";

const colors = colorPickerOptions.map(({ color }) => color.toLowerCase());

export function ColorPicker({ setColor, color, textWidth, textHeight }) {
  const showColorpickerWarningText = color !== colors[0];

  return (
    <div
      className={clsx(
        s.container,
        (textWidth || textHeight) && s.activeWarrningText
      )}
    >
      <div className={s.textWrapper}>
        <p className={s.title}>Колір</p>
        <p className={s.text}>Виберіть колір вашої неонової вивіски</p>
      </div>
      <div className={s.colorPicker}>
        {colors.map((el) => (
          <button
            key={el}
            className={el === color ? s.activeOption : s.option}
            style={{ backgroundColor: el }}
            onClick={() => setColor(el)}
            type="button"
            name="color"
            aria-label="Color"
          />
        ))}
      </div>
      {showColorpickerWarningText && (
        <p className={s.warrningText}>
          Зверніть увагу: колір продукту на вашому екрані може відрізнятися від
          реального через індивідуальні налаштування екрану.
        </p>
      )}
    </div>
  );
}

export default ColorPicker;
