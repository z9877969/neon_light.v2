import Switch from "../Switch/Switch";
import { Typography } from "@mui/material";
import clsx from "clsx";
import s from "./ScreenTopPanel.module.scss";

const ScreenTopPanel = ({ price, isTextLight, toggleTextLight, containerRef }) => {
  return (
    <div ref={containerRef} className={s.container}>
      <Typography
        variant="body1"
        className={clsx(s.price, Boolean(price) && s.isPrice)}
      >
        {price} грн
      </Typography>
      <Switch checked={isTextLight} onChange={toggleTextLight} />
    </div>
  );
};

export default ScreenTopPanel;
