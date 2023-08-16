import { useEffect, useMemo, useRef, useState } from "react";

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
  const [nodeSize, setNodeSize] = useState({ width: 0, height: 0 });
  const firstRenderRef = useRef(true);
  const heightMarkerRef = useRef(heightMarker);
  const widthMarkerRef = useRef(widthMarker);
  const nodeYSizeRef = useRef(0);
  const nodeXSizeRef = useRef(0);
  const curTextValue = useRef(text);

  useEffect(() => {
    if (sideSizeError) {
      const id = setTimeout(() => {
        setSideSizeError(null);
        clearTimeout(id);
      }, 3500);
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
    if (widthMarker === widthMarkerRef.current) return;
    if (widthMarker > MAX_WIDTH) {
      console.log("nodeSize :>> ", nodeSize);
      if (nodeSize.width >= nodeSize.height) {
        console.log("nodeSize.width >= nodeSize.height");

        setTextWidth(MAX_WIDTH);
        const newMarkerHeight = changeToFloat(
          (nodeSize.height / nodeSize.width) * MAX_WIDTH
        );
        setTextHeight(newMarkerHeight);
        widthMarkerRef.current = MAX_WIDTH;
        heightMarkerRef.current = newMarkerHeight;
      } else {
        setTextHeight(MAX_HEIGHT);
        const newMarkerWidth = changeToFloat(
          (nodeSize.width / nodeSize.height) * MAX_HEIGHT
        );
        setTextWidth(newMarkerWidth);
        heightMarkerRef.current = MAX_HEIGHT;
        widthMarkerRef.current = newMarkerWidth;
      }
      nodeXSizeRef.current = nodeSize.width;
      nodeYSizeRef.current = nodeSize.height;
      return;
    } else {
      // hSm = hPx/wPx*wSm
      const newHeightMarker = changeToFloat(
        (nodeSize.height / nodeSize.width) * widthMarker
      );
      setTextHeight(newHeightMarker);
      heightMarkerRef.current = newHeightMarker;
      nodeYSizeRef.current = nodeSize.height;
      nodeXSizeRef.current = nodeSize.width;
      widthMarkerRef.current = widthMarker;
    }
  }, [widthMarker, textRef, setTextHeight]);
  // ===
  useEffect(() => {
    if (firstRenderRef.current) return;
    console.log("heightMarker :>> ", heightMarker);
    if (heightMarker === heightMarkerRef.current) return;
    const { curMinHeight } = calcMinSizes({
      nodeXSize: nodeSize.width,
      nodeYSize: nodeSize.height,
      widthMarker,
      text,
    });
    if (heightMarker > MAX_HEIGHT) {
      if (nodeSize.height >= nodeSize.width) {
        setTextHeight(MAX_HEIGHT);
        const newMarkerWidth = changeToFloat(
          (nodeSize.width / nodeSize.height) * MAX_HEIGHT
        );
        setTextWidth(newMarkerWidth);
        heightMarkerRef.current = MAX_HEIGHT;
        widthMarkerRef.current = newMarkerWidth;
      } else {
        setTextWidth(MAX_WIDTH);
        const newMarkerHeight = changeToFloat(
          (nodeSize.height / nodeSize.width) * MAX_WIDTH
        );
        setTextHeight(newMarkerHeight);
        widthMarkerRef.current = MAX_WIDTH;
        heightMarkerRef.current = newMarkerHeight;
      }
      nodeXSizeRef.current = nodeSize.width;
      nodeYSizeRef.current = nodeSize.height;
    } else if (Math.round(heightMarker) < Math.round(curMinHeight)) {
      // calc min available width size
      const maxMarkerWidth = changeToFloat(
        (nodeSize.width / nodeSize.height) * curMinHeight
      );
      // determines valid sizes values
      const setingMarkerWidth =
        maxMarkerWidth > MAX_WIDTH ? MAX_WIDTH : maxMarkerWidth;
      const setingMarkerHeight =
        maxMarkerWidth > MAX_WIDTH ? heightMarker : curMinHeight;

      setTextWidth(setingMarkerWidth);
      widthMarkerRef.current = setingMarkerWidth;
      nodeXSizeRef.current = nodeSize.width;
      if (maxMarkerWidth <= MAX_WIDTH) {
        setTextHeight(setingMarkerHeight);
        heightMarkerRef.current = setingMarkerHeight;
        nodeYSizeRef.current = nodeSize.height;
      }
      // create error message
      if (maxMarkerWidth > MAX_WIDTH) {
        // setSideSizeError(errorMessages.litleRowSize);
        console.log(errorMessages.litleRowSize);
      }
    } else {
      // wSm = wPx/hPx*hSm
      const newWidthMarker = changeToFloat(
        (nodeSize.width / nodeSize.height) * heightMarker
      );
      console.log("else");
      // if (Math.round(heightMarker) < Math.round(curMinHeight)) return;
      setTextWidth(newWidthMarker);
      widthMarkerRef.current = newWidthMarker;
      nodeXSizeRef.current = nodeSize.width;
      heightMarkerRef.current = heightMarker;
      nodeYSizeRef.current = nodeSize.height;
    }
  }, [heightMarker, textRef, setTextWidth]);
  // === !!!
  // useEffect(() => {
  //   // widthMarker changes
  //   if (firstRenderRef.current) return;

  //   const { curMinWidth } = calcMinSizes({
  //     nodeXSize: nodeSize.width,
  //     nodeYSize: nodeSize.height,
  //     widthMarker,
  //     text,
  //   });

  //   if (widthMarker >= curMinWidth && widthMarker <= MAX_WIDTH) {
  //     return;
  //   }
  //   if (widthMarker === widthMarkerRef.current) return;
  //   // wSm = wPx/hPx*hSm
  //   // hSm = hPx/wPx*wSm

  //   if (widthMarker > MAX_WIDTH) {
  //     if (nodeSize.width >= nodeSize.height) {
  //       setTextWidth(MAX_WIDTH);
  //       const newMarkerHeight = changeToFloat(
  //         (nodeSize.height / nodeSize.width) * MAX_WIDTH
  //       );
  //       setTextHeight(newMarkerHeight);
  //       widthMarkerRef.current = MAX_WIDTH;
  //       heightMarkerRef.current = newMarkerHeight;
  //     } else {
  //       setTextHeight(MAX_HEIGHT);
  //       const newMarkerWidth = changeToFloat(
  //         (nodeSize.width / nodeSize.height) * MAX_HEIGHT
  //       );
  //       setTextWidth(newMarkerWidth);
  //       heightMarkerRef.current = MAX_HEIGHT;
  //       widthMarkerRef.current = newMarkerWidth;
  //     }
  //     nodeXSizeRef.current = nodeSize.width;
  //     nodeYSizeRef.current = nodeSize.height;
  //     return;
  //   }

  //   // if (Math.round(widthMarker) < curMinWidth) {
  //   //   // =
  //   //   const newMarkerHeight = changeToFloat(
  //   //     (nodeSize.height / nodeSize.width) * MAX_HEIGHT
  //   //   );
  //   //   const setingWidth =
  //   //     newMarkerHeight > MAX_HEIGHT ? widthMarker : curMinWidth;
  //   //   const setingHeight =
  //   //     newMarkerHeight > MAX_HEIGHT ? MAX_HEIGHT : newMarkerHeight;
  //   //   setTextWidth(setingWidth);
  //   //   setTextHeight(setingHeight);
  //   //   heightMarkerRef.current = setingHeight;
  //   //   nodeYSizeRef.current = nodeSize.height;
  //   //   widthMarkerRef.current = setingWidth;
  //   //   nodeXSizeRef.current = nodeSize.width;
  //   //   if (newMarkerHeight > MAX_HEIGHT) {
  //   //     setSideSizeError(errorMessages.litleRowSize);
  //   //     console.log(errorMessages.litleRowSize);
  //   //   }
  //   //   // =
  //   //   setTextWidth(curMinWidth);
  //   //   widthMarkerRef.current = curMinWidth;
  //   //   nodeXSizeRef.current = nodeSize.width;
  //   // }
  //   // eslint-disable-next-line
  // }, [widthMarker, textRef, setTextHeight, setTextWidth]);

  // useEffect(() => {
  //   // heightMarker changes
  //   if (firstRenderRef.current) return;

  //   const { curMinHeight } = calcMinSizes({
  //     nodeXSize: nodeSize.width,
  //     nodeYSize: nodeSize.height,
  //     widthMarker,
  //     text,
  //   });

  //   if (heightMarker >= curMinHeight && heightMarker <= MAX_HEIGHT) {
  //     return;
  //   }
  //   // wSm = wPx/hPx*hSm
  //   // hSm = hPx/wPx*wSm
  //   if (heightMarker === heightMarkerRef.current) return;

  //   // if (heightMarker > MAX_HEIGHT) {
  //   //   if (nodeSize.height >= nodeSize.width) {
  //   //     setTextHeight(MAX_HEIGHT);
  //   //     const newMarkerWidth = changeToFloat(
  //   //       (nodeSize.width / nodeSize.height) * MAX_HEIGHT
  //   //     );
  //   //     setTextWidth(newMarkerWidth);
  //   //     heightMarkerRef.current = MAX_HEIGHT;
  //   //     widthMarkerRef.current = newMarkerWidth;
  //   //   } else {
  //   //     setTextWidth(MAX_WIDTH);
  //   //     const newMarkerHeight = changeToFloat(
  //   //       (nodeSize.height / nodeSize.width) * MAX_WIDTH
  //   //     );
  //   //     setTextHeight(newMarkerHeight);
  //   //     widthMarkerRef.current = MAX_WIDTH;
  //   //     heightMarkerRef.current = newMarkerHeight;
  //   //   }
  //   //   nodeXSizeRef.current = nodeSize.width;
  //   //   nodeYSizeRef.current = nodeSize.height;
  //   // }
  //   if (Math.round(heightMarker) < curMinHeight) {
  //     // const newMarkerWidth = changeToFloat(
  //     //   (nodeSize.width / nodeSize.height) * curMinHeight
  //     // );
  //     // const setingWidth =
  //     //   newMarkerWidth > MAX_WIDTH ? MAX_WIDTH : newMarkerWidth;
  //     // const setingHeight =
  //     //   newMarkerWidth > MAX_WIDTH ? heightMarker : curMinHeight;
  //     // setTextWidth(setingWidth);
  //     // setTextHeight(setingHeight);
  //     // heightMarkerRef.current = setingHeight;
  //     // nodeYSizeRef.current = nodeSize.height;
  //     // widthMarkerRef.current = setingWidth;
  //     // nodeXSizeRef.current = nodeSize.width;
  //     // if (newMarkerWidth > MAX_WIDTH) {
  //     //   // setSideSizeError(errorMessages.litleRowSize);
  //     //   console.log(errorMessages.litleRowSize);
  //     // }
  //   }
  //   // eslint-disable-next-line
  // }, [heightMarker, textRef, setTextHeight, setTextWidth]);
  // ===
  useEffect(() => {
    if (firstRenderRef.current) return;

    const { width: nodeXSize, height: nodeYSize } = getNodeSizes(
      textRef.current
    );

    const { curMinHeight, curMinWidth } = calcMinSizes({
      nodeXSize,
      nodeYSize,
      widthMarker,
      text,
    });

    let newText = text;

    const yK = nodeYSize / nodeYSizeRef.current;
    const newHeightMarker = changeToFloat(heightMarker * yK);
    const newWidthMarker = changeToFloat(
      (nodeXSize / nodeYSize) * newHeightMarker
    );
    if (Math.round(newWidthMarker) > MAX_WIDTH) {
      setText((p) => (newText = replaceTextToNewRow(p)));
    } else {
      setTextWidth(newWidthMarker);
      setTextHeight(newHeightMarker);
      widthMarkerRef.current = newWidthMarker;
      heightMarkerRef.current = newHeightMarker;
      nodeXSizeRef.current = nodeXSize;
      nodeYSizeRef.current = nodeYSize;
    }
    curTextValue.current = newText;
    // eslint-disable-next-line
  }, [text]);

  useEffect(() => {
    // wSm = wPx/hPx*hSm
    // hSm = hPx/wPx*wSm
    if (firstRenderRef.current) return;

    const newWidthMarker = changeToFloat(
      (nodeSize.width / nodeSize.height) * heightMarker
    );
    setTextWidth(newWidthMarker);
    nodeXSizeRef.current = nodeSize.width;
    // widthMarkerRef.current = newWidthMarker;

    // eslint-disable-next-line
  }, [nodeSize.width, setTextHeight, setTextWidth]);

  useEffect(() => {
    // wSm = wPx/hPx*hSm
    // hSm = hPx/wPx*wSm
    if (firstRenderRef.current) return;
    const newHeightMarker = changeToFloat(
      (nodeSize.height / nodeSize.width) * widthMarker
    );
    setTextHeight(newHeightMarker);
    nodeYSizeRef.current = nodeSize.height;
    // heightMarkerRef.current = newHeightMarker;

    // eslint-disable-next-line
  }, [nodeSize.height, setTextHeight, setTextWidth]);

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
      nodeXSizeRef.current = textRef.current.offsetWidth;
      nodeYSizeRef.current = textRef.current.offsetHeight;
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
  // useEffect(() => {
  //   if (firstRenderRef.current) return; // +
  //   const { width: nodeXSize, height: nodeYSize } = getNodeSizes(
  //     textRef.current
  //   );

  //   if (nodeXSize > nodeYSize) {
  //     // wSm = wPx/hPx*hSm
  //     const widthMarker = changeToFloat((nodeXSize / nodeYSize) * heightMarker);
  //     if (widthMarker > MAX_WIDTH) {
  //       setTextWidth(MAX_WIDTH);
  //       widthMarkerRef.current = MAX_WIDTH;
  //     } else {
  //       setTextWidth(widthMarker);
  //       widthMarkerRef.current = widthMarker;
  //     }
  //     nodeXSizeRef.current = nodeXSize;
  //   }
  //   if (nodeYSize > nodeXSize) {
  //     // hSm = hPx/wPx*wSm
  //     const heightMarker = changeToFloat((nodeYSize / nodeXSize) * widthMarker);
  //     if (heightMarker > MAX_HEIGHT) {
  //       setTextHeight(MAX_HEIGHT);
  //       heightMarkerRef.current = MAX_WIDTH;
  //     } else {
  //       setTextHeight(heightMarker);
  //       heightMarkerRef.current = heightMarker;
  //     }
  //     nodeYSizeRef.current = nodeYSize;
  //   }
  //   // eslint-disable-next-line
  // }, [font]);

  useEffect(() => {
    firstRenderRef.current = false;
    return () => {
      setTextHeight((p) => (Number(p) > MIN_HEIGHT ? Number(p) : MIN_HEIGHT));
      setTextWidth(0);
    };
  }, [setTextHeight, setTextWidth]);

  const errorOptions = useMemo(
    () => ({
      sideSizeError,
      setSideSizeError,
    }),
    [sideSizeError]
  );

  return errorOptions;
};
