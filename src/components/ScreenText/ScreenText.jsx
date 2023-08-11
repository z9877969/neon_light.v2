import { Fragment, useRef } from "react";

// import ModalError from "components/ModalError/ModalError";
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
  setText,
  isTextLight,
  innerScreenSize,
  textAlign,
  lettersFormat,
  font,
  color,
}) => {
  const containerRef = useRef(null);
  const textBarRef = useRef(null);
  const textRef = useRef(null);
  const heightMarkerRef = useRef(null);
  const widthMarkerRef = useRef(null);

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
    lettersFormat,
    font,
  });

  useTextSizes({
    textRef,
    widthMarker: textWidth,
    heightMarker: textHeight,
    setTextWidth,
    setTextHeight,
    setText,
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
            <span className={s.markerHeight}>{`${Number(
              textHeight
            ).toFixed()} см`}</span>
          </div>
          <div className={s.linesContainer}>
            <p
              ref={textRef}
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
              <span className={s.widthValue}>{`${Number(
                textWidth
              ).toFixed()}`}</span>
              <span className={s.widthUnit}>см</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScreenText;
