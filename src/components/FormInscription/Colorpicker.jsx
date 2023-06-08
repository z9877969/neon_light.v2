import { RadioGroup, Radio, FormControlLabel } from "@mui/material";
import s from "./FormInscription.module.scss";
const Colorpicker = () => {
  return (
    <div className={s.colorPicker}>
      <div className={s.textWrapper}>
        <p className={s.title}>Колір</p>
        <p className={s.text}>Виберіть колір вашої неонової вивіски</p>
      </div>

      <RadioGroup
        row
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="-"
        name="radio-buttons-group"
      >
        <FormControlLabel value="" control={<Radio />} label="" />
        <FormControlLabel value="" control={<Radio />} label="" />
        <FormControlLabel value="" control={<Radio />} label="" />
        <FormControlLabel value="" control={<Radio />} label="" />
        <FormControlLabel value="" control={<Radio />} label="" />
        <FormControlLabel value="" control={<Radio />} label="" />
        <FormControlLabel value="" control={<Radio />} label="" />
        <FormControlLabel value="" control={<Radio />} label="" />
        <FormControlLabel value="" control={<Radio />} label="" />
        <FormControlLabel value="" control={<Radio />} label="" />
        <FormControlLabel value="" control={<Radio />} label="" />
        <FormControlLabel value="" control={<Radio />} label="" />
      </RadioGroup>
    </div>
  );
};

export default Colorpicker;
