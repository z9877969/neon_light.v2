import { useEffect, useRef, useState } from "react";

import { getNodeSizes } from "../services/helpers";
import onResize from "resize-event";
import { textSizeConstants } from "constants";

const { MIN_HEIGHT, MAX_HEIGHT, MAX_WIDTH } = textSizeConstants;

const errorMessages = {
  litleRowSize:
    "Текст замалий.\nПотрібно зменшити к-сть рядків або змінити розмір тексту.",
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
  innerScreenSize,
}) => {
  const [sideSizeError, setSideSizeError] = useState(null);
  const firstRenderRef = useRef(true);
  const heightMarkerRef = useRef(heightMarker);
  const widthMarkerRef = useRef(widthMarker);
  const nodeYSizeRef = useRef(0);
  const nodeXSizeRef = useRef(0);

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
      nodeYSizeRef.current = nodeYSize;
      nodeXSizeRef.current = nodeXSize;
      widthMarkerRef.current = widthMarker;
    }
  }, [widthMarker, textRef, setTextHeight]);
  // ===
  useEffect(() => {
    if (firstRenderRef.current) return;
    if (heightMarker > MAX_HEIGHT) return;
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
      widthMarkerRef.current = newWidthMarker;
      nodeXSizeRef.current = nodeXSize;
      heightMarkerRef.current = heightMarker;
      nodeYSizeRef.current = nodeYSize;
    }
  }, [heightMarker, textRef, setTextWidth]);
  // ===
  useEffect(() => {
    if (firstRenderRef.current) return;
    const { width: nodeXSize, height: nodeYSize } = getNodeSizes(
      textRef.current
    );
    const { curMinHeight, curMinWidth } = calcMinSizes({
      nodeXSize,
      nodeYSize,
      heightMarker,
      text,
    });

    if (
      heightMarker >= curMinHeight &&
      heightMarker <= MAX_HEIGHT &&
      widthMarker >= curMinWidth &&
      widthMarker <= MAX_WIDTH
    ) {
      return;
    }
    // wSm = wPx/hPx*hSm
    // hSm = hPx/wPx*wSm
    if (
      // (heightMarker < curMinHeight && widthMarker > MAX_WIDTH) ||
      // (widthMarker < curMinWidth && heightMarker > MAX_HEIGHT) ||
      // (heightMarker < curMinHeight && widthMarker < curMinWidth)
      heightMarker < curMinHeight ||
      widthMarker < curMinWidth
    ) {
      setSideSizeError(errorMessages.litleRowSize);
      console.log(errorMessages.litleRowSize);
    }

    if (widthMarker > MAX_WIDTH) {
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
      nodeXSizeRef.current = nodeXSize;
      nodeYSizeRef.current = nodeYSize;
      return;
    }
    if (heightMarker > MAX_HEIGHT) {
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
      nodeXSizeRef.current = nodeXSize;
      nodeYSizeRef.current = nodeYSize;
      return;
    }
    if (widthMarker < curMinWidth) {
      setTextWidth(curMinWidth);
      widthMarkerRef.current = curMinWidth;
      nodeXSizeRef.current = nodeXSize;
    }
    if (heightMarker < curMinHeight) {
      setTextHeight(curMinHeight);
      heightMarkerRef.current = curMinHeight;
      nodeYSizeRef.current = nodeYSize;
    }
    // eslint-disable-next-line
  }, [widthMarker, heightMarker, textRef, setTextHeight, setTextWidth]);
  // ===
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
  // const [xSize, setXSize] = useState(0);
  // const [ySize, setYSize] = useState(0);
  const [nodeSize, setNodeSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (firstRenderRef.current) return;
    if (firstRenderRef.current) return;
    const { width: nodeXSize, height: nodeYSize } = getNodeSizes(
      textRef.current
    );
    const yK = nodeYSize / nodeYSizeRef.current;
    const newHeightMarker = heightMarker * yK;
    const newWidthMarker = changeToFloat(
      (nodeXSize / nodeYSize) * newHeightMarker
    );
    if (newWidthMarker > MAX_WIDTH) {
      setText((p) => replaceTextToNewRow(p));
    } else {
      setTextWidth(newWidthMarker);
      setTextHeight(newHeightMarker);
      widthMarkerRef.current = newWidthMarker;
      heightMarkerRef.current = newHeightMarker;
      nodeXSizeRef.current = nodeXSize;
      nodeYSizeRef.current = nodeYSize;
    }
    // eslint-disable-next-line
  }, [text]);

  useEffect(() => {
    // wSm = wPx/hPx*hSm
    // hSm = hPx/wPx*wSm
    if (firstRenderRef.current) return;
    if (nodeSize.width !== nodeXSizeRef.current) {
      const newWidthMarker = (nodeSize.width / nodeSize.height) * heightMarker;
      setTextWidth(newWidthMarker);
      nodeXSizeRef.current = nodeSize.width;
      widthMarkerRef.current = newWidthMarker;
    }
    if (nodeSize.height !== nodeYSizeRef.current) {
      const newHeightMarker = (nodeSize.height / nodeSize.width) * widthMarker;
      setTextHeight(newHeightMarker);
      nodeYSizeRef.current = nodeSize.height;
      heightMarkerRef.current = newHeightMarker;
    }
    // eslint-disable-next-line
  }, [nodeSize.width, nodeSize.height, setTextHeight, setTextWidth]);

  const nodeSizeWidthRef = useRef(0);
  const nodeSizeHeightRef = useRef(0);

  useEffect(() => {
    const observer = onResize(textRef.current, () => {
      const { width, height } = innerScreenSize;
      setNodeSize((p) =>
        textRef.current.offsetWidth > width ||
        textRef.current.offsetHeight > height
          ? p
          : {
              width: textRef.current.offsetWidth,
              height: textRef.current.offsetHeight,
            }
      );
      nodeSizeWidthRef.current = textRef.current.offsetWidth;
      nodeSizeHeightRef.current = textRef.current.offsetHeight;
    });
    return () => {
      observer.disconnect();
    };
  }, [textRef, innerScreenSize]);
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
