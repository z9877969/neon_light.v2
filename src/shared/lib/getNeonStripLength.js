import { textSizeConstants } from "constants";

const LETTER_HEIGHT_TO_LED_LENGTH_MAP = {
  6: 23,
  8: 30,
  10: 38,
  12: 45,
  15: 53,
  18: 60,
  20: 72,
  22: 84,
  25: 91,
  28: 100,
  30: 107,
  35: 122,
  40: 137,
  45: 158,
  50: 183,
};

function getNeonStripLength(wordLength, fontSizeCM) {
  const { MIN_FONT_HEIGHT, MAX_FONT_HEIGHT } = textSizeConstants;

  fontSizeCM =
    fontSizeCM < MIN_FONT_HEIGHT
      ? MIN_FONT_HEIGHT
      : fontSizeCM > MAX_FONT_HEIGHT
      ? MAX_FONT_HEIGHT
      : fontSizeCM;

  if (!LETTER_HEIGHT_TO_LED_LENGTH_MAP[fontSizeCM]) {
    const heightVariants = Object.keys(LETTER_HEIGHT_TO_LED_LENGTH_MAP);

    for (
      let i = fontSizeCM;
      i <= heightVariants[heightVariants.length - 1];
      ++i
    ) {
      if (LETTER_HEIGHT_TO_LED_LENGTH_MAP[i]) {
        fontSizeCM = i;
        break;
      }
    }
  }
  return wordLength * LETTER_HEIGHT_TO_LED_LENGTH_MAP[fontSizeCM];
}

export default getNeonStripLength;
