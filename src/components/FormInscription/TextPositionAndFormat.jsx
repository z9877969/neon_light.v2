import { RadioGroup, Radio, FormControlLabel } from "@mui/material";

const TextPositionAdnFormat = () => {
  return (
    <>
      <RadioGroup
        row
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="left"
        name="radio-buttons-group"
      >
        <FormControlLabel value="left" control={<Radio />} label="Left" />
        <FormControlLabel value="center" control={<Radio />} label="Center" />
        <FormControlLabel value="right" control={<Radio />} label="Right" />
      </RadioGroup>
      <RadioGroup
        row
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="-"
        name="radio-buttons-group"
      >
        <FormControlLabel value="-" control={<Radio />} label="-" />
        <FormControlLabel value="AA" control={<Radio />} label="AA" />
        <FormControlLabel value="aa" control={<Radio />} label="aa" />
        <FormControlLabel value="Aa" control={<Radio />} label="Aa" />
      </RadioGroup>
    </>
  );
};

export default TextPositionAdnFormat;
