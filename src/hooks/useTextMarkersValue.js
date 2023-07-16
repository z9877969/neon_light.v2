import { useEffect, useRef } from "react";

import { getNodeSizes } from "../services/helpers";

export const useTextMarkersValue = ({
  widthMarker,
  heightMarker,
  setTextWidth,
  setTextHeight,
  text,
}) => {
  const textRef = useRef(null);
  const prevNodeWidthRef = useRef(0);
  const prevNodeHeightRef = useRef(0);
  const prevWidthMarkerRef = useRef(0);
  const prevHeighMarkerRef = useRef(0);

  // change widthMarker after changing heightMarker
  /* 
    new node width 
      -> change width value
    new height value && not new node width
      -> change width value
  */
  useEffect(() => {
    const heightMarkerNum = Number(heightMarker);
    if (!heightMarkerNum) return;

    const { width: nodeWidth, height: nodeHeight } = getNodeSizes(
      textRef.current
    );

    const prevHeightMarker = prevHeighMarkerRef.current;
    const prevNodeWidth = prevNodeWidthRef.current;
    const isChangedHeightMarker = prevHeightMarker !== heightMarkerNum;
    const isChangedNodeWidth = prevNodeWidth !== nodeWidth;

    if (
      nodeWidth !== prevNodeWidth ||
      (isChangedHeightMarker && !isChangedNodeWidth)
    ) {
      prevNodeWidthRef.current = nodeWidth;
      prevHeighMarkerRef.current = heightMarkerNum;

      const heightRatio = heightMarkerNum / nodeHeight; // k = cm/px -> markerValue = cm/px * px -> k * nodeWidth
      setTextWidth(Math.round(nodeWidth * heightRatio));
    }
  }, [
    heightMarker, // change true
    widthMarker, // change true
    text, // change true
    setTextWidth, // change false
    prevNodeWidthRef, // change false
  ]);
  // change widthMarker after changing heightMarker -END
  // ===
  // change heightMarker after changing widthMarker
  /* 
    new node height 
      -> change height value
    new width value && not new node height
      -> change height value
  */
  useEffect(() => {
    const widthMarkerNum = Number(widthMarker);
    if (!widthMarkerNum) return;

    const { width: nodeWidth, height: nodeHeight } = getNodeSizes(
      textRef.current
    );

    const prevNodeHeight = prevNodeHeightRef.current;
    const prevWidthMarker = prevWidthMarkerRef.current;
    const isChangedWidthMarkerValue = prevWidthMarker !== widthMarkerNum;
    const isChangedNodeHeight = prevNodeHeight !== nodeHeight;
    if (
      nodeHeight !== prevNodeHeight ||
      (isChangedWidthMarkerValue && !isChangedNodeHeight)
    ) {
      prevNodeHeightRef.current = nodeHeight;
      prevWidthMarkerRef.current = widthMarkerNum;
      const widthRatio = widthMarkerNum / nodeWidth;
      setTextHeight(Math.round(nodeHeight * widthRatio));
    }
  }, [
    widthMarker, // change true
    text, // change true
    setTextHeight, // change false
    prevNodeHeightRef, // change false
  ]);
  // change heightMarker after changing widthMarker - END

  useEffect(() => {
    return () => {
      setTextHeight((p) => Number(p));
      setTextWidth(0);
    };
  }, [setTextHeight, setTextWidth]);

  return textRef;
};
