import { alignmentOptions } from "constants";
import clsx from "clsx";
import s from "./ScreenText.module.scss";
import { useDisplayingText } from "hooks/useDisplayingText";
import { useFontSize } from "../../hooks/useFontSize";
import { useMaxTextNodeSize } from "hooks/useMaxTextNodeSize";
import { useRef } from "react";
import { useTextSizes } from "../../hooks/useTextSizes";

const ScreenText = ({
  text,
  sides,
  setSides,
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
  const textWrapperRef = useRef(null);
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

  const maxTextNodeSize = useMaxTextNodeSize(
    innerScreenSize,
    textWrapperRef.current,
    widthMarkerRef.current,
    heightMarkerRef.current
  );

  useTextSizes({
    textRef,
    widthMarker: sides.width,
    heightMarker: sides.height,
    setSides,
    setText,
    text,
    lettersFormat,
    font,
    maxTextNodeSize,
  });

  const displayingText = useDisplayingText(text, lettersFormat);

  console.log("textAlign :>> ", textAlign);
  console.log("alignmentOptions.RIGHT :>> ", alignmentOptions.RIGHT);
  console.log(
    "textAlign === alignmentOptions.RIGHT :>> ",
    textAlign === alignmentOptions.RIGHT
  );

  return (
    <>
      <div
        ref={containerRef}
        className={clsx(s.container, s[`fontSize-${fontSize}`])}
      >
        <div ref={textBarRef} className={s.textBar}>
          <div ref={heightMarkerRef} className={s.markerHeightWrapper}>
            <span
              className={s.markerHeight}
            >{`${sides.height?.toFixed()} см`}</span>
          </div>
          <div ref={textWrapperRef} className={s.linesContainer}>
            {text.length && (
              <p
                ref={textRef}
                style={{ fontFamily: `${font}, sans-serif`, color }}
                className={clsx(
                  s.text,
                  isTextLight && s.onLightText,
                  textAlign === alignmentOptions.LEFT && s.left,
                  textAlign === alignmentOptions.CENTER && s.center,
                  textAlign === alignmentOptions.RIGHT && s.right
                )}
              >
                {displayingText.map((el, idx, arr) => {
                  if (idx < arr.length - 1) {
                    return el.stringText !== "" ? (
                      <span key={el.id}>{el.stringText}</span>
                    ) : (
                      <br key={el.id} />
                    );
                  } else {
                    return el.stringText !== "" ? (
                      <span key={el.id}>{el.stringText}</span>
                    ) : (
                      <br key={el.id} />
                    );
                  }
                })}
              </p>
            )}
          </div>
          <div ref={widthMarkerRef} className={s.markerWidthWrapper}>
            <p className={s.markerWidth}>
              <span className={s.widthValue}>{`${sides.width.toFixed()}`}</span>
              <span className={s.widthUnit}>см</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScreenText;
