import { getNodeSizes, getStylePropertyValue } from "../../services/helpers";
import { useEffect, useRef, useState } from "react";

import clsx from "clsx";
import s from "./ScreenText.module.scss";
import { useFontSize } from "../../hooks/useFontSize";
import { useTextMarkersValue } from "../../hooks/useTextMarkersValue";

const ScreenText = ({
  text,
  textHeight,
  textWidth,
  setTextWidth,
  setTextHeight,
  isTextLight,
  innerScreenSize,
}) => {
  const containerRef = useRef(null);
  const textBarRef = useRef(null);

  const heightMarkerRef = useRef(null);
  const widthMarkerRef = useRef(null);
  const textRef = useTextMarkersValue({
    widthMarker: textWidth,
    heightMarker: textHeight,
    setTextWidth,
    setTextHeight,
    text
  });

  const refs = {
    containerRef,
    textBarRef,
    textRef,
    heightMarkerRef,
    widthMarkerRef,
  };

  const fontSize = useFontSize(innerScreenSize, refs, text);

  return (
    <div
      ref={containerRef}
      className={clsx(s.container, s[`fontSize-${fontSize}`])}
    >
      <div ref={textBarRef} className={s.textBar}>
        <div ref={heightMarkerRef} className={s.markerHeightWrapper}>
          <span className={s.markerHeight}>{`${textHeight} см`}</span>
        </div>
        <div className={s.linesContainer}>
          <span
            ref={textRef}
            className={clsx(s.text, isTextLight && s.onLightText)}
          >
            {text}
          </span>
        </div>
        <div ref={widthMarkerRef} className={s.markerWidthWrapper}>
          <p className={s.markerWidth}>
            <span className={s.widthValue}>{`${textWidth}`}</span>
            <span className={s.widthUnit}>см</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScreenText;
