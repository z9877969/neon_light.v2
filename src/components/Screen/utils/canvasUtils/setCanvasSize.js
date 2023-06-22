const setCanvasSize = (canvas, canvasRef) => {
    const containerWidth = canvasRef.current.offsetWidth;
    const containerHeight = canvasRef.current.offsetHeight;

    canvas.setWidth(containerWidth);
    canvas.setHeight(containerHeight);

    canvas.requestRenderAll();
};

export default setCanvasSize;