import { getNodeSizes, getStylePropertyValue } from "../services/helpers";
import { useEffect, useMemo, useState } from "react";

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

const initialFontSize = 48;

export const useFontSize = (innerScreenSize, refs, text) => {
  const [fontSize, setFontSize] = useState(initialFontSize);
  const { containerRef, textBarRef, textRef, heightMarkerRef, widthMarkerRef } =
    refs;

  useEffect(() => {
    const { width: wrapperWidth, height: wrapperHeight } = innerScreenSize;
    const textBarSizes = getNodeSizes(textBarRef.current);
    const textSizes = getNodeSizes(textRef.current);
    const heightMarkerSizes = getNodeSizes(heightMarkerRef.current);
    const widthMarkerSizes = getNodeSizes(widthMarkerRef.current);
    const textBarFullSizes = {
      width: textBarSizes.width + heightMarkerSizes.width,
      height: textBarSizes.height + widthMarkerSizes.height,
    };

    const { width: textBarWidthF, height: textBarHeightF } = textBarFullSizes;

    const { marginLeft, marginRight } = getMargins(
      wrapperWidth,
      textBarSizes.width,
      heightMarkerSizes.width
    );
    containerRef.current.style.marginLeft = marginLeft;
    containerRef.current.style.marginRight = marginRight;

    const scaleStep = 0.1;
    // const curWidthRatio = textBarWidthF / wrapperWidth;
    const curHeightRatio = textBarHeightF / wrapperHeight;

    const { width: nextLetterWidth, height: nextLetterHeight } =
      getNextLetterSizes(textRef.current, text);
    const nextWidthRatio =
      (textBarWidthF + nextLetterWidth * 1.5) / wrapperWidth;

    const nextHeightRatio = (textBarHeightF + nextLetterHeight) / wrapperHeight;

    if (nextWidthRatio > 1 || nextHeightRatio > 1) {
      setFontSize((p) => Math.round(p * (1 - scaleStep)));
      return;
    }
    if (
      (nextWidthRatio < 0.5 && curHeightRatio < 1 - scaleStep) ||
      (nextHeightRatio < 0.5 && curHeightRatio < 1 - scaleStep)
    ) {
      setFontSize((p) => {
        const nextFontSize = Math.round(p * (1 + scaleStep));
        return nextFontSize > 120 || p >= 48 ? p : nextFontSize;
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

  return fontSize;
};
