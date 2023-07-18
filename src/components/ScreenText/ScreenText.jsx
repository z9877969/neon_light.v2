import { Fragment, useEffect, useMemo, useRef, useState } from "react";

import clsx from "clsx";
import { nanoid } from "nanoid";
import s from "./ScreenText.module.scss";
import { useFontSize } from "../../hooks/useFontSize";
import { useMaxTextSize } from "../../hooks/useMaxTextSize";
import { useTextMarkersValue } from "../../hooks/useTextMarkersValue";

const ScreenText = ({
  text,
  textHeight,
  textWidth,
  setTextWidth,
  setTextHeight,
  isTextLight,
  innerScreenSize,
  textAlign,
  lettersFormat,
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
    text,
  });
  const maxNodeWidth = useMaxTextSize({ textRef, textWidth });

  const refs = {
    containerRef,
    textBarRef,
    textRef,
    heightMarkerRef,
    widthMarkerRef,
  };

  const fontSize = useFontSize({
    innerScreenSize,
    refs,
    text,
    textWidth,
    textHeight,
  });
  const parsedByEnterText = useMemo(() => {
    return text.split("\n").map((el) => ({ stringText: el, id: nanoid() }));
  }, [text]);

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
          <p
            ref={textRef}
            className={clsx(s.text, isTextLight && s.onLightText, s[textAlign])}
          >
            {parsedByEnterText.map((el, idx, arr) =>
              idx < arr.length - 1 ? (
                <Fragment key={el.id}>
                  {el.stringText}
                  <br />
                </Fragment>
              ) : (
                <Fragment key={el.id}>{el.stringText}</Fragment>
              )
            )}
          </p>
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
