import { Radio, RadioGroup, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import CustomSwitch from "../Switch/Switch";
import ScreenText from "../ScreenText/ScreenText";
import { backgrounds } from "../../images";
// import addText from "./utils/canvasUtils/addText";
// import { fabric } from "fabric";
import getAlignmentStyle from "./utils/AlignmentStyle/getAlignmentStyle";
import handleRadioChange from "./utils/RadioChange/handleRadioChange";
import handleTextBlurChange from "./utils/TextBlurChange/handleTextBlurChange";
import styles from "./ScreenComponentStyles";
import { useMedia } from "../../hooks/useMedia";

// import updateCanvas from "./utils/canvasUtils/updateCanvas";

const ScreenComponent = ({
  text,
  textWidth,
  textHeight,
  font,
  color,
  alignment,
  format,
  price,
}) => {
  const [textBlur, setTextBlur] = useState(true);
  const [selectedBackground, setSelectedBackground] = useState(null);
  // const canvasRef = useRef(null);
  // const containerRef = useRef(null);

  const { isMobile, isMobileAdaptive, isTablet, isDesktop } = useMedia();

  useEffect(() => {
    // window.addEventListener("resize", setCanvasSize);

    return () => {
      // window.removeEventListener("resize", setCanvasSize);
      // canvas.dispose();
    };
  }, [
    text,
    textWidth,
    textHeight,
    textBlur,
    isMobile,
    isTablet,
    isDesktop,
    isMobileAdaptive,
    font,
    color,
    alignment,
    format,
  ]);

  return (
    <div
      style={styles.container(
        {isMobile,
        isTablet,
        isDesktop,
        selectedBackground}
      )}
    >
      <Typography
        variant="body1"
        style={{
          ...styles.price(isTablet),
          color: price !== "" ? "#5FCECB" : "#FFFFFF33",
        }}
      >
        {price} грн
      </Typography>

      {text.length > 0 && (
        <ScreenText
          text={text}
          styles={styles}
          getAlignmentStyle={getAlignmentStyle}
          alignment={alignment}
          isTablet={isTablet}
          textHeight={textHeight}
          textWidth={textWidth}
        />
      )}
      <div
        style={isMobile ? styles.customSwitchMobile : styles.customSwitchTablet}
      >
        <CustomSwitch
          unchecked={textBlur.toString()}
          onChange={() => handleTextBlurChange(setTextBlur)}
        />
      </div>

      <RadioGroup
        value={selectedBackground}
        onChange={(event) =>
          handleRadioChange(event, setSelectedBackground, backgrounds)
        }
        style={styles.radioGroup(isTablet)}
      >
        {backgrounds.map((background) => (
          <div
            key={background.value}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Radio
              value={background.value}
              checked={selectedBackground === background.value}
              onChange={(event) =>
                handleRadioChange(event, setSelectedBackground, backgrounds)
              }
              style={{ display: "none" }}
            />
            <div
              onClick={() =>
                handleRadioChange(
                  {
                    target: {
                      value:
                        devicePixelRatio > 2
                          ? background.imageUrl2x
                          : background.imageUrl,
                    },
                  },
                  setSelectedBackground,
                  backgrounds
                )
              }
              style={{
                ...styles.icon(isTablet),
                backgroundImage: `url(${
                  devicePixelRatio > 2
                    ? background.imageUrl2x
                    : background.imageUrl
                })`,
                border:
                  selectedBackground === background.value
                    ? "2px solid #5FCECB"
                    : "none",
              }}
            />
          </div>
        ))}
      </RadioGroup>
      <Typography variant="body1" style={styles.text(isTablet)}>
        Фони
      </Typography>
    </div>
  );
};

export default ScreenComponent;
