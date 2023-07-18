import { useEffect, useRef, useState } from "react";

const DISPLAY_MAX_SIZE = 200;

export const useMaxTextSize = ({ textRef, textWidth }) => {
  const [maxNodeWidth, setMaxNodeWidth] = useState(0);

  const prevNodeWidthRef = useRef(0);

  useEffect(() => {
    const widthMarker = Number(textWidth);
    if (
      widthMarker <= DISPLAY_MAX_SIZE &&
      widthMarker !== prevNodeWidthRef.current
    ) {
      prevNodeWidthRef.current = widthMarker;
    }
    if (widthMarker > DISPLAY_MAX_SIZE) {
      setMaxNodeWidth(prevNodeWidthRef.current);
    }
  }, [textWidth, textRef, prevNodeWidthRef]);

  return maxNodeWidth;
};
