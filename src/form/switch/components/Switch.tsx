import { ReactNode } from "react";
import { useSwitch, useSwitchType } from "../hook/useSwitch";
import { stylesType } from "../../../util/stylesType";

export type SwitchType = stylesType<{ isSwitched: boolean }> &
  useSwitchType & { children: ReactNode };

const Switch = (props?: SwitchType) => {
  const { children, style, className } = props || {};
  const {
    isSwitched,
    isHovered,
    isFocused,
    switchWrapPropList,
    switchPropList,
  } = useSwitch(props);
  return (
    <>
      <button
        {...switchWrapPropList}
        style={{ position: "relative", ...style }}
        className={
          typeof className != "function"
            ? className
            : className?.({ isSwitched, isHovered, isFocused })
        }
      >
        <div {...switchPropList}>{children}</div>
      </button>
    </>
  );
};

export { Switch };
