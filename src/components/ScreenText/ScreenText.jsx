import CustomizedAlert from "components/CustomizedAlert/CustomizedAlert";
import clsx from "clsx";
import s from "./ScreenText.module.scss";
import { useDisplayingText } from "hooks/useDisplayingText";
import { useFontSize } from "../../hooks/useFontSize";
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

  const errorOptions = useTextSizes({
    textRef,
    widthMarker: sides.width,
    heightMarker: sides.height,
    setSides,
    setText,
    text,
    lettersFormat,
    font,
    innerScreenSize,
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
            <span
              className={s.markerHeight}
            >{`${sides.height?.toFixed()} см`}</span>
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
          </div>
          <div ref={widthMarkerRef} className={s.markerWidthWrapper}>
            <p className={s.markerWidth}>
              <span className={s.widthValue}>{`${sides.width.toFixed()}`}</span>
              <span className={s.widthUnit}>см</span>
            </p>
          </div>
        </div>
      </div>
      {errorOptions.sideSizeError && (
        <CustomizedAlert
          message={errorOptions.sideSizeError}
          closeAlert={errorOptions.setSideSizeError}
        />
      )}
    </>
  );
};

export default ScreenText;
