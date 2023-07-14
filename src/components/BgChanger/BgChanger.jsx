import { Radio, RadioGroup, Typography } from "@mui/material";

import clsx from "clsx";
import s from "./BgChanger.module.scss";

const BgChanger = ({
  selectedBackground,
  backgrounds,
  setSelectedBackground,
}) => {
  return (
    <div className={s.container}>
      <Typography variant="body1" className={s.title}>
        Фони
      </Typography>
      <RadioGroup className={s.radioGroup} value={selectedBackground}>
        {backgrounds.map((background) => (
          <label
            key={background.value}
            className={clsx(
              s.radioImageBg,
              s[`radioImageBg-${background.value}`],
              selectedBackground === background.values
                ? s.radioImageBorderOn
                : s.radioImageBorderOff
            )}
          >
            <Radio
              className={s.radio}
              value={background.value}
              checked={selectedBackground === background.value}
              onChange={(e) => setSelectedBackground(e.target.value)}
            />
          </label>
        ))}
      </RadioGroup>
    </div>
  );
};

export default BgChanger;
