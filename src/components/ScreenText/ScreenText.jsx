import { Alert, Snackbar } from "@mui/material";
import { Fragment, useEffect, useRef } from "react";

// import ModalError from "components/ModalError/ModalError";
import clsx from "clsx";
import s from "./ScreenText.module.scss";
import { useDisplayingText } from "hooks/useDisplayingText";
import { useFontSize } from "../../hooks/useFontSize";
import { useMedia } from "hooks/useMedia";
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
  setIsTextSizeError,
}) => {
  const containerRef = useRef(null);
  const textBarRef = useRef(null);
  const textRef = useRef(null);
  const heightMarkerRef = useRef(null);
  const widthMarkerRef = useRef(null);

  const { isMobile, isMobileAdaptive } = useMedia();

  const isMobileScreen = isMobile || isMobileAdaptive;

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

  const textSizesOptions = useTextSizes({
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

  useEffect(() => {
    textSizesOptions.withMaxSizeError
      ? setIsTextSizeError(true)
      : setIsTextSizeError(false);
  }, [textSizesOptions.withMaxSizeError, setIsTextSizeError]);

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
      {/* {textSizesOptions.withMaxSizeError && (
        <ModalError
          errorMessage={textSizesOptions.withMaxSizeError}
          setError={textSizesOptions.setWithMaxSizeError}
        />
      )} */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={Boolean(textSizesOptions.withMaxSizeError)}
        autoHideDuration={6000}
        message={textSizesOptions.withMaxSizeError}
        onClose={() => textSizesOptions.setWithMaxSizeError(null)}
      >
        <Alert
          onClose={() => textSizesOptions.setWithMaxSizeError(null)}
          severity="error"
          sx={{ width: isMobileScreen ? "100%" : "50%", fontSize: "20px" }}
        >
          {textSizesOptions.withMaxSizeError}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ScreenText;
