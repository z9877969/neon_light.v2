import { useCallback, useEffect, useRef, useState } from "react";

import { getNodeSizes } from "../services/helpers";

export const useTextMarkersValue = ({
  widthMarker,
  heightMarker,
  setTextWidth,
  setTextHeight,
  text,
}) => {
  const [k, setK] = useState(1);

  const textRef = useRef(null);

  const firstRenderRef = useRef(true);
  const prevKRef = useRef(1);

  const calcK = useCallback((markerValue, nodeSize) => {
    return markerValue / nodeSize;
  }, []);
  const calcMarkerValue = useCallback((k, nodeSize) => {
    return Math.round(k * nodeSize);
  }, []);

  // calc k | set base ratio beetween textHeight and nodeYSize and set base textWidth by textHeight
  useEffect(() => {
    if (!firstRenderRef.current) return;
    const { height: nodeYSize } = getNodeSizes(textRef.current);
    const k = calcK(heightMarker, nodeYSize);
    setK(k);
    // setTextWidth(calcMarkerValue(k, nodeXSize));
    prevKRef.current = k;
  }, [heightMarker, calcK, calcMarkerValue, setTextWidth]);
  // calc k | set base ratio beetween textHeight and nodeYSize and set base textWidth by textHeight -END
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
    const { width: nodeXSize, height: nodeYSize } = getNodeSizes(
      textRef.current
    );
    const newWidthMarker = calcMarkerValue(k, nodeXSize);
    setTextWidth(newWidthMarker);
    const newHeightMarker = calcMarkerValue(k, nodeYSize);
    setTextHeight(newHeightMarker);
  }, [text, k, calcMarkerValue, setTextWidth, setTextHeight]);
  // change markers by changed text or changed k -END

  useEffect(() => {
    firstRenderRef.current = false;
    return () => {
      setTextHeight((p) => Number(p));
      setTextWidth(0);
    };
  }, [setTextHeight, setTextWidth]);

  return textRef;
};
