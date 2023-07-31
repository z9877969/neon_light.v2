import { getMargins, getNextLetterSizes, getNodeSizes } from "services/helpers";
import { useCallback, useEffect, useState } from "react";

import { fontSize as constants } from "constants";

const initialFontSize = constants.MAX_FONT_SIZE;
const scaleStep = constants.FONT_SCALE_STEP;
const letterRatio = constants.LETTER_RATIO;

export const useFontSize = ({
  innerScreenSize,
  refs,
  text,
  lettersFormat,
  font,
}) => {
  const [fontSize, setFontSize] = useState(initialFontSize);

  const { containerRef, textBarRef, textRef, heightMarkerRef, widthMarkerRef } =
    refs;

  // calc sizes markers ratio
  // const calcTextSizesRatio = useCallback(() => {
  //   const { width: wrapperWidth, height: wrapperHeight } = innerScreenSize;

  //   const { width: textBarFullWidth, height: textBarFullHeight } =
  //     calcTextBarFullSizes();

  //   const curWidthRatio = textBarFullWidth / wrapperWidth;
  //   const curHeightRatio = textBarFullHeight / wrapperHeight;

  //   const { width: nextLetterWidth, height: nextLetterHeight } =
  //     getNextLetterSizes(textRef.current, text);
  //   const nextWidthRatio =
  //     (textBarFullWidth + nextLetterWidth * letterRatio) / wrapperWidth;

  //   const nextHeightRatio =
  //     (textBarFullHeight + nextLetterHeight) / wrapperHeight;
  //   return {
  //     curWidthRatio,
  //     curHeightRatio,
  //     nextWidthRatio,
  //     nextHeightRatio,
  //   };
  // }, [innerScreenSize, text, textRef, calcTextBarFullSizes]);
  // calc sizes markers ratio -END

  // calc text sizes
  const calcTextBarFullSizes = useCallback(() => {
    const textBarSizes = getNodeSizes(textBarRef.current);
    const heightMarkerSizes = getNodeSizes(heightMarkerRef.current);
    const widthMarkerSizes = getNodeSizes(widthMarkerRef.current);
    const textBarFullSizes = {
      width: textBarSizes.width + heightMarkerSizes.width,
      height: textBarSizes.height + widthMarkerSizes.height,
    };

    return textBarFullSizes;
  }, [heightMarkerRef, textBarRef, widthMarkerRef]);
  // calc text sizes -END

  // calc font size by ratio beetwen width/height
  const calcCorrectFontSize = useCallback(
    (prevFontSize) => {
      const { width: screenWidth, height: screenHeight } = innerScreenSize;
      const { width: textWidth, height: textHeight } = calcTextBarFullSizes();
      let k = 1;
      const xK = screenWidth / textWidth;
      const yK = screenHeight / textHeight;
      if (xK <= yK) {
        k = xK;
      } else {
        k = yK;
      }
      return prevFontSize * k;
    },
    [innerScreenSize, calcTextBarFullSizes]
  );
  // calc font size by ratio beetwen width/height

  // set text bar margins
  useEffect(() => {
    const { width: wrapperWidth } = innerScreenSize;
    const textBarSizes = getNodeSizes(textBarRef.current);
    const heightMarkerSizes = getNodeSizes(heightMarkerRef.current);
    const { marginLeft, marginRight } = getMargins(
      wrapperWidth,
      textBarSizes.width,
      heightMarkerSizes.width
    );
    containerRef.current.style.marginLeft = marginLeft;
    containerRef.current.style.marginRight = marginRight;
  }, [containerRef, heightMarkerRef, innerScreenSize, textBarRef]);
  // set text bar margins -END

  // set font size by width or height  text bar goes to more than container
  useEffect(() => {
    setFontSize((p) => {
      const newFontSize = calcCorrectFontSize(p);

      return newFontSize >= initialFontSize
        ? initialFontSize
        : Math.floor(newFontSize);
    });
  }, [text, innerScreenSize, calcCorrectFontSize, lettersFormat, font]);
  // set font size by width or height  text bar goes to more than container -END

  return fontSize;
};
