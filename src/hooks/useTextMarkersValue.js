import { useCallback, useEffect, useRef, useState } from "react";

import { getNodeSizes } from "../services/helpers";

const getIsSpaceInStrEnd = (str) => {
  return str.split("\n").some((el) => el.slice(-1) === " ");
};

let render = 0;

export const useTextMarkersValue = ({
  widthMarker,
  heightMarker,
  setTextWidth,
  setTextHeight,
  text,
}) => {
  const [xK, setXK] = useState(1);
  const [yK, setYK] = useState(1);

  const textRef = useRef(null);
  // const prevNodeWidthRef = useRef(0);
  // const prevNodeHeightRef = useRef(0);
  // const prevWidthMarkerRef = useRef(0);
  // const prevHeighMarkerRef = useRef(0);

  const firstRenderRef = useRef(true);

  const calcK = useCallback((markerValue, nodeSize) => {
    return markerValue / nodeSize;
  }, []);
  const calcMarkerValue = useCallback((k, nodeSize) => {
    return k * nodeSize;
  }, []);

  useEffect(() => {
    render += 1;
  });

  // calc xK | ratio beetween text container x size and x marker value
  useEffect(() => {
    if (firstRenderRef.current) return;
    const { width: nodeXSize, height: nodeYSize } = getNodeSizes(
      textRef.current
    );
    const xK = calcK(widthMarker, nodeXSize);

    if (xK === yK) return;
    setXK(xK);
  }, [calcK, yK, widthMarker]);
  // calc xK -END
  // ===
  // calc yK | ratio beetween text container y size and y marker value
  useEffect(() => {
    const { width: nodeXSize, height: nodeYSize } = getNodeSizes(
      textRef.current
    );
    const yK = calcK(heightMarker, nodeYSize);

    setYK(yK);
    // setTextWidth(calcMarkerValue(yK, nodeXSize));
  }, [
    heightMarker,
    calcK,
    //  calcMarkerValue, setTextWidth
  ]);
  // calc xK -END

  // change widthMarker by changed yK
  useEffect(() => {
    if (firstRenderRef.current) return;
    const { width: nodeXSize, height: nodeYSize } = getNodeSizes(
      textRef.current
    );
    setTextWidth(nodeXSize * yK);
  }, [yK, setTextWidth]);
  // change widthMarker by changed yK -END

  // // change widthMarker after changing heightMarker
  // /*
  //   new node width
  //     -> change width value
  //   new height value && not new node width
  //     -> change width value
  // */
  // useEffect(() => {
  //   const heightMarkerNum = Number(heightMarker); // 1r -> 8 | 2r -> 8
  //   if (!heightMarkerNum || getIsSpaceInStrEnd(text)) return; // 1r -> continue | 2r -> continue

  //   const { width: nodeWidth, height: nodeHeight } = getNodeSizes(
  //     textRef.current
  //   ); // 1r -> nW: 27, nH 58 | 2r -> nW: 27, nH 56

  //   console.log("text.length :>> ", text.length);

  //   const prevHeightMarker = prevHeighMarkerRef.current; // 1r -> 0 | 2r -> 8
  //   const prevNodeWidth = prevNodeWidthRef.current; // 1r -> 27
  //   const isChangedHeightMarker = prevHeightMarker !== heightMarkerNum; // 1r -> true | 2r -> false
  //   const isChangedNodeWidth = prevNodeWidth !== nodeWidth; // 1r -> true | 2r -> false

  //   // console.group("change width marker");
  //   // console.log("render :>> ", render);
  //   // console.log("nodeWidth", nodeWidth);
  //   // console.log("nodeHeight", nodeHeight);
  //   // console.log("prevHeightMarker", prevHeightMarker);
  //   // console.log("prevNodeWidth", prevNodeWidth);
  //   // console.log("isChangedHeightMarker", isChangedHeightMarker);
  //   // console.log("isChangedNodeWidth", isChangedNodeWidth);
  //   // console.log(
  //   //   "canChangeWidthMarker :>> ",
  //   //   isChangedNodeWidth || (isChangedHeightMarker && !isChangedNodeWidth)
  //   // );
  //   // console.groupEnd();

  //   if (isChangedNodeWidth || (isChangedHeightMarker && !isChangedNodeWidth)) {
  //     // 1r -> continue| 2r -> return
  //     prevNodeWidthRef.current = nodeWidth; // 1r -> 27
  //     prevHeighMarkerRef.current = heightMarkerNum; // 1r -> 8

  //     const heightRatio = heightMarkerNum / nodeHeight; // 1r -> 8/56 // k = cm/px -> markerValue = cm/px * px -> k * nodeWidth
  //     setTextWidth(Math.round(nodeWidth * heightRatio)); // 1r -> 27*8/56 = 4
  //   }
  // }, [
  //   heightMarker, // change true
  //   widthMarker, // change true
  //   text, // change true
  //   setTextWidth, // change false
  //   prevNodeWidthRef, // change false
  // ]);
  // // change widthMarker after changing heightMarker -END
  // // ===
  // // change heightMarker after changing widthMarker
  // /*
  //   new node height
  //     -> change height value
  //   new width value && not new node height
  //     -> change height value
  // */
  // useEffect(() => {
  //   const widthMarkerNum = Number(widthMarker); // 1r -> 0 | 2r ->
  //   if (!widthMarkerNum || getIsSpaceInStrEnd(text)) return; // 1r -> return

  //   const { width: nodeWidth, height: nodeHeight } = getNodeSizes(
  //     textRef.current
  //   );

  //   const prevNodeHeight = prevNodeHeightRef.current;
  //   const prevWidthMarker = prevWidthMarkerRef.current;
  //   const isChangedWidthMarkerValue = prevWidthMarker !== widthMarkerNum;
  //   const isChangedNodeHeight = nodeHeight !== prevNodeHeight;
  //   // console.group("change height marker");
  //   // console.log("render :>> ", render);
  //   // console.log("nodeWidth", nodeWidth);
  //   // console.log("nodeHeight", nodeHeight);
  //   // console.log("prevNodeHeight", prevNodeHeight);
  //   // console.log("prevWidthMarker", prevWidthMarker);
  //   // console.log("isChangedWidthMarkerValue", isChangedWidthMarkerValue);
  //   // console.log("isChangedNodeHeight", isChangedNodeHeight);
  //   // console.log(
  //   //   "canChangeHeightMarker :>>",
  //   //   isChangedNodeHeight || (isChangedWidthMarkerValue && !isChangedNodeHeight)
  //   // );
  //   // console.groupEnd();
  //   if (
  //     isChangedNodeHeight ||
  //     (isChangedWidthMarkerValue && !isChangedNodeHeight)
  //   ) {
  //     prevNodeHeightRef.current = nodeHeight;
  //     prevWidthMarkerRef.current = widthMarkerNum;
  //     const widthRatio = widthMarkerNum / nodeWidth;
  //     setTextHeight(Math.round(nodeHeight * widthRatio));
  //   }
  // }, [
  //   widthMarker, // change true
  //   text, // change true
  //   setTextHeight, // change false
  //   prevNodeHeightRef, // change false
  // ]);
  // // change heightMarker after changing widthMarker - END

  useEffect(() => {
    firstRenderRef.current = false;
    return () => {
      setTextHeight((p) => Number(p));
      setTextWidth(0);
    };
  }, [setTextHeight, setTextWidth]);

  return textRef;
};

/* 

*/
