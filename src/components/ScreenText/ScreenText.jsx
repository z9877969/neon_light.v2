import { Fragment, useMemo, useRef } from "react";

import ModalError from "components/ModalError/ModalError";
import clsx from "clsx";
import { lettersFormatOptions } from "constants";
import { nanoid } from "nanoid";
import s from "./ScreenText.module.scss";
import { useFontSize } from "../../hooks/useFontSize";
import { useTextSizes } from "../../hooks/useTextSizes";

const toCapitalizeCase = (str) => {
  const firstLetter = str[0].toUpperCase();
  return firstLetter + str.slice(1);
};

const changeByLettersFormat = function (str, lettersFormat) {
  const SPACE = " ";
  const { UPPERCASE, LOWERCASE, CAPITALIZE } = lettersFormatOptions;
  switch (lettersFormat) {
    case UPPERCASE:
      return str.toUpperCase();
    case LOWERCASE:
      return str.toLowerCase();
    case CAPITALIZE:
      return str
        .split(SPACE)
        .map((el) => (el !== SPACE ? toCapitalizeCase(el) : el))
        .join(SPACE);
    default:
      return str;
  }
};

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
  const textSizesOptions = useTextSizes({
    widthMarker: textWidth,
    heightMarker: textHeight,
    setTextWidth,
    setTextHeight,
    text,
    lettersFormat,
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
  });
  const parsedByEnterText = useMemo(() => {
    const paresedText = text.split("\n").map((el) => ({
      stringText: changeByLettersFormat(el, lettersFormat),
      id: nanoid(),
    }));
    console.log("paresedText :>> ", paresedText);
    return paresedText;
  }, [text, lettersFormat]);

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
              className={clsx(
                s.text,
                isTextLight && s.onLightText,
                s[textAlign]
              )}
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
