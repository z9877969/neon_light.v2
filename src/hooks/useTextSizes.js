import { fontSize as fontSizeConstants, textSizeConstants } from "constants";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { getNodeSizes } from "../services/helpers";

const { LINE_HEIGHT } = fontSizeConstants;
const { MAX_HEIGHT, MAX_WIDTH, MIN_HEIGHT } = textSizeConstants;

const maxSizesMessages = {
  onlyWidth:
    "Максимальна ширина може бути 200см. Тому для даного варіанту тексту відповідну висоту зменшено автоматично.",
  onlyHeight:
    "Максимальна висота може бути 200см. Тому для даного варіанту відповідну ширину зменшено автоматично.",
  bothAndWidthMore:
    "Максимальна ширина може бути 200см. Тому, для даного варіанту тексту, автоматично зменшено ширину до 200см, та висоту пераховано відповідно до цієї ширини.",
  bothAndHeightMore:
    "Максимальна висота може бути 200см. Тому, для даного варіанту тексту, автоматично зменшено висоту до 200см, та ширину перераховано відповідно до цієї висоти.",
};

const calcTextRows = (text) => {
  const fullRowsAmount = text
    .split("\n")
    .filter((el, i, arr) => !(i === arr.length - 1 && !el)).length;
  return fullRowsAmount;
};

export const useTextSizes = ({
  widthMarker,
  heightMarker,
  setTextWidth,
  setTextHeight,
  text,
  fontSize,
  lettersFormat,
  font,
}) => {
  const [k, setK] = useState(1);
  const [withMaxSizeError, setWithMaxSizeError] = useState(null);

  const textRef = useRef(null);

  const firstRenderRef = useRef(true);
  const prevKRef = useRef(1);
  const prevFontSize = useRef(fontSize);

  const calcK = useCallback((markerValue, nodeSize) => {
    return markerValue / nodeSize; // cm/px
  }, []);
  const calcMarkerValue = useCallback((k, nodeSize) => {
    return Math.round(k * nodeSize);
  }, []);

  const textSizesOptions = useMemo(
    () => ({
      textRef,
      withMaxSizeError,
      setWithMaxSizeError,
    }),
    [withMaxSizeError]
  );

  // calc k | set base ratio beetween textHeight and nodeYSize
  useEffect(() => {
    if (!firstRenderRef.current) return;
    const { height: nodeYSize } = getNodeSizes(textRef.current);
    const k = calcK(heightMarker, nodeYSize);
    setK(k);
    prevKRef.current = k;
  }, [heightMarker, calcK, calcMarkerValue]);
  // calc k | set base ratio beetween textHeight and nodeYSize -END
  // ===
  // set textHeight by textWidth
  useEffect(() => {
    if (firstRenderRef.current) return;
    const { width: nodeXSize, height: nodeYSize } = getNodeSizes(
      textRef.current
    );
    const k = calcK(widthMarker, nodeXSize);
    if (k === prevKRef.current) return;
    setK(k);
    prevKRef.current = k;
    setTextHeight(calcMarkerValue(k, nodeYSize));
  }, [widthMarker, calcK, calcMarkerValue, setTextHeight]);
  // set textHeight by textWidth -END
  // ===
  // set textWidth by textHeight
  useEffect(() => {
    if (firstRenderRef.current) return;
    const { width: nodeXSize, height: nodeYSize } = getNodeSizes(
      textRef.current
    );
    const k = calcK(heightMarker, nodeYSize);
    if (k === prevKRef.current) return;
    const newMarkerWidth = calcMarkerValue(k, nodeXSize);
    setTextWidth(newMarkerWidth);
  }, [heightMarker, calcK, calcMarkerValue, setTextWidth]);
  // set textWidth by textHeight -END
  // ===
  // change markers by changed text or changed k
  useEffect(() => {
    if (firstRenderRef.current) return;
    if (text.slice(-1) === " ") return;
    if (fontSize !== prevFontSize.current) {
      prevFontSize.current = fontSize;
      return;
    }
    const { width: nodeXSize, height: nodeYSize } = getNodeSizes(
      textRef.current
    );
    const newWidthMarker = calcMarkerValue(k, nodeXSize);
    setTextWidth(newWidthMarker);
    const newHeightMarker = calcMarkerValue(k, nodeYSize);
    setTextHeight(newHeightMarker);
  }, [
    text,
    fontSize,
    lettersFormat,
    font,
    k,
    setTextWidth,
    setTextHeight,
    calcMarkerValue,
  ]);
  // change markers by changed text or changed k -END
  // ===
  // change k-ratio if width or height more than max
  useEffect(() => {
    const { width: nodeXSize, height: nodeYSize } = getNodeSizes(
      textRef.current
    );
    const widthMarkerNum = Number(widthMarker);
    const heightMarkerNum = Number(heightMarker);
    if (widthMarkerNum > MAX_WIDTH && heightMarkerNum > MAX_HEIGHT) {
      if (widthMarkerNum > heightMarkerNum) {
        const k = calcK(MAX_WIDTH, nodeXSize);
        setWithMaxSizeError(maxSizesMessages.bothAndWidthMore);
        setK(k);
      }
      if (heightMarkerNum >= widthMarkerNum) {
        const k = calcK(MAX_HEIGHT, nodeYSize);
        setWithMaxSizeError(maxSizesMessages.bothAndHeightMore);
        setK(k);
      }
      return;
    }
    if (widthMarkerNum > MAX_WIDTH && heightMarkerNum <= MAX_HEIGHT) {
      const k = calcK(MAX_WIDTH, nodeXSize);
      setK(k);
      return;
    }
    if (heightMarkerNum > MAX_HEIGHT && widthMarkerNum <= MAX_WIDTH) {
      const k = calcK(MAX_HEIGHT, nodeYSize);
      setK(k);
      return;
    }
  }, [widthMarker, heightMarker, calcK]);
  // change k-ratio if width or height more than max -END

  // change k-ratio if row height less than min
  useEffect(() => {
    const heightMarkerNum = Number(heightMarker);
    const { height: nodeYSize } = getNodeSizes(textRef.current);
    const rowsAmount = calcTextRows(text);
    const correctMinHeight = rowsAmount * MIN_HEIGHT * LINE_HEIGHT;
    if (heightMarkerNum < correctMinHeight) {
      const k = calcK(correctMinHeight, nodeYSize);
      setK(k);
      return;
    }
  }, [text, widthMarker, heightMarker, calcK]);
  // change k-ratio if row height less than min -END

  useEffect(() => {
    firstRenderRef.current = false;
    return () => {
      setTextHeight((p) => (Number(p) > MIN_HEIGHT ? Number(p) : MIN_HEIGHT));
      setTextWidth(0);
    };
  }, [setTextHeight, setTextWidth]);

  return textSizesOptions;
};
