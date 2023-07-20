const { getStylePropertyValue } = require("./getStylePropertyValue");

export const getMargins = (
  innerScreenWidth,
  textBarWidth,
  heightMarkerWidth
) => {
  const margin = (innerScreenWidth - textBarWidth - heightMarkerWidth) / 2;
  return {
    marginLeft: margin + heightMarkerWidth / 2 + "px",
    marginRight: margin - heightMarkerWidth / 2 + "px",
  };
};

export const getNextLetterSizes = (node, nodeText) => {
  const { "font-size": fontSize, "line-height": lineHeight } =
    getStylePropertyValue(node, "font-size", "line-height");

  const width = Math.round((node.clientWidth / nodeText.length) * 1.5);
  const height =
    typeof lineHeight === "string"
      ? Math.round((parseFloat(fontSize) * parseFloat(lineHeight)) / 100)
      : parseFloat(fontSize) * lineHeight;

  return {
    width,
    height,
  };
};
