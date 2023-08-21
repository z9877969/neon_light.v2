import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { getNodeSizes } from "../services/helpers";
import onResize from "resize-event";
import { textSizeConstants } from "constants";

const { MIN_HEIGHT, MAX_HEIGHT, MAX_WIDTH } = textSizeConstants;

const errorMessages = {
  litleRowSize:
    "Текст замалий.\nПотрібно зменшити к-сть рядків або змінити розмір тексту.",
  litleRowSizeV2:
    "Не коректний формат.\nВ даному випадку висота рядка менша ніж це можливо для виконання",
  litleRowSizeV3:
    "Не коректне співвідношення розмірів сторін.\nДля даного варіанту тексту фактична висота буде менша ніж можлива до виготовлення. Потрібно зменшити текст в рядку або кількість самих рядків",
};

const getLS = (key) => JSON.parse(localStorage.getItem(key));
const setLS = (key, data) => localStorage.setItem(key, JSON.stringify(data));
const changeToFloat = (num) => Math.floor(num * 100) / 100;
const getMovedTextToNewRow = (curText) => {
  const savedText = getLS("text")?.prev ?? "";
  if (curText.length < savedText.length) return curText;
  const parsedCurText = curText.split("\n");
  const parsedSavedText = savedText.split("\n");
  const changedTextRowIdx = parsedCurText.findIndex(
    (el, idx) => el !== parsedSavedText[idx]
  );
  const changedSavedTextRow = parsedSavedText[changedTextRowIdx];
  const changedCurTextRow = parsedCurText[changedTextRowIdx];
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
};
const calcMinSizes = ({ nodeXSize, nodeYSize, widthMarker, text }) => {
  const rows = text.split("\n").length;
  const curMinHeight = MIN_HEIGHT * rows;
  const curMinWidth = changeToFloat((nodeXSize / nodeYSize) * curMinHeight);
  const curHeight = changeToFloat((nodeYSize / nodeXSize) * widthMarker);
  const curRowHeight = Math.round(Math.floor(curHeight / rows));
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
  setSides,
  text,
  setText,
  textRef,
  maxTextNodeSize,
}) => {
  const [sideSizeError, setSideSizeError] = useState(null);
  const [nodeSize, setNodeSize] = useState({ width: 0, height: 0 });
  const firstRenderRef = useRef(true);
  const heightMarkerRef = useRef(heightMarker);
  const widthMarkerRef = useRef(widthMarker);
  const isNodeSizeChangeRef = useRef(false);

  // w = pxW/pxH*h - dependens for changing width by height
  const calcWidthByNodeSizes = useCallback(
    (height) => {
      return changeToFloat((nodeSize.width / nodeSize.height) * height);
    },
    [nodeSize]
  );
  // h = pxH/pxW*w - dependens for changing height by width
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
    setSides((p) => ({ ...p, width: widthMarker }));
    widthMarkerRef.current = widthMarker;
    heightMarkerRef.current = heightMarker;
  }, [heightMarker, textRef, setSides]);
  // AFTER FIRST RENDER -END
  // *
  // === CHANGES WIDTH | HEIGHT CALC BY WIDTH
  useEffect(() => {
    if (firstRenderRef.current) return;
    setSides((p) => {
      if (p.width === widthMarkerRef.current) return p;
      let width = p.width;
      let height = 0;
      if (width <= MAX_WIDTH) {
        if (width <= 1) {
          height = p.height;
          width = calcWidthByNodeSizes(height);
        } else {
          const heightCalc = calcHeightByNodeSizes(width);

          if (nodeSize.width >= nodeSize.height) {
            height = heightCalc;
            width = calcWidthByNodeSizes(height);
          } else {
            height = heightCalc < MAX_HEIGHT ? heightCalc : MAX_HEIGHT;
            width = calcWidthByNodeSizes(height);
          }
        }
      } else {
        if (nodeSize.width >= nodeSize.height) {
          width = MAX_WIDTH;
          height = calcHeightByNodeSizes(width);
        } else {
          height = MAX_HEIGHT;
          width = calcWidthByNodeSizes(height);
        }
      }

      const { curMinHeight } = calcMinSizes({
        nodeXSize: nodeSize.width,
        nodeYSize: nodeSize.height,
        widthMarker: width,
        text,
      });

      const roundedHeight = Math.round(height);

      if (roundedHeight < curMinHeight) {
        if (curMinHeight <= MAX_HEIGHT) {
          height = curMinHeight;
          width = calcWidthByNodeSizes(height);
        } else if (curMinHeight > MAX_HEIGHT && roundedHeight < MAX_HEIGHT) {
          height = MAX_HEIGHT;
          width = calcWidthByNodeSizes(height);
        }

        if (width > MAX_WIDTH) {
          width = MAX_WIDTH;
          height = calcHeightByNodeSizes(width);
        }
        if (height < curMinHeight) {
          setSideSizeError(errorMessages.litleRowSize);
          // console.log(errorMessages.litleRowSizeV3);
        }
      }
      heightMarkerRef.current = height;
      widthMarkerRef.current = width;
      return {
        width,
        height,
      };
    });
    // eslint-disable-next-line
  }, [widthMarker, textRef, setSides]);
  // === CHANGES WIDTH | HEIGHT CALC BY WIDTH -END
  // *
  // === CHANGES HEIGHT | WIDTH CALC BY HEIGHT
  useEffect(() => {
    if (firstRenderRef.current) return;
    setSides((p) => {
      if (p.height === heightMarkerRef.current) return p;
      let height = p.height;
      let width = 0;
      if (height <= MAX_HEIGHT) {
        width = calcWidthByNodeSizes(height);
        if (nodeSize.height >= nodeSize.width) {
          width = calcWidthByNodeSizes(height);
        } else {
          const widthCalc = calcWidthByNodeSizes(height);
          if (widthCalc <= MAX_WIDTH) {
            width = widthCalc;
          } else {
            width = MAX_WIDTH;
            height = calcHeightByNodeSizes(width);
          }
        }
      } else {
        if (nodeSize.height >= nodeSize.width) {
          height = MAX_HEIGHT;
          width = calcWidthByNodeSizes(height);
        } else {
          width = MAX_WIDTH;
          height = calcHeightByNodeSizes(width);
        }
      }
      const { curMinHeight } = calcMinSizes({
        nodeXSize: nodeSize.width,
        nodeYSize: nodeSize.height,
        widthMarker: width,
        text,
      });
      const roundedHeight = Math.round(height);
      if (Math.round(height) < curMinHeight) {
        if (curMinHeight <= MAX_HEIGHT) {
          height = curMinHeight;
          width = calcWidthByNodeSizes(height);
        } else if (curMinHeight > MAX_HEIGHT && roundedHeight < MAX_HEIGHT) {
          height = MAX_HEIGHT;
          width = calcWidthByNodeSizes(height);
        }

        if (width > MAX_WIDTH) {
          width = MAX_WIDTH;
          height = calcHeightByNodeSizes(width);
        }

        if (height < curMinHeight) {
          setSideSizeError(errorMessages.litleRowSize);
          // console.log(errorMessages.litleRowSizeV3);
        }
      }
      widthMarkerRef.current = width;
      heightMarkerRef.current = height;
      return { width, height };
    });
    // eslint-disable-next-line
  }, [heightMarker, textRef, setSides]);
  // === CHANGES HEIGHT | WIDTH CALC BY HEIGHT -END
  // *
  // === CHANGES SIDES BY NODE_SIZES
  useEffect(() => {
    if (firstRenderRef.current) return;
    const { width: nodeXSize, height: nodeYSize } = nodeSize;
    const prevSize = getLS("sizes") || nodeSize;
    const { width: prevNodeXSize, height: prevNodeYSize } = prevSize;
    const isReplaceTextWithAddingRow =
      prevNodeYSize && nodeYSize > prevNodeYSize && nodeXSize !== prevNodeXSize;
    const isReplaceTextWithRemovingRow =
      prevNodeYSize && nodeYSize < prevNodeYSize && nodeXSize !== prevNodeXSize;
    if (isReplaceTextWithRemovingRow || isReplaceTextWithAddingRow) {
      if (isNodeSizeChangeRef.current) {
        isNodeSizeChangeRef.current = false;
      } else {
        setSides((p) => {
          let width = 0;
          let height = 0;

          const nodeYSizeDiff = Math.abs(nodeYSize - prevNodeYSize);
          const heightDiff = (p.height * nodeYSizeDiff) / prevNodeYSize;

          if (p.width > MAX_WIDTH) {
            width = MAX_WIDTH;
            height = calcHeightByNodeSizes(width);
          } else if (isReplaceTextWithAddingRow) {
            height = p.height + heightDiff;
            width = calcWidthByNodeSizes(height);
          } else if (isReplaceTextWithRemovingRow) {
            height = p.height - heightDiff;
            width = calcWidthByNodeSizes(height);
          }
          const sides = {
            width,
            height,
          };
          //= ADD VALIDATION FOR MOVING TEXT ROW
          /* 
            TO ADD VALIDATION FOR MOVING TEXT ROW, 
            for case when adds some amount symbols 
            but only some ones will be moved to next row, 
            as result that row size more then MAX
          */
          //= ADD VALIDATION FOR MOVING TEXT ROW -END
          return sides;
        });
      }
    } else if (prevNodeXSize !== nodeXSize && prevNodeYSize === nodeYSize) {
      isNodeSizeChangeRef.current = true;

      setSides((p) => {
        const savedText = getLS("text");
        let isFontSetsChange = false;
        const width = calcWidthByNodeSizes(p.height);
        width > MAX_WIDTH &&
          setText((p) => {
            if (savedText.prev === p) {
              isFontSetsChange = true;
              return p;
            } else {
              return getMovedTextToNewRow(p);
            }
          });
        return {
          ...p,
          width: isFontSetsChange ? width : width > MAX_WIDTH ? p.width : width,
        };
      });
    } else if (prevNodeYSize !== nodeYSize && prevNodeXSize === nodeXSize) {
      isNodeSizeChangeRef.current = true;
      setSides((p) => {
        return {
          ...p,
          height: calcHeightByNodeSizes(p.width),
        };
      });
    } else if (prevNodeXSize === 0 && prevNodeYSize === 0) {
      if (isNodeSizeChangeRef.current) {
        isNodeSizeChangeRef.current = false;
      }
      // calc sides for text opening at first time
      const { rows } = calcMinSizes({
        nodeXSize,
        nodeYSize,
        widthMarker,
        text,
      });
      setSides((p) => {
        const height = p.height * rows;
        const width = calcWidthByNodeSizes(height);
        return {
          height,
          width,
        };
      });
    }
    // eslint-disable-next-line
  }, [nodeSize, setSides]);
  // === CHANGES SIDES BY NODE_SIZES -END

  // === SAVES PREV_TEXT TO LS
  useEffect(() => {
    if (firstRenderRef.current) return;
    const savedText = getLS("text");
    setLS(
      "text",
      savedText
        ? { prev: savedText.current, current: text }
        : { prev: text, current: text }
    );
    isNodeSizeChangeRef.current = false;
  }, [text]);
  // === SAVES PREV_TEXT TO LS -END

  // === CLEAR LS
  useEffect(() => {
    return () => {
      setLS("text", null);
      setLS("sizes", null);
    };
  }, []);
  // === CLEAR LS -END

  // general base effects
  // ===
  useEffect(() => {
    const observer = onResize(textRef.current, () => {
      const sides = {
        width: textRef.current.offsetWidth,
        height: textRef.current.offsetHeight,
      };
      setNodeSize((p) => {
        if (
          sides.width > maxTextNodeSize.width ||
          sides.height > maxTextNodeSize.height
        ) {
          return p;
        } else {
          const sides = {
            width: textRef.current.offsetWidth,
            height: textRef.current.offsetHeight,
          };
          setLS("sizes", p);
          return sides;
        }
      });
    });
    return () => {
      observer.disconnect();
    };
  }, [textRef, maxTextNodeSize]);
  // ===
  useEffect(() => {
    firstRenderRef.current = false;
    return () => {
      const { rows } = calcMinSizes({
        nodeXSize: nodeSize.width,
        nodeYSize: nodeSize.height,
        widthMarker,
        text,
      });
      setSides((p) => {
        return {
          width: 0,
          height: p.height / rows > MIN_HEIGHT ? p.height / rows : MIN_HEIGHT,
        };
      });
    };
    // eslint-disable-next-line
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
