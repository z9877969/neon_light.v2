import { useEffect, useMemo, useRef, useState } from "react";

import { getNodeSizes } from "../services/helpers";
import onResize from "resize-event";
import { textSizeConstants } from "constants";

const { MIN_HEIGHT, MAX_HEIGHT, MAX_WIDTH } = textSizeConstants;

const errorMessages = {
  litleRowSize:
    "Текст замалий.\nПотрібно зменшити к-сть рядків або змінити розмір тексту.",
  litleRowSizeV2:
    "Не коректний флормат.\nВ даному випадку висота рядка менша ніж це можливо для виконання",
};

const getLS = (key) => JSON.parse(localStorage.getItem(key));
const setLS = (key, data) => localStorage.setItem(key, JSON.stringify(data));
const changeToFloat = (num) => Math.floor(num * 100) / 100;
const replaceTextToNewRow = (text) => {
  const devidedText = text.split("");
  devidedText.splice(-1, 0, "\n");
  return devidedText.join("");
};
const calcMinSizes = ({ nodeXSize, nodeYSize, widthMarker, text }) => {
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

let render = 0;
// w = pxW/pxH*h
// h = pxH/pxW*w

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
  const textValueRef = useRef(text);

  render += 1;
  console.log("render :>> ", render);

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
  }, [heightMarker, textRef, setTextWidth, setTextHeight]);
  // AFTER FIRST RENDER -END
  // ===
  useEffect(() => {
    if (firstRenderRef.current) return;
    if (widthMarker === widthMarkerRef.current) return;
    const { curMinHeight } = calcMinSizes({
      nodeXSize: nodeSize.width,
      nodeYSize: nodeSize.height,
      widthMarker,
      text,
    });
    if (widthMarker <= MAX_WIDTH) {
      // hSm = hPx/wPx*wSm
      const newHeightMarker = changeToFloat(
        (nodeSize.height / nodeSize.width) * widthMarker
      );
      const setingHeight =
        newHeightMarker > MAX_HEIGHT
          ? MAX_HEIGHT
          : // : Math.round(newHeightMarker) < Math.round(curMinHeight)
            // ? curMinHeight
            newHeightMarker;
      setTextHeight(setingHeight);
      heightMarkerRef.current = newHeightMarker;
      // if (Math.round(newHeightMarker) < Math.round(curMinHeight)) {
      //   // setSideSizeError(errorMessages.litleRowSize);
      //   console.log(errorMessages.litleRowSize);
      // }
      if (widthMarker < 1) {
        const fixedWidthMarker = changeToFloat(
          (nodeSize.width / nodeSize.height) * setingHeight
        );
        setTextWidth(fixedWidthMarker);
        widthMarkerRef.current = fixedWidthMarker;
      }
    } else {
      if (nodeSize.width >= nodeSize.height) {
        setTextWidth(MAX_WIDTH);
        const newMarkerHeight = changeToFloat(
          (nodeSize.height / nodeSize.width) * MAX_WIDTH
        );
        setTextHeight(newMarkerHeight);
        heightMarkerRef.current = newMarkerHeight;
        widthMarkerRef.current = MAX_WIDTH;
      } else {
        setTextHeight(MAX_HEIGHT);
        const newMarkerWidth = changeToFloat(
          (nodeSize.width / nodeSize.height) * MAX_HEIGHT
        );
        setTextWidth(newMarkerWidth);
        heightMarkerRef.current = MAX_HEIGHT;
        widthMarkerRef.current = newMarkerWidth;
      }
    }
  }, [widthMarker, textRef, setTextHeight, setTextWidth]);
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
    let newWidthMarker = 0;
    let newHeightMarker = heightMarker;
    if (heightMarker <= MAX_HEIGHT) {
      newWidthMarker = changeToFloat(
        (nodeSize.width / nodeSize.height) * heightMarker
      );
      setTextWidth(newWidthMarker > MAX_WIDTH ? MAX_WIDTH : newWidthMarker);
      widthMarkerRef.current = newWidthMarker;
    } else {
      newWidthMarker = changeToFloat(
        (nodeSize.width / nodeSize.height) * MAX_HEIGHT
      );
      newHeightMarker = MAX_HEIGHT;
      setTextHeight(newHeightMarker);
      setTextWidth(newWidthMarker);
      widthMarkerRef.current = newWidthMarker;
      heightMarkerRef.current = MAX_HEIGHT;
    }
    if (Math.round(newHeightMarker) < Math.round(curMinHeight)) {
      // setSideSizeError(errorMessages.litleRowSize);
      console.log(errorMessages.litleRowSize);
    }
  }, [heightMarker, textRef, setTextWidth]);
  // ===
  // useEffect(() => {
  //   if (firstRenderRef.current) return;

  //   const { width: nodeXSize, height: nodeYSize } = getNodeSizes(
  //     textRef.current
  //   );

  //   const { curMinHeight, curMinWidth } = calcMinSizes({
  //     nodeXSize,
  //     nodeYSize,
  //     widthMarker,
  //     text,
  //   });

  //   let newText = text;

  //   const yK = nodeYSize / nodeYSizeRef.current;
  //   const newHeightMarker = changeToFloat(heightMarker * yK);
  //   const newWidthMarker = changeToFloat(
  //     (nodeXSize / nodeYSize) * newHeightMarker
  //   );
  //   if (Math.round(newWidthMarker) > MAX_WIDTH) {
  //     setText((p) => (newText = replaceTextToNewRow(p)));
  //   } else {
  //     setTextWidth(newWidthMarker);
  //     setTextHeight(newHeightMarker);
  //     widthMarkerRef.current = newWidthMarker;
  //     heightMarkerRef.current = newHeightMarker;
  //     nodeXSizeRef.current = nodeXSize;
  //     nodeYSizeRef.current = nodeYSize;
  //   }
  //   curTextValue.current = newText;
  //   // eslint-disable-next-line
  // }, [text]);
  // ===
  useEffect(() => {
    if (firstRenderRef.current) return;
    const prevWidth = widthMarkerRef.current;
    const prevHeight = heightMarkerRef.current;
    const { width: nodeXSize, height: nodeYSize } = nodeSize;
    const prevSize = getLS("sizes") || nodeSize;
    const { width: prevNodeXSize, height: prevNodeYSize } = prevSize;
    const { curMinHeight } = calcMinSizes({
      nodeXSize: nodeSize.width,
      nodeYSize: nodeSize.height,
      widthMarker,
      text,
    });
    let newWidthMarker = prevWidth;
    let newHeightMarker = prevHeight;
    console.log("text === textValueRef.current");
    if (prevNodeXSize !== nodeXSize && prevNodeYSize !== nodeYSize) {
      return;
    } else if (prevNodeXSize !== nodeXSize) {
      newWidthMarker = changeToFloat((nodeXSize / nodeYSize) * prevHeight);
    } else if (prevNodeYSize !== nodeYSize) {
      newHeightMarker = changeToFloat((nodeYSize / nodeXSize) * prevWidth);
    }
    setTextHeight(newHeightMarker);
    setTextWidth(newWidthMarker);
    setLS("sizes", nodeSize);
    // heightMarkerRef.current = newHeightMarker;
    // widthMarkerRef.current = newWidthMarker;

    if (Math.round(newHeightMarker) < Math.round(curMinHeight)) {
      if (newHeightMarker < MAX_HEIGHT) {
        setTextHeight(MAX_HEIGHT);
      }
      // setSideSizeError(errorMessages.litleRowSize);
      console.log(errorMessages.litleRowSize);
    }
    textValueRef.current = text;
    // eslint-disable-next-line
  }, [nodeSize, setTextHeight, setTextWidth]);
  // ===

  // general base effects
  // ===
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
  useEffect(() => {
    firstRenderRef.current = false;
    return () => {
      setTextHeight((p) => (Number(p) > MIN_HEIGHT ? Number(p) : MIN_HEIGHT));
      setTextWidth(0);
    };
  }, [setTextHeight, setTextWidth]);
  // ===

  // data that hook returns
  const errorOptions = useMemo(
    () => ({
      sideSizeError,
      setSideSizeError,
    }),
    [sideSizeError]
  );

  return errorOptions;
};
