import { useRef, useState } from "react";

import BgChanger from "../BgChanger/BgChanger";
import ScreenText from "../ScreenText/ScreenText";
import ScreenTopPanel from "../ScreenTopPanel/ScreenTopPanel";
import { backgrounds } from "../../images";
import clsx from "clsx";
import s from "./ScreenComponent.module.scss";
import { useInnerScreenSize } from "../../hooks/useInnerScreenSize";

const ScreenComponent = ({
  text,
  sides,
  setSides,
  setText,
  font,
  color,
  textAlign,
  lettersFormat,
  price,
}) => {
  const [isTextLight, setIsTextLight] = useState(true);
  const [selectedBackground, setSelectedBackground] = useState(null);

  const topPanelRef = useRef(null);
  const screenRef = useRef(null);

  const innerScreenSize = useInnerScreenSize(
    screenRef,
    topPanelRef,
    selectedBackground
  );

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
          sides={sides}
          isTextLight={isTextLight}
          innerScreenSize={innerScreenSize}
          setSides={setSides}
          setText={setText}
          lettersFormat={lettersFormat}
          textAlign={textAlign}
          font={font}
          color={color}
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
