// useEffect(() => {
//     // wSm = wPx/hPx*hSm
//     // hSm = hPx/wPx*wSm
//     if (firstRenderRef.current) return;
//     if (
//       nodeSize.width !== nodeXSizeRef.current ||
//       nodeSize.height !== nodeYSizeRef.current
//     ) {
//       if (nodeSize.width !== nodeXSizeRef.current) {
//         const newWidthMarker =
//           (nodeSize.width / nodeSize.height) * heightMarker;
//         setTextWidth(newWidthMarker);
//         nodeXSizeRef.current = nodeSize.width;
//         widthMarkerRef.current = newWidthMarker;
//       }
//       if (nodeSize.height !== nodeYSizeRef.current) {
//         const newHeightMarker =
//           (nodeSize.height / nodeSize.width) * widthMarker;
//         setTextHeight(newHeightMarker);
//         nodeYSizeRef.current = nodeSize.height;
//         heightMarkerRef.current = newHeightMarker;
//       }
//       return;
//     }

//     // =================================================================
//     const { curMinHeight, curMinWidth } = calcMinSizes({
//       nodeXSize: nodeSize.width,
//       nodeYSize: nodeSize.height,
//       heightMarker,
//       text,
//     });

//     if (
//       heightMarker >= curMinHeight &&
//       heightMarker <= MAX_HEIGHT &&
//       widthMarker >= curMinWidth &&
//       widthMarker <= MAX_WIDTH
//     ) {
//       return;
//     }
//     // wSm = wPx/hPx*hSm
//     // hSm = hPx/wPx*wSm
//     if (
//       Math.round(heightMarker) < curMinHeight ||
//       Math.round(widthMarker) < curMinWidth
//     ) {
//       // setSideSizeError(errorMessages.litleRowSize);
//       console.log(errorMessages.litleRowSize);
//     }

//     if (widthMarker > MAX_WIDTH) {
//       if (nodeSize.width >= nodeSize.height) {
//         setTextWidth(MAX_WIDTH);
//         const newMarkerHeight = changeToFloat(
//           (nodeSize.height / nodeSize.width) * MAX_WIDTH
//         );
//         setTextHeight(newMarkerHeight);
//         widthMarkerRef.current = MAX_WIDTH;
//         heightMarkerRef.current = newMarkerHeight;
//       } else {
//         setTextHeight(MAX_HEIGHT);
//         const newMarkerWidth = changeToFloat(
//           (nodeSize.width / nodeSize.height) * MAX_HEIGHT
//         );
//         setTextWidth(newMarkerWidth);
//         heightMarkerRef.current = MAX_HEIGHT;
//         widthMarkerRef.current = newMarkerWidth;
//       }
//       nodeXSizeRef.current = nodeSize.width;
//       nodeYSizeRef.current = nodeSize.height;
//       return;
//     }
//     if (heightMarker > MAX_HEIGHT) {
//       if (nodeSize.height >= nodeSize.width) {
//         setTextHeight(MAX_HEIGHT);
//         const newMarkerWidth = changeToFloat(
//           (nodeSize.width / nodeSize.height) * MAX_HEIGHT
//         );
//         setTextWidth(newMarkerWidth);
//         heightMarkerRef.current = MAX_HEIGHT;
//         widthMarkerRef.current = newMarkerWidth;
//       } else {
//         setTextWidth(MAX_WIDTH);
//         const newMarkerHeight = changeToFloat(
//           (nodeSize.height / nodeSize.width) * MAX_WIDTH
//         );
//         setTextHeight(newMarkerHeight);
//         widthMarkerRef.current = MAX_WIDTH;
//         heightMarkerRef.current = newMarkerHeight;
//       }
//       nodeXSizeRef.current = nodeSize.width;
//       nodeYSizeRef.current = nodeSize.height;
//       return;
//     }
//     if (widthMarker < curMinWidth) {
//       setTextWidth(curMinWidth);
//       widthMarkerRef.current = curMinWidth;
//       nodeXSizeRef.current = nodeSize.width;
//     }
//     if (heightMarker < curMinHeight) {
//       setTextHeight(curMinHeight);
//       heightMarkerRef.current = curMinHeight;
//       nodeYSizeRef.current = nodeSize.height;
//     }
//     // eslint-disable-next-line
//   }, [nodeSize.width, nodeSize.height, setTextHeight, setTextWidth]);

// useEffect(() => {
//     if (firstRenderRef.current) return;
//     const { width: nodeXSize, height: nodeYSize } = getNodeSizes(
//       textRef.current
//     );
    // const { curMinHeight, curMinWidth } = calcMinSizes({
    //   nodeXSize,
    //   nodeYSize,
    //   heightMarker,
    //   text,
    // });

    // if (
    //   heightMarker >= curMinHeight &&
    //   heightMarker <= MAX_HEIGHT &&
    //   widthMarker >= curMinWidth &&
    //   widthMarker <= MAX_WIDTH
    // ) {
    //   return;
    // }
    // // wSm = wPx/hPx*hSm
    // // hSm = hPx/wPx*wSm
    // if (
    //   // (heightMarker < curMinHeight && widthMarker > MAX_WIDTH) ||
    //   // (widthMarker < curMinWidth && heightMarker > MAX_HEIGHT) ||
    //   // (heightMarker < curMinHeight && widthMarker < curMinWidth)
    //   Math.round(heightMarker) < curMinHeight ||
    //   Math.round(widthMarker) < curMinWidth
    // ) {
    //   setSideSizeError(errorMessages.litleRowSize);
    //   console.log(errorMessages.litleRowSize);
    // }

    // if (widthMarker > MAX_WIDTH) {
    //   if (nodeXSize >= nodeYSize) {
    //     setTextWidth(MAX_WIDTH);
    //     const newMarkerHeight = changeToFloat(
    //       (nodeYSize / nodeXSize) * MAX_WIDTH
    //     );
    //     setTextHeight(newMarkerHeight);
    //     widthMarkerRef.current = MAX_WIDTH;
    //     heightMarkerRef.current = newMarkerHeight;
    //   } else {
    //     setTextHeight(MAX_HEIGHT);
    //     const newMarkerWidth = changeToFloat(
    //       (nodeXSize / nodeYSize) * MAX_HEIGHT
    //     );
    //     setTextWidth(newMarkerWidth);
    //     heightMarkerRef.current = MAX_HEIGHT;
    //     widthMarkerRef.current = newMarkerWidth;
    //   }
    //   nodeXSizeRef.current = nodeXSize;
    //   nodeYSizeRef.current = nodeYSize;
    //   return;
    // }
    // if (heightMarker > MAX_HEIGHT) {
    //   if (nodeYSize >= nodeXSize) {
    //     setTextHeight(MAX_HEIGHT);
    //     const newMarkerWidth = changeToFloat(
    //       (nodeXSize / nodeYSize) * MAX_HEIGHT
    //     );
    //     setTextWidth(newMarkerWidth);
    //     heightMarkerRef.current = MAX_HEIGHT;
    //     widthMarkerRef.current = newMarkerWidth;
    //   } else {
    //     setTextWidth(MAX_WIDTH);
    //     const newMarkerHeight = changeToFloat(
    //       (nodeYSize / nodeXSize) * MAX_WIDTH
    //     );
    //     setTextHeight(newMarkerHeight);
    //     widthMarkerRef.current = MAX_WIDTH;
    //     heightMarkerRef.current = newMarkerHeight;
    //   }
    //   nodeXSizeRef.current = nodeXSize;
    //   nodeYSizeRef.current = nodeYSize;
    //   return;
    // }
    // if (widthMarker < curMinWidth) {
    //   setTextWidth(curMinWidth);
    //   widthMarkerRef.current = curMinWidth;
    //   nodeXSizeRef.current = nodeXSize;
    // }
    // if (heightMarker < curMinHeight) {
    //   setTextHeight(curMinHeight);
    //   heightMarkerRef.current = curMinHeight;
    //   nodeYSizeRef.current = nodeYSize;
    // }
    // eslint-disable-next-line
//   }, [widthMarker, heightMarker, textRef, setTextHeight, setTextWidth]);

 // useEffect(() => {
  //   if (firstRenderRef.current) return;
  //   const { width: nodeXSize, height: nodeYSize } = getNodeSizes(
  //     textRef.current
  //   );
  //   console.log("nodeXSize :>> ", nodeXSize);
  //   console.log("nodeYSize :>> ", nodeYSize);

  //   const { curRowHeight } = calcMinSizes({
  //     nodeXSize,
  //     nodeYSize,
  //     widthMarker,
  //     text,
  //   });

  //   // if (curRowHeight < MIN_HEIGHT) {
  //   //   setSideSizeError(errorMessages.litleRowSize);
  //   //   console.log(errorMessages.litleRowSize);
  //   //   return;
  //   // }

  //   if (nodeXSizeRef !== nodeXSizeRef.current) {
  //     console.log("change xSize");
  //     // wSm = wPx/hPx*hSm
  //     // yK = newPx/oldPx = newSm/oldSm -> newSm = newPx/oldPx * oldSm -> yK * oldSm
  //     const yK = nodeYSize / nodeYSizeRef.current;
  //     const newHeightMarker = heightMarker * yK;
  //     const newWidthMarker = changeToFloat(
  //       (nodeXSize / nodeYSize) * newHeightMarker
  //     );
  //     if (newWidthMarker > MAX_WIDTH) {
  //       console.log("newWidthMarker :>> ", newWidthMarker);
  //       console.log("newWidthMarker > MAX_WIDTH");
  //       setText((p) => replaceTextToNewRow(p));
  //     } else {
  //       setTextWidth(newWidthMarker);
  //       setTextHeight(newHeightMarker);
  //       widthMarkerRef.current = newWidthMarker;
  //       heightMarkerRef.current = newHeightMarker;
  //       nodeXSizeRef.current = nodeXSize;
  //       nodeYSizeRef.current = nodeYSize;
  //     }
  //     return;
  //   }
  //   if (nodeYSize !== nodeYSizeRef.current) {
  //     console.log("change ySize");
  //     // hSm = hPx/wPx*wSm
  //     const yK = nodeYSize / nodeYSizeRef.current;
  //     const newHeightMarker = heightMarker * yK;
  //     const newWidthMarker = changeToFloat(
  //       (nodeXSize / nodeYSize) * newHeightMarker
  //     );
  //     setTextWidth(newWidthMarker);
  //     setTextHeight(newHeightMarker);
  //     widthMarkerRef.current = newWidthMarker;
  //     heightMarkerRef.current = newHeightMarker;
  //     nodeXSizeRef.current = nodeXSize;
  //     nodeYSizeRef.current = nodeYSize;
  //   }
  //   // eslint-disable-next-line
  // }, [text]);