import { getTextBlur } from "../blurOption";


const addText = (
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
    fabric,

) => {
    if (!text) return;
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

    const textObject = new fabric.Text(formattedText, {
        left: 20,
        top: 30,
        right: 20,
        fontSize: fontSize,
        lineHeight: lineHeight,
        fill: color,
        fontFamily: font,
        fontWeight: 500,
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

export default addText;