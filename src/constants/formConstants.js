import { LINE_HEIGHT } from "./fontSize";

export const alignmentOptions = {
  LEFT: "start",
  CENTER: "center",
  RIGHT: "end",
};

export const lettersFormatOptions = {
  NONE: "none",
  UPPERCASE: "uppercase",
  LOWERCASE: "lowercase",
  CAPITALIZE: "capitalize",
};

const MIN_TEXT_FONT_SIZE = 6;

export const textSizeConstants = {
  MIN_HEIGHT: Math.round(MIN_TEXT_FONT_SIZE * LINE_HEIGHT),
  MIN_WIDTH: 1,
  MAX_WIDTH: 200,
  MAX_HEIGHT: 200,
  MIN_FONT_HEIGHT: 6,
  MAX_FONT_HEIGHT: 50,
};
