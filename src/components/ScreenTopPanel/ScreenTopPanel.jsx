import Switch from "../Switch/Switch";
import { Typography } from "@mui/material";
import clsx from "clsx";
import s from "./ScreenTopPanel.module.scss";

const ScreenTopPanel = ({
  price,
  textBlur,
  handleTextBlurChange,
  setTextBlur,
}) => {
  return (
    <div className={s.container}>
      <Typography
        variant="body1"
        className={clsx(s.price, Boolean(price) && s.isPrice)}
      >
        {price} грн
      </Typography>
      <Switch
        unchecked={textBlur.toString()}
        onChange={() => handleTextBlurChange(setTextBlur)}
      />
    </div>
  );
};

export default ScreenTopPanel;
