import { Field } from "formik";
import fonts from "./fonts";
import s from "./Options.module.scss";

const Options = () => {
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
        <ul className={s.options}>
          <li>
            <p className={s.title}>Ширина</p>
            <Field className={s.option} type="text" name="width" />
          </li>
          <li>
            <p className={s.title}>Висота</p>
            <Field className={s.option} type="text" name="height" />
          </li>
        </ul>
      </div>
      <p className={s.warrningText}>
        Зверніть увагу, що вказані параметри ширини та висоти можуть
        відрізнятися від дійсних через процес виготовлення або вимірювання.
      </p>
    </div>
  );
};

export default Options;
