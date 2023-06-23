import React, { useEffect, useRef, useState } from "react";
import { Radio, RadioGroup, Typography, useMediaQuery } from "@mui/material";
import { fabric } from "fabric";
import background1 from "../../images/bg1@1x.jpg";
import background2 from "../../images/bg2@1x.jpg";
import background3 from "../../images/bg3@1x.jpg";
import background4 from "../../images/bg4@1x.jpg";
import background1x2 from "../../images/bg1@2x.jpg";
import background2x2 from "../../images/bg2@2x.jpg";
import background3x2 from "../../images/bg3@2x.jpg";
import background4x2 from "../../images/bg4@2x.jpg";
import CustomSwitch from "../Switch/Switch";
import styles from "./ScreenStyles";
import handleRadioChange from "./utils/RadioChange/handleRadioChange";
import getAlignmentStyle from "./utils/AlignmentStyle/getAlignmentStyle";
import handleTextBlurChange from "./utils/TextBlurChange/handleTextBlurChange";
import addText from "./utils/canvasUtils/addText";
import updateCanvas from "./utils/canvasUtils/updateCanvas";

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
  const textWidthState = textWidth || "";
  const textHeightState = textHeight || "";
  const [textBlur, setTextBlur] = useState(true);
  const [selectedBackground, setSelectedBackground] = useState(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const isMobile = useMediaQuery("(max-width: 375px)");
  const isMobileAdaptive = useMediaQuery("(min-width: 375px )");
  const isTablet = useMediaQuery("(min-width: 768px)");
  const isDesktop = useMediaQuery("(min-width: 1440px)");

  const roundPrice = (price) => Math.round(price);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current);

    addText(
      canvas,
      isMobile,
      isMobileAdaptive,
      isTablet,
      text,
      color,
      font,
      alignment,
      format,
      textBlur,
      textWidthState,
      textHeightState,
      containerRef,
      fabric
    );

    const setCanvasSize = () => {
      const containerWidth = canvasRef.current.offsetWidth;
      const containerHeight = canvasRef.current.offsetHeight;

      canvas.setWidth(containerWidth);
      canvas.setHeight(containerHeight);

      canvas.requestRenderAll();
    };

    setCanvasSize();

    updateCanvas(
      canvas,
      setCanvasSize,
      addText,
      isMobile,
      isMobileAdaptive,
      isTablet,
      text,
      color,
      font,
      alignment,
      format,
      textBlur,
      textWidthState,
      textHeightState,
      containerRef,
      fabric,
      canvasRef
    );

    window.addEventListener("resize", setCanvasSize);

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      canvas.dispose();
    };
  }, [
    text,
    textWidthState,
    textHeightState,
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

  const backgrounds = [
    { value: "background1", imageUrl: background1, imageUrl2x: background1x2 },
    { value: "background2", imageUrl: background2, imageUrl2x: background2x2 },
    { value: "background3", imageUrl: background3, imageUrl2x: background3x2 },
    { value: "background4", imageUrl: background4, imageUrl2x: background4x2 },
  ];

  return (
    <div
      style={styles.container(
        isMobile,
        isTablet,
        isDesktop,
        selectedBackground
      )}
    >
      <div>
        <Typography
          variant="body1"
          style={{
            ...styles.price(isTablet),
            color: price !== "" ? "#5FCECB" : "#FFFFFF33",
          }}
        >
          {roundPrice(price)} грн
        </Typography>
      </div>
      <div
        style={{
          ...styles.canvasWrapper(isTablet),
        }}
      >
        <div
          style={{
            ...styles.canvasContainer,
            ...getAlignmentStyle(alignment),
          }}
          ref={containerRef}
        >
          <div style={styles.canvasHeight(isTablet)}>
            {textHeightState !== "" ? `${textHeightState} см` : "см"}
          </div>
          <div style={styles.canvasWidth}>
            {textWidthState !== "" ? `${textWidthState} см` : "см"}
          </div>
          <canvas ref={canvasRef} />
        </div>
      </div>
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