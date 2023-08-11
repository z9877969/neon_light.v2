import { useEffect, useRef } from "react";

import { getNodeSizes } from "../services/helpers";
import { textSizeConstants } from "constants";

const { MIN_HEIGHT, MAX_HEIGHT, MAX_WIDTH } = textSizeConstants;

const changeToFloat = (num) => Math.floor(num * 100) / 100;
const replaceTextToNewRow = (text) => {
  const devidedText = text.split("");
  devidedText.splice(-1, 0, "\n");
  return devidedText.join("");
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
  const firstRenderRef = useRef(true);
  const heightMarkerRef = useRef(heightMarker);
  const widthMarkerRef = useRef(widthMarker);
  const nodeYSizeRef = useRef(0);
  const nodeXSizeRef = useRef(0);

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
    if (widthMarker !== widthMarkerRef.current) {
      // hSm = hPx/wPx*wSm
      const { width: nodeXSize, height: nodeYSize } = getNodeSizes(
        textRef.current
      );
      const newWidthMarker = widthMarker <= MAX_WIDTH ? widthMarker : MAX_WIDTH;
      const newHeightMarker = changeToFloat(
        (nodeYSize / nodeXSize) * newWidthMarker
      );
      if (nodeXSizeRef.current === nodeXSize) return;
      setTextHeight(
        newHeightMarker >= MIN_HEIGHT ? newHeightMarker : MIN_HEIGHT
      );
      heightMarkerRef.current = newHeightMarker;
      widthMarkerRef.current = newWidthMarker;
      nodeYSizeRef.current = nodeYSize;
      nodeXSizeRef.current = nodeXSize;
    }
  }, [widthMarker, textRef, setTextHeight]);
  // ===
  useEffect(() => {
    if (firstRenderRef.current) return;
    if (heightMarker !== heightMarkerRef.current) {
      // wSm = wPx/hPx*hSm
      const { width: nodeXSize, height: nodeYSize } = getNodeSizes(
        textRef.current
      );
      const newHeightMarker =
        heightMarker <= MAX_HEIGHT ? heightMarker : MAX_HEIGHT;
      const newWidthMarker = changeToFloat(
        (nodeXSize / nodeYSize) * newHeightMarker
      );
      setTextWidth(newWidthMarker);
      heightMarkerRef.current = newHeightMarker;
      widthMarkerRef.current = newWidthMarker;
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
      // yK = newPx/oldPx = newSm/oldSm -> newSm = newPx/oldPx * oldSm -> yK * oldSm
      const yK = nodeYSize / nodeYSizeRef.current;
      const widthMarker = changeToFloat(
        (nodeXSize / nodeYSize) * heightMarker * yK
      );
      if (widthMarker > MAX_WIDTH) {
        setText((p) => replaceTextToNewRow(p));
        nodeXSizeRef.current = nodeXSize;
        nodeYSizeRef.current = nodeYSize;
      } else {
        setTextWidth(widthMarker);
        widthMarkerRef.current = widthMarker;
        nodeXSizeRef.current = nodeXSize;
      }
    }
    if (nodeYSize !== nodeYSizeRef.current) {
      // hSm = hPx/wPx*wSm
      const heightMarker = changeToFloat((nodeYSize / nodeXSize) * widthMarker);
      const newHeightMarker =
        heightMarker < MIN_HEIGHT
          ? MIN_HEIGHT
          : heightMarker > MAX_HEIGHT
          ? MAX_HEIGHT
          : heightMarker;
      setTextHeight(newHeightMarker);
      heightMarkerRef.current = newHeightMarker;
      nodeYSizeRef.current = nodeYSize;
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
};
