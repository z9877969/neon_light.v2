import { useRef, useState } from "react";

import BgChanger from "../BgChanger/BgChanger";
import ScreenText from "../ScreenText/ScreenText";
import ScreenTopPanel from "../ScreenTopPanel/ScreenTopPanel";
import { backgrounds } from "../../images";
import clsx from "clsx";
// import getAlignmentStyle from "./utils/AlignmentStyle/getAlignmentStyle";
// import handleRadioChange from "./utils/RadioChange/handleRadioChange";
import s from "./ScreenComponent.module.scss";
import { useInnerScreenSize } from "../../hooks/useInnerScreenSize";

const ScreenComponent = ({
  text,
  textWidth,
  textHeight,
  setTextWidth,
  setTextHeight,
  font,
  color,
  alignment,
  format,
  price,
}) => {
  const [isTextLight, setIsTextLight] = useState(false);
  const [selectedBackground, setSelectedBackground] = useState(null);

  const { innerScreenSize, screenRef } = useInnerScreenSize();
  const topPanelRef = useRef(null);
  // const { textSize } = useTextSize();

  const toggleTextLight = () => {
    setIsTextLight((p) => !p);
  };

  return (
    <div
      ref={screenRef}
      className={clsx(
        s.container,
        Boolean(selectedBackground)
          ? s[`bgImage-${selectedBackground}`]
          : s.bgColor
      )}
    >
      <ScreenTopPanel
        containerRef={topPanelRef}
        price={price}
        isTextLight={isTextLight}
        toggleTextLight={toggleTextLight}
      />
      {text.length > 0 && (
        <ScreenText
          text={text}
          textHeight={textHeight}
          textWidth={textWidth}
          isTextLight={isTextLight}
          innerScreenSize={innerScreenSize}
          setTextWidth={setTextWidth}
          setTextHeight={setTextHeight}
          // alignment={alignment}
          // isTablet={isTablet}
        />
      )}
      <BgChanger
        backgrounds={backgrounds}
        selectedBackground={selectedBackground}
        setSelectedBackground={setSelectedBackground}
      />
    </div>
  );
};

export default ScreenComponent;
