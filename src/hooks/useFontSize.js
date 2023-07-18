import { getNodeSizes, getStylePropertyValue } from "../services/helpers";
import { useEffect, useState } from "react";

const initialFontSize = 48;
const scaleStep = 0.1;
const letterRatio = 1.5; // "a" = 1k -> "w" ~ 1.5k

const getMargins = (innerScreenWidth, textBarWidth, heightMarkerWidth) => {
  const margin = (innerScreenWidth - textBarWidth - heightMarkerWidth) / 2;
  return {
    marginLeft: margin + heightMarkerWidth / 2 + "px",
    marginRight: margin - heightMarkerWidth / 2 + "px",
  };
};

const getNextLetterSizes = (node, nodeText) => {
  const { "font-size": fontSize, "line-height": lineHeight } =
    getStylePropertyValue(node, "font-size", "line-height");

  const width = Math.round((node.clientWidth / nodeText.length) * 1.5);
  const height =
    typeof lineHeight === "string"
      ? Math.round((parseFloat(fontSize) * parseFloat(lineHeight)) / 100)
      : parseFloat(fontSize) * lineHeight;

  return {
    width,
    height,
  };
};

export const useFontSize = ({ innerScreenSize, refs, text }) => {
  const [fontSize, setFontSize] = useState(initialFontSize);

  const { containerRef, textBarRef, textRef, heightMarkerRef, widthMarkerRef } =
    refs;

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
    const { width: wrapperWidth, height: wrapperHeight } = innerScreenSize;
    const textBarSizes = getNodeSizes(textBarRef.current);
    const heightMarkerSizes = getNodeSizes(heightMarkerRef.current);
    const widthMarkerSizes = getNodeSizes(widthMarkerRef.current);
    const textBarFullSizes = {
      textBarFullWidth: textBarSizes.width + heightMarkerSizes.width,
      textBarFullHeight: textBarSizes.height + widthMarkerSizes.height,
    };

    const { textBarFullWidth, textBarFullHeight } = textBarFullSizes;

    const curWidthRatio = textBarFullWidth / wrapperWidth;
    const curHeightRatio = textBarFullHeight / wrapperHeight;

    const { width: nextLetterWidth, height: nextLetterHeight } =
      getNextLetterSizes(textRef.current, text);
    const nextWidthRatio =
      (textBarFullWidth + nextLetterWidth * letterRatio) / wrapperWidth;

    const nextHeightRatio =
      (textBarFullHeight + nextLetterHeight) / wrapperHeight;

    if (nextWidthRatio > 1 || nextHeightRatio > 1) {
      setFontSize((p) => Math.round(p * (1 - scaleStep)));
      return;
    }
    if (
      (nextWidthRatio < 0.5 && curWidthRatio <= 1 - scaleStep) ||
      (nextHeightRatio < 0.5 && curHeightRatio <= 1 - scaleStep)
    ) {
      setFontSize((p) => {
        const nextFontSize = Math.round(p * (1 + scaleStep));
        return p >= 48 ? p : nextFontSize;
      });
      return;
    }
  }, [
    text,
    innerScreenSize,
    containerRef,
    textBarRef,
    textRef,
    heightMarkerRef,
    widthMarkerRef,
  ]);
  // set font size by width or height  text bar goes to more than container -END

  return fontSize;
};
