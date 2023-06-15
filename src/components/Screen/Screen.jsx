import React, { useEffect, useRef, useState } from "react";
import { Radio, RadioGroup, Typography, useMediaQuery } from "@mui/material";
import { fabric } from "fabric";
import background1 from "../../images/bg1@1x.jpg";
import background2 from "../../images/bg2@1x.jpg";
import background3 from "../../images/bg3@1x.jpg";
import background4 from "../../images/bg4@1x.jpg";
import CustomSwitch from "../Switch/Switch";
import styles from "./ScreenStyles";
import { getTextBlur } from "./blurOption";

const ScreenComponent = ({
  text,
  textWidth,
  textHeight,
  font,
  color,
  alignment,
  format,
}) => {
  const textWidthState = textWidth || "";
  const textHeightState = textHeight || "";
  const [textBlur, setTextBlur] = useState(true);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [selectedBackground, setSelectedBackground] = useState(null);

  const isMobile = useMediaQuery("(max-width: 375px)");
  const isMobileAdaptive = useMediaQuery("(min-width: 375px )");
  const isTablet = useMediaQuery("(min-width: 768px)");
  const isDesktop = useMediaQuery("(min-width: 1440px)");

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current);

    const addText = () => {
      let fontSize = 0;
      let lineHeight = 0;

      if (isMobile || isMobileAdaptive) {
        fontSize = 32;
        lineHeight = 1.2;
      } else if (isTablet) {
        fontSize = 46;
        lineHeight = 1.3;
      }

      const textBlurValue = getTextBlur(color);
      // const formattedText = text.replace(/(.{20})/g, "$1\n");
      // const words = text.split(" ");
      // const formattedWords = [];
      // let currentLineLength = 0;
      // for (let i = 0; i < words.length; i++) {
      //   const word = words[i];
      //   if (currentLineLength + word.length <= 20) {
      //     formattedWords.push(word);
      //     currentLineLength += word.length + 1;
      //   } else {
      //     formattedWords.push("\n" + word);
      //     currentLineLength = word.length;
      //   }
      // }
      // const formattedText = formattedWords.join(" ");
      const measureTextWidth = (text) => {
        const tempCanvas = document.createElement("canvas");
        const tempContext = tempCanvas.getContext("2d");
        tempContext.font = `${fontSize}px ${font}`;
        return tempContext.measureText(text).width;
      };

      const containerWidth = containerRef.current.offsetWidth;
      const words = text.split(" ");
      const formattedWords = [];
      let currentLineLength = 0;
      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const wordWidth = measureTextWidth(word);
        if (currentLineLength + wordWidth <= containerWidth) {
          formattedWords.push(word);
          currentLineLength += wordWidth + measureTextWidth(" ");
        } else {
          formattedWords.push("\n" + word);
          currentLineLength = wordWidth;
        }
      }
      const formattedText = formattedWords.join(" ");

      const textObject = new fabric.Text(formattedText, {
        left: 0,
        top: 0,
        fontSize: fontSize,
        lineHeight: lineHeight,
        fill: color,
        fontFamily: font,
        fontWeight: 400,
        format: format,
        fixedWidth: false,
        selectable: false,
        shadow: textBlur ? `${textBlurValue} 0 0 10px` : null,
        // shadowBlur: textBlurValue ? 30 : 0,
        // shadowColor: textBlurValue || null,
        shadowOffsetX: textBlur ? 5 : 0,
        shadowOffsetY: textBlur ? 10 : 0,
        stroke: textBlur ? textBlurValue : null,
        strokeWidth: textBlur ? 0.3 : 0,
        textAlign: alignment,
        originX: "left",
      });
      const formatText = (text) => {
        const words = text.split(" ");
        const formattedWords = words.map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        });
        return formattedWords.join(" ");
      };

      if (format === "AA") {
        textObject.set({ text: formattedText.toUpperCase() });
      } else if (format === "aa") {
        textObject.set({ text: formattedText.toLowerCase() });
      } else if (format === "Aa") {
        textObject.set({ text: formatText(formattedText) });
      }

      const textWidthToHeightRatio = 3;

      const desiredHeight = textHeightState !== "" ? textHeightState : 40;
      const desiredWidth =
        textHeightState !== "" ? desiredHeight * textWidthToHeightRatio : 120;

      const cmToPxRatio = () => {
        const isMobile = window.matchMedia("(max-width: 767px)").matches;
        const isTablet = window.matchMedia("(max-width: 1439px)").matches;
        const isDesktop = window.matchMedia("(min-width: 1440px)").matches;

        if (isMobile) {
          return 1.4;
        } else if (isTablet) {
          return 2.5;
        } else if (isDesktop) {
          return 3;
        }
      };

      const scaleX = (desiredWidth / textObject.width) * cmToPxRatio();
      const scaleY = (desiredHeight / textObject.height) * cmToPxRatio();

      textObject.set({ scaleX, scaleY });

      const textWidth = textObject.getScaledWidth();
      const textHeight = textObject.getScaledHeight();

      containerRef.current.style.width = `${textWidth}px`;
      containerRef.current.style.height = `${textHeight}px`;

      canvas.setDimensions({ width: textWidth, height: textHeight });

      canvas.add(textObject);
    };

    addText();

    const setCanvasSize = () => {
      const containerWidth = canvasRef.current.offsetWidth;
      const containerHeight = canvasRef.current.offsetHeight;

      canvas.setWidth(containerWidth);
      canvas.setHeight(containerHeight);

      canvas.requestRenderAll();
    };

    setCanvasSize();

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
    { value: "background1", imageUrl: background1 },
    { value: "background2", imageUrl: background2 },
    { value: "background3", imageUrl: background3 },
    { value: "background4", imageUrl: background4 },
    // {value: "background5", backgroundColor:"#121417"},
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

  console.log(alignment);
  const getAlignmentStyle = () => {
    if (alignment === "start") {
      return { textAlign: "left" };
    } else if (alignment === "center") {
      return { textAlign: "center" };
    } else if (alignment === "end") {
      return { textAlign: "right" };
    }
  };

  return (
    <div
      style={styles.container(
        isMobile,
        isTablet,
        isDesktop,
        selectedBackground
      )}
    >
      <div
        style={{
          ...styles.canvasWrapper,
          ...getAlignmentStyle(),
         
        }}
      >
        <div
          style={{
            ...styles.canvasWrapper,
            // ...styles.canvasContainer,
            ...getAlignmentStyle(),
            fontFamily: "Roboto",
          }}
          ref={containerRef}
        >
          <div style={styles.canvasHeight}>
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
