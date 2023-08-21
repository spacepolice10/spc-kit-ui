import { CSSProperties, useState } from "react";
import { useButton } from "../../../button/button/hook/useButton";
import { useToggle, useToggleType } from "../../util/useToggle";

export type useSwitchType = useToggleType & {
  isVertical?: boolean;
};

const useSwitch = (props?: useSwitchType) => {
  const { isToggle, toggle } = useToggle(props);
  const { buttonPropList, isHovered, isFocused } = useButton({
    onPush: toggle,
    isntSemanticPushableElem: true,
  });

  const [outerWidth, setOuterWidth] = useState(0);
  const [innerWidth, setInnerWidth] = useState(0);
  const switchWrapPropList = {
    ...buttonPropList,
    ref: (ref: HTMLButtonElement) => {
      if (!ref) return;
      setOuterWidth(ref?.offsetWidth);
    },
  };
  const switchPropList = {
    ref: (ref: HTMLDivElement) => {
      if (!ref) return;
      setInnerWidth(ref?.offsetWidth);
    },
    style: {
      position: "absolute",
      width: "fit-content",
      inset: 0,
      transform: isToggle
        ? `${props?.isVertical ? "translateY" : "translateX"}(${
            outerWidth - innerWidth
          }px)`
        : "",
    } as CSSProperties,
  };
  return {
    isSwitched: isToggle,
    isHovered,
    isFocused,
    switchWrapPropList,
    switchPropList,
  };
};

export { useSwitch };
