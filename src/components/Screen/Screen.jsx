import React, { useState } from "react";
import { Radio, RadioGroup, Typography, useMediaQuery } from "@mui/material";
import { fabric } from "fabric";
import background1 from "../../images/bg1@1x.jpg";
import background2 from "../../images/bg2@1x.jpg";
import background3 from "../../images/bg3@1x.jpg";
import background4 from "../../images/bg4@1x.jpg";

const ScreenComponent = () => {
  const [selectedBackground, setSelectedBackground] = useState(null);

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

  const isMobile = useMediaQuery("(max-width: 375px)");
  const isTablet = useMediaQuery("(min-width: 768px)");
  const isDesktop = useMediaQuery("(min-width: 1440px)");

  const containerStyle = {
    width: isMobile ? "100%" : isTablet ? "704px" :isDesktop ? "742px" : "335px",
    height: isTablet ? "640px" : "420px",
    backgroundImage: selectedBackground ? `url(${selectedBackground})` : "",
    backgroundColor: selectedBackground ? "" : "#121417",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "10px",
    position: "relative",
  };

  const radioGroupStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: isTablet ? "flex-end" : "flex-start",
    position: "absolute",
    bottom: "16px",
    right: "16px",
    gap:  "8px",
  };

  const iconStyle = {
    height: isTablet ? "64px" : "40px",
    width: isTablet ? "64px" : "40px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    cursor: "pointer",
    borderRadius: "6px",
  };

  const textStyle = {
    fontFamily: "Roboto",
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: "18px",
    letterSpacing: "0em",
    textAlign:  "right",
    color: "#FFFFFF",
    position: "absolute",
    bottom: isTablet ? "88px" : "64px",
    right:  "24px",
  };

  return (
    <div style={containerStyle}>
      <RadioGroup
        value={selectedBackground}
        onChange={handleRadioChange}
        style={radioGroupStyle}
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
                ...iconStyle,
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
      <Typography variant="body1" style={textStyle}>
        Фони
      </Typography>
    </div>
  );
};

export default ScreenComponent;

