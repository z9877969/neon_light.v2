import { useEffect, useMemo, useRef, useState } from "react";

import { getNodeSizes } from "../services/helpers";
import { textSizeConstants } from "constants";

const { MIN_HEIGHT, MAX_HEIGHT, MAX_WIDTH } = textSizeConstants;

const maxSizesMessages = {
  onlyWidth:
    "Максимальна ширина може бути 200см. Тому значення введеного розміру ширини зменшено до 200, і для поточного варіанту тексту розмір висоти також автоматично зменшено відповідно до даної ширини.",
  onlyHeight:
    "Максимальна висота може бути 200см. Тому значення введеного розміру висоти зменшено до 200, і для поточного варіанту тексту розмір ширини також автоматично зменшено відповідно до даної висоти.",
  bothAndWidthMore:
    "Максимальна ширина може бути 200см. Тому, для даного варіанту тексту, автоматично зменшено ширину до 200см, та висоту пераховано відповідно до цієї ширини.",
  bothAndHeightMore:
    "Максимальна висота може бути 200см. Тому, для даного варіанту тексту, автоматично зменшено висоту до 200см, та ширину перераховано відповідно до цієї висоти.",
};

const changeToFloat = (num) => Math.floor(num * 100) / 100;

export const useTextSizes = ({
  widthMarker,
  heightMarker,
  setTextWidth,
  setTextHeight,
  text,
  setText,
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
    const widthMarker = changeToFloat((nodeXSize / nodeYSize) * heightMarker);
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
      setTextHeight(heightMarker >= 6 ? heightMarker : 6);
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
      // if (widthMarker > MAX_WIDTH) {
      //   setText((p) => {
      //     const devidedText = p.split("");
      //     devidedText.splice(devidedText.length - 2, 0, "\n");
      //     return devidedText.join("");
      //   });
      //   const heightMarker = changeToFloat(
      //     (nodeYSize / nodeXSize) * widthMarkerRef.current
      //   );
      //   setTextHeight(heightMarker);
      //   nodeXSizeRef.current = nodeXSize;
      // } else {
      //   setTextWidth(widthMarker);
      //   widthMarkerRef.current = widthMarker;
      //   nodeXSizeRef.current = nodeXSize;
      // }
      setTextWidth(widthMarker);
      widthMarkerRef.current = widthMarker;
      nodeXSizeRef.current = nodeXSize;
    }
    if (nodeYSize !== nodeYSizeRef.current) {
      // hSm = hPx/wPx*wSm
      const heightMarker = changeToFloat((nodeYSize / nodeXSize) * widthMarker);
      setTextHeight(heightMarker >= 6 ? heightMarker : 6);
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
    // setText,
  ]);
  // ===

  // changes widthMarker/heightMarker by another side and show error if its more than max
  useEffect(() => {
    const { width: nodeXSize, height: nodeYSize } = getNodeSizes(
      textRef.current
    );
    const widthMarkerNum = Math.floor(Number(widthMarker));
    const heightMarkerNum = Math.floor(Number(heightMarker));
    if (widthMarkerNum <= MAX_WIDTH && heightMarkerNum <= MAX_HEIGHT) return;
    let validWidth = MAX_WIDTH;
    let validHeight = MAX_HEIGHT;
    if (widthMarkerNum > MAX_WIDTH && heightMarkerNum > MAX_HEIGHT) {
      if (widthMarkerNum > heightMarkerNum) {
        // hSm = hPx/wPx*wSm
        validHeight = changeToFloat((nodeYSize / nodeXSize) * validWidth);
        setWithMaxSizeError(maxSizesMessages.bothAndWidthMore);
      }
      if (heightMarkerNum >= widthMarkerNum) {
        validWidth = changeToFloat((nodeXSize / nodeYSize) * validHeight);
        setWithMaxSizeError(maxSizesMessages.bothAndHeightMore);
      }
    } else {
      if (widthMarkerNum > MAX_WIDTH) {
        validHeight = changeToFloat((nodeYSize / nodeXSize) * validWidth);
        setWithMaxSizeError(maxSizesMessages.bothAndWidthMore);
      }
      if (heightMarkerNum > MAX_HEIGHT) {
        validWidth = changeToFloat((nodeXSize / nodeYSize) * validHeight);
        setWithMaxSizeError(maxSizesMessages.bothAndHeightMore);
      }
    }
    if (
      heightMarkerRef.current === validHeight &&
      widthMarkerRef.current === validWidth
    )
      return;

    setTextHeight(validHeight);
    setTextWidth(validWidth);
    heightMarkerRef.current = validHeight;
    widthMarkerRef.current = validWidth;
  }, [widthMarker, heightMarker, textRef, setTextHeight, setTextWidth]);
  // changes widthMarker/heightMarker by another side and show error if its more than max -END

  useEffect(() => {
    firstRenderRef.current = false;
    return () => {
      setTextHeight((p) => (Number(p) > MIN_HEIGHT ? Number(p) : MIN_HEIGHT));
      setTextWidth(0);
    };
  }, [setTextHeight, setTextWidth]);

  return textSizesOptions;
};
