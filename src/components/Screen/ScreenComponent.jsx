import React, { useEffect, useState } from "react";

import BgChanger from "../BgChanger/BgChanger";
import ScreenText from "../ScreenText/ScreenText";
import ScreenTopPanel from "../ScreenTopPanel/ScreenTopPanel";
import { backgrounds } from "../../images";
import clsx from "clsx";
// import getAlignmentStyle from "./utils/AlignmentStyle/getAlignmentStyle";
// import handleRadioChange from "./utils/RadioChange/handleRadioChange";
import s from "./ScreenComponent.module.scss";
import { useMedia } from "../../hooks/useMedia";

const ScreenComponent = ({
  text,
  textWidth,
  textHeight,
  font,
  color,
  alignment,
  format,
  price,
}) => {
  const [isTextLight, setIsTextLight] = useState(false);
  const [selectedBackground, setSelectedBackground] = useState(null);

  const { isMobile, isMobileAdaptive, isTablet, isDesktop } = useMedia();

  const toggleTextLight = () => {
    setIsTextLight((p) => !p);
  };

  useEffect(() => {}, [
    text,
    textWidth,
    textHeight,
    isTextLight,
    isMobile,
    isTablet,
    isDesktop,
    isMobileAdaptive,
    font,
    color,
    alignment,
    format,
  ]);

  return (
    <div
      className={clsx(
        s.container,
        Boolean(selectedBackground)
          ? s[`bgImage-${selectedBackground}`]
          : s.bgColor
      )}
    >
      <ScreenTopPanel
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
          // getAlignmentStyle={getAlignmentStyle}
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
