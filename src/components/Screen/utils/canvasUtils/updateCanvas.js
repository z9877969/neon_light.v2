const updateCanvas = (
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
    canvasRef,
) => {
    setCanvasSize(canvas, canvasRef);
    canvas.clear();
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
};

export default updateCanvas;
