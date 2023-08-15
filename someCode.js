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