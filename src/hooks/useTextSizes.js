import { fontSize as fontSizeConstants, textSizeConstants } from "constants";
import { useEffect, useMemo, useRef, useState } from "react";

import { getNodeSizes } from "../services/helpers";

const { MIN_HEIGHT } = textSizeConstants;

// const maxSizesMessages = {
//   onlyWidth:
//     "Максимальна ширина може бути 200см. Тому для даного варіанту тексту відповідну висоту зменшено автоматично.",
//   onlyHeight:
//     "Максимальна висота може бути 200см. Тому для даного варіанту відповідну ширину зменшено автоматично.",
//   bothAndWidthMore:
//     "Максимальна ширина може бути 200см. Тому, для даного варіанту тексту, автоматично зменшено ширину до 200см, та висоту пераховано відповідно до цієї ширини.",
//   bothAndHeightMore:
//     "Максимальна висота може бути 200см. Тому, для даного варіанту тексту, автоматично зменшено висоту до 200см, та ширину перераховано відповідно до цієї висоти.",
// };

const changeToFloat = (num) => Math.round(num * 100) / 100;

export const useTextSizes = ({
  widthMarker,
  heightMarker,
  setTextWidth,
  setTextHeight,
  text,
  lettersFormat,
  font,
  textRef,
}) => {
  const [withMaxSizeError, setWithMaxSizeError] = useState(null);

  const firstRenderRef = useRef(true);
  const heightMarkerRef = useRef(heightMarker);
  const widthMarkerRef = useRef(widthMarker);
  const nodeYSizeRef = useRef(0);
  const nodeXSizeRef = useRef(0);

  const textSizesOptions = useMemo(
    () => ({
      withMaxSizeError,
      setWithMaxSizeError,
    }),
    [withMaxSizeError]
  );
  // ===
  useEffect(() => {
    if (!firstRenderRef.current) return;
    const { width: nodeXSize, height: nodeYSize } = getNodeSizes(
      textRef.current
    );
    const widthMarker = Math.round((nodeXSize / nodeYSize) * heightMarker);
    setTextWidth(widthMarker);
    widthMarkerRef.current = widthMarker;
    heightMarkerRef.current = heightMarker;
  }, [heightMarker, textRef, setTextWidth]);
  // ===
  useEffect(() => {
    if (firstRenderRef.current) return;
    if (widthMarker !== widthMarkerRef.current) {
      // hSm = hPx/wPx*wSm
      const { width: nodeXSize, height: nodeYSize } = getNodeSizes(
        textRef.current
      );
      const heightMarker = changeToFloat((nodeYSize / nodeXSize) * widthMarker);
      setTextHeight(heightMarker);
      heightMarkerRef.current = heightMarker;
      widthMarkerRef.current = widthMarker;
      nodeYSizeRef.current = nodeYSize;
      nodeXSizeRef.current = nodeXSize;
    }
  }, [widthMarker, textRef, setTextHeight]);
  useEffect(() => {
    if (firstRenderRef.current) return;
    if (heightMarker !== heightMarkerRef.current) {
      // wSm = wPx/hPx*hSm
      const { width: nodeXSize, height: nodeYSize } = getNodeSizes(
        textRef.current
      );
      const widthMarker = changeToFloat((nodeXSize / nodeYSize) * heightMarker);
      setTextWidth(widthMarker);
      heightMarkerRef.current = heightMarker;
      widthMarkerRef.current = widthMarker;
      nodeYSizeRef.current = nodeYSize;
      nodeXSizeRef.current = nodeXSize;
    }
  }, [heightMarker, textRef, setTextWidth]);
  // ===
  useEffect(() => {
    if (firstRenderRef.current) return;

    const { width: nodeXSize, height: nodeYSize } = getNodeSizes(
      textRef.current
    );
    if (nodeXSizeRef !== nodeXSizeRef.current) {
      // wSm = wPx/hPx*hSm
      const widthMarker = changeToFloat((nodeXSize / nodeYSize) * heightMarker);
      setTextWidth(widthMarker);
      widthMarkerRef.current = widthMarker;
      nodeXSizeRef.current = nodeXSize;
    }
    if (nodeYSize !== nodeYSizeRef.current) {
      // hSm = hPx/wPx*wSm
      const heightMarker = changeToFloat((nodeYSize / nodeXSize) * widthMarker);
      setTextHeight(heightMarker);
      heightMarkerRef.current = heightMarker;
      nodeYSizeRef.current = nodeYSize;
    }
  }, [
    text,
    font,
    lettersFormat,
    textRef,
    widthMarker,
    heightMarker,
    setTextHeight,
    setTextWidth,
  ]);
  // change markers by changed text or changed k -END

  useEffect(() => {
    firstRenderRef.current = false;
    return () => {
      setTextHeight((p) => (Number(p) > MIN_HEIGHT ? Number(p) : MIN_HEIGHT));
      setTextWidth(0);
    };
  }, [setTextHeight, setTextWidth]);

  return textSizesOptions;
};

// change k-ratio and show error if width or height more than max
// useEffect(() => {
// const { width: nodeXSize, height: nodeYSize } = getNodeSizes(
//   textRef.current
// );
// const widthMarkerNum = Number(widthMarker);
// const heightMarkerNum = Number(heightMarker);
// if (widthMarkerNum > MAX_WIDTH && heightMarkerNum > MAX_HEIGHT) {
//   if (widthMarkerNum > heightMarkerNum) {
//     const k = calcK(MAX_WIDTH, nodeXSize);
//     setWithMaxSizeError(maxSizesMessages.bothAndWidthMore);
//     setK(k);
//   }
//   if (heightMarkerNum >= widthMarkerNum) {
//     const k = calcK(MAX_HEIGHT, nodeYSize);
//     setWithMaxSizeError(maxSizesMessages.bothAndHeightMore);
//     setK(k);
//   }
//   return;
// }
// if (widthMarkerNum > MAX_WIDTH && heightMarkerNum <= MAX_HEIGHT) {
//   const k = calcK(MAX_WIDTH, nodeXSize);
//   setK(k);
//   return;
// }
// if (heightMarkerNum > MAX_HEIGHT && widthMarkerNum <= MAX_WIDTH) {
//   const k = calcK(MAX_HEIGHT, nodeYSize);
//   setK(k);
//   return;
// }
// }, [widthMarker, heightMarker, textRef, calcK]);
// change k-ratio and show error if width or height more than max -END
