import { getStylePropertyValue } from "services/helpers";
import { useMemo } from "react";

export const useMaxTextNodeSize = (
  innerScreenSize,
  textWrapperNode,
  widthMarkerNode,
  heightMarkerNode,
  isBgChange
) => {
  const maxTextNodeSize = useMemo(() => {
    if (!widthMarkerNode || !heightMarkerNode || !textWrapperNode)
      return { width: 0, height: 0 };
    const { width, height } = innerScreenSize;
    const widthMarkerNodeYSize = widthMarkerNode.offsetHeight;
    const heightMarkerNodeXSize = heightMarkerNode.offsetWidth;
    const styles = getStylePropertyValue(
      textWrapperNode,
      "padding-left",
      "padding-bottom"
    );
    const paddings = {
      left: parseInt(styles["padding-left"]),
      bottom: parseInt(styles["padding-bottom"]),
    };
    const maxSize = {
      width: width - heightMarkerNodeXSize - paddings.left,
      height: height - widthMarkerNodeYSize - paddings.bottom,
    };
    return maxSize;
  }, [innerScreenSize, widthMarkerNode, heightMarkerNode, textWrapperNode]);

  return maxTextNodeSize;
};
