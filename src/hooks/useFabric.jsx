import { useEffect, useRef } from "react";
import { fabric } from "fabric";
import { getTextBlur } from "../components/Screen/blurOption";

const useFabric = ({
  text,
  textWidthState,
  textHeightState,
  isMobile,
  isTablet,
  isDesktop,
  isMobileAdaptive,
  font,
  color,
  alignment,
  format,
  textBlur,
}) => {
  //   const [textBlur] = useState(true);

  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current);

    const addText = () => {
      if (typeof text !== "string") return;
      let fontSize = 0;
      let lineHeight = 0;

      if (isMobile || isMobileAdaptive) {
        fontSize = 32;
        lineHeight = 0.88;
      } else if (isTablet) {
        fontSize = 46;
        lineHeight = 1;
      } else {
        lineHeight = 1;
      }

      const textBlurValue = getTextBlur(color);
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

      //  fabric.Text.prototype.fontFamily = "Comfortaa"; //перший варіант

      const textObject = new fabric.Text(formattedText, {
        left: 20,
        top: 20,
        right: 20,
        fontSize: fontSize,
        lineHeight: lineHeight,
        fill: color,
        fontFamily: font,
        fontWeight: 400,
        format: format,
        fixedWidth: false,
        selectable: false,
        shadow: textBlur ? `${textBlurValue} 0 0 10px` : null,
        shadowOffsetX: textBlur ? 5 : 0,
        shadowOffsetY: textBlur ? 10 : 0,
        stroke: textBlur ? textBlurValue : null,
        strokeWidth: textBlur ? 0.2 : 0,
        textAlign: alignment,
        originX: "left",
      });

      textObject.set({ fontFamily: "Comfortaa" });

      // console.log("textObject:", textObject);
      // console.log("Шрифт:", fabric.Text.prototype.fontFamily);

      //   if ( fabric.Text.prototype.fontFamily === "Times New Roman") {
      //   textObject.set({ fontFamily: "Comfortaa" });
      // } //другий варіант

      //  textObject.set("fontFamily", "Comfortaa");
      // canvas.renderAll(); //третій варіант

      const formatText = (text) => {
        const words = text.split(" ");
        const formattedWords = words.map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        });
        return formattedWords.join(" ");
      };

      if (format === "uppercase") {
        textObject.set({ text: formattedText.toUpperCase() });
      } else if (format === "lowercase") {
        textObject.set({ text: formattedText.toLowerCase() });
      } else if (format === "capitalize") {
        textObject.set({ text: formatText(formattedText) });
      }

      const desiredHeight = textHeightState !== "" ? textHeightState : 40;
      const desiredWidth = textWidthState !== "" ? textWidthState : 160;

      const cmToPxRatio = () => {
        const isMobile = window.matchMedia("(max-width: 767px)").matches;
        const isTablet = window.matchMedia("(max-width: 1439px)").matches;
        const isDesktop = window.matchMedia("(min-width: 1440px)").matches;

        if (isMobile) {
          return 1.1;
        } else if (isTablet) {
          return 2;
        } else if (isDesktop) {
          return 2.5;
        }
      };

      const scaleX = (desiredWidth / textObject.width) * cmToPxRatio();
      const scaleY = (desiredHeight / textObject.height) * cmToPxRatio();

      textObject.set({ scaleX, scaleY });

      const textWidth = textObject.getScaledWidth();
      const textHeight = textObject.getScaledHeight();

      containerRef.current.style.width = `${textWidth}px`;
      containerRef.current.style.height = `${textHeight + 20}px`;

      canvas.setDimensions({ width: textWidth + 50, height: textHeight + 60 });

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

    const updateCanvas = () => {
      setCanvasSize();
      canvas.clear();
      addText();
    };

    updateCanvas();

    window.addEventListener("resize", setCanvasSize);

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      canvas.dispose();
    };
  }, [
    text,
    textWidthState,
    textHeightState,
    isMobile,
    isTablet,
    isDesktop,
    isMobileAdaptive,
    font,
    color,
    alignment,
    format,
    textBlur,
    canvasRef,
    containerRef,
  ]);

  return {
    canvasRef,
    containerRef,
  };
};

export default useFabric;
