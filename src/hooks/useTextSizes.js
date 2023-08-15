import { useEffect, useRef, useState } from "react";

import { getNodeSizes } from "../services/helpers";
import { textSizeConstants } from "constants";

const { MIN_HEIGHT, MAX_HEIGHT, MAX_WIDTH } = textSizeConstants;

const errorMessages = {
  litleRowSize:
    "Висота рядка в даному даному тексті менша ніж можлива. Потрібно зменшити к-сть рядків.",
};

const changeToFloat = (num) => Math.floor(num * 100) / 100;
const replaceTextToNewRow = (text) => {
  const devidedText = text.split("");
  devidedText.splice(-1, 0, "\n");
  return devidedText.join("");
};
const calcMinSizes = ({
  nodeXSize,
  nodeYSize,
  // heightMarker,
  widthMarker,
  text,
}) => {
  const rows = text.split("\n").length;
  const curMinHeight = MIN_HEIGHT * rows;
  const curMinWidth = changeToFloat((nodeXSize / nodeYSize) * curMinHeight);
  const curHeight = changeToFloat((nodeYSize / nodeXSize) * widthMarker);
  const curRowHeight = Math.floor(curHeight / rows);
  return {
    rows,
    curMinHeight,
    curMinWidth,
    curRowHeight,
  };
};

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
  const [sideSizeError, setSideSizeError] = useState(null);
  const firstRenderRef = useRef(true);
  const heightMarkerRef = useRef(heightMarker);
  const widthMarkerRef = useRef(widthMarker);
  const nodeYSizeRef = useRef(0);
  const nodeXSizeRef = useRef(0);
  const textValueRef = useRef(text);

  useEffect(() => {
    if (sideSizeError) {
      const id = setTimeout(() => {
        setSideSizeError(null);
        clearTimeout(id);
      }, 1500);
    }
  }, [sideSizeError]);

  // ===
  // AFTER FIRST RENDER
  useEffect(() => {
    if (!firstRenderRef.current) return;
    const { width: nodeXSize, height: nodeYSize } = getNodeSizes(
      textRef.current
    );
    const widthMarker = changeToFloat((nodeXSize / nodeYSize) * heightMarker);
    if (nodeYSizeRef.current === nodeYSize) return;
    setTextWidth(widthMarker);
    widthMarkerRef.current = widthMarker;
    heightMarkerRef.current = heightMarker;
    nodeYSizeRef.current = nodeYSize;
    nodeXSizeRef.current = nodeXSize;
  }, [heightMarker, textRef, setTextWidth]);
  // AFTER FIRST RENDER -END
  // ===
  useEffect(() => {
    if (firstRenderRef.current) return;
    console.log("widthMarker :>> ", widthMarker);
    if (widthMarker > MAX_WIDTH) return;
    if (widthMarker !== widthMarkerRef.current) {
      // hSm = hPx/wPx*wSm
      const { width: nodeXSize, height: nodeYSize } = getNodeSizes(
        textRef.current
      );

      const newHeightMarker = changeToFloat(
        (nodeYSize / nodeXSize) * widthMarker
      );
      setTextHeight(newHeightMarker);
      heightMarkerRef.current = newHeightMarker;
      widthMarkerRef.current = widthMarker;
      nodeYSizeRef.current = nodeYSize;
      nodeXSizeRef.current = nodeXSize;
    }
  }, [widthMarker, textRef, setTextHeight]);
  // ===
  useEffect(() => {
    if (firstRenderRef.current) return;
    if (heightMarker > MAX_WIDTH) return;
    console.log("heightMarker :>> ", heightMarker);
    if (heightMarker !== heightMarkerRef.current) {
      // wSm = wPx/hPx*hSm
      const { width: nodeXSize, height: nodeYSize } = getNodeSizes(
        textRef.current
      );

      const newWidthMarker = changeToFloat(
        (nodeXSize / nodeYSize) * heightMarker
      );
      setTextWidth(newWidthMarker);
      heightMarkerRef.current = heightMarker;
      widthMarkerRef.current = newWidthMarker;
      nodeYSizeRef.current = nodeYSize;
      nodeXSizeRef.current = nodeXSize;
    }
  }, [heightMarker, textRef, setTextWidth]);
  // ===
  useEffect(() => {
    if (firstRenderRef.current) return;
    // wSm = wPx/hPx*hSm
    // hSm = hPx/wPx*wSm
    const { width: nodeXSize, height: nodeYSize } = getNodeSizes(
      textRef.current
    );
    const { curMinHeight, curMinWidth, curRowHeight } = calcMinSizes({
      nodeXSize,
      nodeYSize,
      heightMarker,
      text,
    });

    if (widthMarker < curMinWidth) {
      setTextWidth(curMinWidth);
      widthMarkerRef.current = curMinWidth;
    }
    if (heightMarker < curMinHeight) {
      setTextHeight(curMinHeight);
      heightMarkerRef.current = curMinHeight;
    }
    if (widthMarker >= MAX_WIDTH) {
      if (nodeXSize >= nodeYSize) {
        setTextWidth(MAX_WIDTH);
        const newMarkerHeight = changeToFloat(
          (nodeYSize / nodeXSize) * MAX_WIDTH
        );
        setTextHeight(newMarkerHeight);
        widthMarkerRef.current = MAX_WIDTH;
        heightMarkerRef.current = newMarkerHeight;
      } else {
        setTextHeight(MAX_HEIGHT);
        const newMarkerWidth = changeToFloat(
          (nodeXSize / nodeYSize) * MAX_HEIGHT
        );
        setTextWidth(newMarkerWidth);
        heightMarkerRef.current = MAX_HEIGHT;
        widthMarkerRef.current = newMarkerWidth;
      }
      return;
    }
    if (heightMarker >= MAX_HEIGHT) {
      if (nodeYSize >= nodeXSize) {
        setTextHeight(MAX_HEIGHT);
        const newMarkerWidth = changeToFloat(
          (nodeXSize / nodeYSize) * MAX_HEIGHT
        );
        setTextWidth(newMarkerWidth);
        heightMarkerRef.current = MAX_HEIGHT;
        widthMarkerRef.current = newMarkerWidth;
      } else {
        setTextWidth(MAX_WIDTH);
        const newMarkerHeight = changeToFloat(
          (nodeYSize / nodeXSize) * MAX_WIDTH
        );
        setTextHeight(newMarkerHeight);
        widthMarkerRef.current = MAX_WIDTH;
        heightMarkerRef.current = newMarkerHeight;
      }
      return;
    }
    if (heightMarker < MAX_HEIGHT && curRowHeight < MIN_HEIGHT) {
      setSideSizeError(errorMessages.litleRowSize);
      console.log(errorMessages.litleRowSize);
      return;
    }
  }, [widthMarker, heightMarker, textRef, setTextHeight, setTextWidth]);
  // ===
  useEffect(() => {
    if (firstRenderRef.current) return;
    const { width: nodeXSize, height: nodeYSize } = getNodeSizes(
      textRef.current
    );

    const { curRowHeight, curMinHeight } = calcMinSizes({
      nodeXSize,
      nodeYSize,
      heightMarker,
      widthMarker,
      text,
    });

    if (curRowHeight < MIN_HEIGHT) {
      setSideSizeError(errorMessages.litleRowSize);
      console.log(errorMessages.litleRowSize);
      nodeYSizeRef.current = nodeYSize;
      nodeXSizeRef.current = nodeXSize;
      widthMarkerRef.current = widthMarker;
      heightMarkerRef.current = heightMarker;
      return;
    }

    if (nodeXSizeRef !== nodeXSizeRef.current) {
      // wSm = wPx/hPx*hSm
      // yK = newPx/oldPx = newSm/oldSm -> newSm = newPx/oldPx * oldSm -> yK * oldSm
      const yK = nodeYSize / nodeYSizeRef.current;
      const newHeightMarker = heightMarker * yK;
      const newWidthMarker = changeToFloat(
        (nodeXSize / nodeYSize) * newHeightMarker
      );
      if (newWidthMarker > MAX_WIDTH) {
        if (text.length > textValueRef.current.length) {
          setText((p) => replaceTextToNewRow(p));
        } else {
          setTextWidth(MAX_WIDTH);
          const newHeightMarker = changeToFloat(
            (nodeYSize / nodeXSize) * MAX_WIDTH
          );
          setTextHeight(newHeightMarker);
          widthMarkerRef.current = newWidthMarker;
          nodeXSizeRef.current = nodeXSize;
          heightMarkerRef.current = newHeightMarker;
          nodeYSizeRef.current = nodeYSize;
          textValueRef.current = text;
        }
      } else {
        setTextWidth(newWidthMarker);
        widthMarkerRef.current = newWidthMarker;
        nodeXSizeRef.current = nodeXSize;
        // heightMarkerRef.current = newHeightMarker;
        nodeYSizeRef.current = nodeYSize;
      }
      textValueRef.current = text;
    }
    if (nodeYSize !== nodeYSizeRef.current) {
      // hSm = hPx/wPx*wSm
      const newHeightMarker = changeToFloat(
        (nodeYSize / nodeXSize) * widthMarker
      );
      setTextHeight(newHeightMarker);
      setTextWidth(widthMarker);
      heightMarkerRef.current = newHeightMarker;
      widthMarkerRef.current = widthMarker;

      nodeYSizeRef.current = nodeYSize;
      nodeXSizeRef.current = nodeXSize;
      textValueRef.current = text;
    }
    // eslint-disable-next-line
  }, [text]);
  // ===
  useEffect(() => {
    if (firstRenderRef.current) return;
    const { width: nodeXSize, height: nodeYSize } = getNodeSizes(
      textRef.current
    );
    // wSm = wPx/hPx*hSm
    const widthMarker = changeToFloat((nodeXSize / nodeYSize) * heightMarker);
    if (widthMarker > MAX_WIDTH) {
      setTextWidth(MAX_WIDTH);
      widthMarkerRef.current = MAX_WIDTH;
      nodeXSizeRef.current = nodeXSize;
    } else {
      setTextWidth(widthMarker);
      widthMarkerRef.current = widthMarker;
      nodeXSizeRef.current = nodeXSize;
    }

    // eslint-disable-next-line
  }, [lettersFormat]);
  // ===
  useEffect(() => {
    if (firstRenderRef.current) return; // +
    const { width: nodeXSize, height: nodeYSize } = getNodeSizes(
      textRef.current
    );

    if (nodeXSize > nodeYSize) {
      // wSm = wPx/hPx*hSm
      const widthMarker = changeToFloat((nodeXSize / nodeYSize) * heightMarker);
      if (widthMarker > MAX_WIDTH) {
        setTextWidth(MAX_WIDTH);
        widthMarkerRef.current = MAX_WIDTH;
      } else {
        setTextWidth(widthMarker);
        widthMarkerRef.current = widthMarker;
      }
      nodeXSizeRef.current = nodeXSize;
    }
    if (nodeYSize > nodeXSize) {
      // hSm = hPx/wPx*wSm
      const heightMarker = changeToFloat((nodeYSize / nodeXSize) * widthMarker);
      if (heightMarker > MAX_HEIGHT) {
        setTextHeight(MAX_HEIGHT);
        heightMarkerRef.current = MAX_WIDTH;
      } else {
        setTextHeight(heightMarker);
        heightMarkerRef.current = heightMarker;
      }
      nodeYSizeRef.current = nodeYSize;
    }
    // eslint-disable-next-line
  }, [font]);

  useEffect(() => {
    firstRenderRef.current = false;
    return () => {
      setTextHeight((p) => (Number(p) > MIN_HEIGHT ? Number(p) : MIN_HEIGHT));
      setTextWidth(0);
    };
  }, [setTextHeight, setTextWidth]);

  return sideSizeError;
};
