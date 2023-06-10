import React, { useEffect, useRef, useState } from "react";
import { Radio, RadioGroup, Typography, useMediaQuery } from "@mui/material";
import { fabric } from "fabric";
import background1 from "../../images/bg1@1x.jpg";
import background2 from "../../images/bg2@1x.jpg";
import background3 from "../../images/bg3@1x.jpg";
import background4 from "../../images/bg4@1x.jpg";
import CustomSwitch from "../Switch/Switch";
import styles from "./ScreenStyles";

const ScreenComponent = () => {
  const [textWidthState] = useState(178);
  const [textHeightState] = useState(32);
  const [textState] = useState("web design");
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [textBlur, setTextBlur] = useState(true);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current);

    const addText = () => {
      const text = new fabric.Text(textState, {
        left: 0,
        top: 0,
        fontSize: 250,
        fill: "#FFF303",
        selectable: false,
        shadow: textBlur ? "rgba(255, 243, 3, 0.5) -25.5px 10px 50px" : null,
        shadowBlur: textBlur ? 100 : 0,
        shadowColor: textBlur ? "rgba(255, 243, 3, 0.5)" : null,
      });

      const desiredWidth = textWidthState;
      const desiredHeight = textHeightState;

      const scaleX = desiredWidth / text.width;
      const scaleY = desiredHeight / text.height;

      text.set({ scaleX, scaleY });

      const textWidth = text.getScaledWidth();
      const textHeight = text.getScaledHeight();

      containerRef.current.style.width = `${textWidth}px`;
      containerRef.current.style.height = `${textHeight}px`;
      // containerRef.current.style.filter = textBlur ? "blur(5px)" : "none";

      canvas.setDimensions({ width: textWidth, height: textHeight });

      canvas.add(text);
    };

    addText();

    const setCanvasSize = () => {
      const containerWidth = canvasRef.current.offsetWidth;
      const containerHeight = canvasRef.current.offsetHeight;

      canvas.setWidth(containerWidth);
      canvas.setHeight(containerHeight);
      canvas.renderAll();
    };

    setCanvasSize();

    window.addEventListener("resize", setCanvasSize);

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      canvas.dispose();
    };
  }, [textWidthState, textHeightState, textState, textBlur]);

  const backgrounds = [
    { value: "background1", imageUrl: background1 },
    { value: "background2", imageUrl: background2 },
    { value: "background3", imageUrl: background3 },
    { value: "background4", imageUrl: background4 },
  ];

  const handleRadioChange = (event) => {
    const { value } = event.target;
    setSelectedBackground(value);

    const canvas = new fabric.Canvas("canvas");
    const selectedBackground = backgrounds.find(
      (background) => background.value === value
    );
    const imageUrl = selectedBackground ? selectedBackground.imageUrl : "";

    if (imageUrl) {
      fabric.Image.fromURL(imageUrl, (img) => {
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
        canvas.renderAll();
      });
    } else {
      canvas.setBackgroundImage(null, canvas.renderAll.bind(canvas));
      canvas.renderAll();
    }
  };

  const handleTextBlurChange = () => {
    setTextBlur((prevBlur) => !prevBlur);
  };

  const isMobile = useMediaQuery("(max-width: 375px)");
  const isTablet = useMediaQuery("(min-width: 768px)");
  const isDesktop = useMediaQuery("(min-width: 1440px)");

  return (
    <div
      style={styles.container(
        isMobile,
        isTablet,
        isDesktop,
        selectedBackground
      )}
    >
      <div style={styles.canvasWrapper}>
        <div style={styles.canvasContainer} ref={containerRef}>
          <div style={styles.canvasHeight}>{textHeightState} см</div>
          <div style={styles.canvasWidth}>{textWidthState} см</div>
          <canvas ref={canvasRef} />
        </div>
      </div>
      <div
        style={isMobile ? styles.customSwitchMobile : styles.customSwitchTablet}
      >
        <CustomSwitch
          unchecked={textBlur.toString()}
          onChange={handleTextBlurChange}
        />
      </div>

      <RadioGroup
        value={selectedBackground}
        onChange={handleRadioChange}
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
              value={background.imageUrl}
              checked={selectedBackground === background.imageUrl}
              onChange={handleRadioChange}
              style={{ display: "none" }}
            />
            <div
              onClick={() =>
                handleRadioChange({ target: { value: background.imageUrl } })
              }
              style={{
                ...styles.icon(isTablet),
                backgroundImage: `url(${background.imageUrl})`,
                border:
                  selectedBackground === background.imageUrl
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
