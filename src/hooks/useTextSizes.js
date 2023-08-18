import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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

export const useTextSizes = ({
  widthMarker,
  heightMarker,
  // setSideWidth,
  // setSideHeight,
  setSides,
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

  const setSideWidth = useCallback(
    (width) => {
      setSides((p) => ({ ...p, width }));
    },
    [setSides]
  );
  const setSideHeight = useCallback(
    (height) => {
      setSides((p) => ({ ...p, height }));
    },
    [setSides]
  );
  // w = pxW/pxH*h
  const calcWidthByNodeSizes = useCallback(
    (height) => {
      return changeToFloat((nodeSize.width / nodeSize.height) * height);
    },
    [nodeSize]
  );
  // h = pxH/pxW*w
  const calcHeightByNodeSizes = useCallback(
    (width) => {
      return changeToFloat((nodeSize.height / nodeSize.width) * width);
    },
    [nodeSize]
  );

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
    setSideWidth(widthMarker);
    widthMarkerRef.current = widthMarker;
    heightMarkerRef.current = heightMarker;
    nodeYSizeRef.current = nodeYSize;
    nodeXSizeRef.current = nodeXSize;
  }, [heightMarker, textRef, setSideWidth, setSideHeight]);
  // AFTER FIRST RENDER -END
  // ===
  useEffect(() => {
    if (firstRenderRef.current) return;
    if (widthMarker === widthMarkerRef.current) return;
    if (widthMarker <= MAX_WIDTH) {
      if (widthMarker < 1) {
        setSides((p) => ({ ...p, width: calcWidthByNodeSizes(p.height) }));
      } else {
        const newHeightMarker = calcHeightByNodeSizes(widthMarker);
        const setingHeight =
          newHeightMarker > MAX_HEIGHT ? MAX_HEIGHT : newHeightMarker;
        setSides((p) => ({ ...p, height: setingHeight }));
        heightMarkerRef.current = newHeightMarker;
      }
    } else {
      if (nodeSize.width >= nodeSize.height) {
        const newMarkerHeight = calcHeightByNodeSizes(MAX_WIDTH);
        setSides({ width: MAX_WIDTH, height: newMarkerHeight });
        heightMarkerRef.current = newMarkerHeight;
        widthMarkerRef.current = MAX_WIDTH;
      } else {
        const newMarkerWidth = calcWidthByNodeSizes(MAX_HEIGHT);
        setSides({ width: newMarkerWidth, height: MAX_HEIGHT });
        heightMarkerRef.current = MAX_HEIGHT;
        widthMarkerRef.current = newMarkerWidth;
      }
    }
  }, [widthMarker, textRef, setSides]);
  // ===
  useEffect(() => {
    if (firstRenderRef.current) return;
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
      const width = calcWidthByNodeSizes(heightMarker);
      newWidthMarker = width > MAX_WIDTH ? MAX_WIDTH : width;
      setSides((p) => ({
        ...p,
        width: newWidthMarker,
      }));
    } else {
      newHeightMarker = MAX_HEIGHT;
      newWidthMarker = calcWidthByNodeSizes(newHeightMarker);
      setSides({ width: newWidthMarker, height: newHeightMarker });
    }
    widthMarkerRef.current = newWidthMarker;
    heightMarkerRef.current = newHeightMarker;
    if (Math.round(newHeightMarker) < Math.round(curMinHeight)) {
      // setSideSizeError(errorMessages.litleRowSize);
      console.log(errorMessages.litleRowSize);
    }
  }, [heightMarker, textRef, setSideWidth]);
  // ===
  useEffect(() => {
    if (firstRenderRef.current) return;
    const savedText = getLS("text") ?? { prev: "", current: "" };
    setLS("text", { prev: savedText.current, current: text });

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
    //     setSideWidth(newWidthMarker);
    //     setSideHeight(newHeightMarker);
    //     widthMarkerRef.current = newWidthMarker;
    //     heightMarkerRef.current = newHeightMarker;
    //     nodeXSizeRef.current = nodeXSize;
    //     nodeYSizeRef.current = nodeYSize;
    //   }
    //   curTextValue.current = newText;
    //   // eslint-disable-next-line
  }, [text]);
  // ===
  useEffect(() => {
    if (firstRenderRef.current) return;
    const { width: nodeXSize, height: nodeYSize } = nodeSize;
    const prevSize = getLS("sizes") || nodeSize;
    const { width: prevNodeXSize, height: prevNodeYSize } = prevSize;
    if (
      (nodeYSize < prevNodeYSize && nodeXSize > prevNodeXSize) ||
      (nodeXSize < prevNodeXSize && nodeYSize > prevNodeYSize)
    ) {
      // k = newPx/oldPx = newSm/oldSm -> newSm = newPx/oldPx * oldSm -> k * oldSm
      console.log("change both sides");

      setSides((p) => {
        const sides = {
          width: (nodeXSize / prevNodeXSize) * p.width,
          height: (nodeYSize / prevNodeYSize) * p.height,
        };
        // if(sides.width > MAX_WIDTH){
        //   sides.width = p;
        //   setText()
        //   return sides
        // }
        return sides;
      });
    } else if (prevNodeXSize !== nodeXSize && prevNodeYSize === nodeYSize) {
      console.log("change X size");
      setSides((p) => {
        const width = calcWidthByNodeSizes(p.height);
        width > MAX_WIDTH &&
          setText((p) => {
            const savedText = getLS("text")?.prev ?? "";
            const parsedCurText = p.split("\n");
            const parsedSavedText = savedText.split("\n");
            const changedTextRowIdx = parsedCurText.findIndex(
              (el, idx) => el !== parsedSavedText[idx]
            );
            console.log("changedTextRowIdx :>> ", changedTextRowIdx);
            const changedSavedTextRow = parsedSavedText[changedTextRowIdx];
            console.log("changedSavedTextRow :>> ", changedSavedTextRow);
            const changedCurTextRow = parsedCurText[changedTextRowIdx];
            console.log("changedCurTextRow :>> ", changedCurTextRow);
            const replacingText = changedCurTextRow.slice(
              changedSavedTextRow.length - changedCurTextRow.length
            );
            parsedSavedText.splice(
              changedTextRowIdx,
              1,
              changedSavedTextRow,
              replacingText
            );
            return parsedSavedText.join("\n");
          });
        return {
          ...p,
          width: width > MAX_WIDTH ? p.width : width,
        };
      });
    } else if (prevNodeYSize !== nodeYSize && prevNodeXSize === nodeXSize) {
      console.log("change Y size");
      setSides((p) => ({
        ...p,
        height: calcHeightByNodeSizes(p.width),
      }));
    }
    setLS("sizes", nodeSize);
    // if (Math.round(newHeightMarker) < Math.round(curMinHeight)) {
    //   if (newHeightMarker < MAX_HEIGHT) {
    //     setSideHeight(MAX_HEIGHT);
    //   }
    //   // setSideSizeError(errorMessages.litleRowSize);
    //   console.log(errorMessages.litleRowSize);
    // }
    textValueRef.current = text;
    // eslint-disable-next-line
  }, [nodeSize, setSideHeight, setSideWidth]);
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
      setSideWidth(MAX_WIDTH);
      widthMarkerRef.current = MAX_WIDTH;
      nodeXSizeRef.current = nodeXSize;
    } else {
      setSideWidth(widthMarker);
      widthMarkerRef.current = widthMarker;
      nodeXSizeRef.current = nodeXSize;
    }

    // eslint-disable-next-line
  }, [lettersFormat]);
  // ===
  useEffect(() => {
    firstRenderRef.current = false;
    return () => {
      setSides((p) => ({
        width: 0,
        height: Number(p) > MIN_HEIGHT ? Number(p) : MIN_HEIGHT,
      }));
    };
  }, [setSides]);
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
// if (Math.round(newHeightMarker) < Math.round(curMinHeight)) {
//   // setSideSizeError(errorMessages.litleRowSize);
//   console.log(errorMessages.litleRowSize);
// }
