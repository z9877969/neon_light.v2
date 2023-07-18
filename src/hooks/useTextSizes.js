import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { getNodeSizes } from "../services/helpers";

const DISPLAY_MAX_SIZE = 200;

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
    return markerValue / nodeSize;
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
    calcMarkerValue,
    setTextWidth,
    setTextHeight,
  ]);
  // change markers by changed text or changed k -END
  // ===
  // change markers sizes if width or height more than max
  useEffect(() => {
    const { width: nodeXSize, height: nodeYSize } = getNodeSizes(
      textRef.current
    );
    const widthMarkerNum = Number(widthMarker);
    const heightMarkerNum = Number(heightMarker);
    if (
      widthMarkerNum > DISPLAY_MAX_SIZE &&
      heightMarkerNum > DISPLAY_MAX_SIZE
    ) {
      if (widthMarkerNum > heightMarkerNum) {
        const k = calcK(DISPLAY_MAX_SIZE, nodeXSize);
        setWithMaxSizeError(maxSizesMessages.bothAndWidthMore);
        setK(k);
      }
      if (heightMarkerNum >= widthMarkerNum) {
        const k = calcK(DISPLAY_MAX_SIZE, nodeYSize);
        setWithMaxSizeError(maxSizesMessages.bothAndHeightMore);
        setK(k);
      }
      return;
    }
    if (
      widthMarkerNum > DISPLAY_MAX_SIZE &&
      heightMarkerNum <= DISPLAY_MAX_SIZE
    ) {
      const k = calcK(DISPLAY_MAX_SIZE, nodeXSize);
      // setWithMaxSizeError(maxSizesMessages.onlyWidth);
      setK(k);
      return;
    }
    if (
      heightMarkerNum > DISPLAY_MAX_SIZE &&
      widthMarkerNum <= DISPLAY_MAX_SIZE
    ) {
      const k = calcK(DISPLAY_MAX_SIZE, nodeYSize);
      // setWithMaxSizeError(maxSizesMessages.onlyHeight);
      setK(k);
      return;
    }
  }, [widthMarker, heightMarker, calcK]);
  // change markers sizes if width or height more than max -END

  useEffect(() => {
    firstRenderRef.current = false;
    return () => {
      setTextHeight((p) => Number(p));
      setTextWidth(0);
    };
  }, [setTextHeight, setTextWidth]);

  return textSizesOptions;
};
