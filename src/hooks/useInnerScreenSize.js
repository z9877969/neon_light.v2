import { useEffect, useState } from "react";

import { getStylePropertyValue } from "../services/helpers/getStylePropertyValue";
import { useMedia } from "./useMedia";

const getElPaddingSizes = (screenNodeEl) => {
  const { padding: paddingValue } = getStylePropertyValue(
    screenNodeEl,
    "padding"
  );
  const paddingsSet = paddingValue
    .split(" ")
    .map((el) => Number(el.split("px")[0]));

  const paddingSizes =
    paddingsSet.length === 1
      ? {
          top: paddingsSet[0],
          right: paddingsSet[0],
          bottom: paddingsSet[0],
          left: paddingsSet[0],
        }
      : paddingsSet.length === 2
      ? {
          top: paddingsSet[0],
          right: paddingsSet[1],
          bottom: paddingsSet[0],
          left: paddingsSet[1],
        }
      : paddingsSet.length === 3
      ? {
          top: paddingsSet[0],
          right: paddingsSet[1],
          bottom: paddingsSet[2],
          left: paddingsSet[1],
        }
      : {
          top: paddingsSet[0],
          right: paddingsSet[1],
          bottom: paddingsSet[2],
          left: paddingsSet[1],
        };
  return paddingSizes;
};

export const useInnerScreenSize = (screenRef, topPanelRef) => {
  const viewChanging = useMedia();
  const [innerScreenSize, setInnerScreenSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const { top, right, bottom, left } = getElPaddingSizes(screenRef.current);
    const containerInnerWidth = screenRef.current.clientWidth - (right + left);

    const containerInnerHeight =
      screenRef.current.clientHeight -
      (top + bottom + topPanelRef.current.clientHeight);
    const curScreenInnerSize = {
      width: containerInnerWidth,
      height: containerInnerHeight,
    };

    setInnerScreenSize(curScreenInnerSize);
  }, [viewChanging, screenRef, topPanelRef]);

  return innerScreenSize;
};
