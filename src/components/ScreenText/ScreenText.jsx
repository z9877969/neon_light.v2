import { Fragment, useRef } from "react";

import ModalError from "components/ModalError/ModalError";
import clsx from "clsx";
import s from "./ScreenText.module.scss";
import { useDisplayingText } from "hooks/useDisplayingText";
import { useFontSize } from "../../hooks/useFontSize";
import { useTextSizes } from "../../hooks/useTextSizes";

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
  font,
  color,
}) => {
  const containerRef = useRef(null);
  const textBarRef = useRef(null);
  const heightMarkerRef = useRef(null);
  const widthMarkerRef = useRef(null);

  const textSizesOptions = useTextSizes({
    widthMarker: textWidth,
    heightMarker: textHeight,
    setTextWidth,
    setTextHeight,
    text,
    lettersFormat,
    font,
  });

  const refs = {
    containerRef,
    textBarRef,
    textRef: textSizesOptions.textRef,
    heightMarkerRef,
    widthMarkerRef,
  };

  const fontSize = useFontSize({
    innerScreenSize,
    refs,
    text,
    lettersFormat,
    font,
  });

  const displayingText = useDisplayingText(text, lettersFormat);

  return (
    <>
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
              ref={textSizesOptions.textRef}
              style={{ fontFamily: `${font}, sans-serif`, color }}
              className={clsx(
                s.text,
                isTextLight && s.onLightText,
                s[textAlign]
              )}
            >
              {displayingText.map((el, idx, arr) =>
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
      {textSizesOptions.withMaxSizeError && (
        <ModalError
          errorMessage={textSizesOptions.withMaxSizeError}
          setError={textSizesOptions.setWithMaxSizeError}
        />
      )}
    </>
  );
};

export default ScreenText;
