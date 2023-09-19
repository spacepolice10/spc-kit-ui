import { ForwardedRef, forwardRef } from "react";
import { useFocusType } from "../../../interactions/focus/hook/useFocus";
import { useHoverType } from "../../../interactions/hover/hook/useHover";
import { usePushType } from "../../../interactions/push/hook/usePush";
import { childrenStatesType } from "../../../util/childrenStatesType";

import { stylesType } from "../../../util/stylesType";
import { useButton } from "../hook/useButton";

type buttonStates = {
  isPushed?: boolean;
  isToggle?: boolean;
  isHovered?: boolean;
  isFocused?: boolean;
};
type buttonStatesType = childrenStatesType<buttonStates>;
type ButtonElemType = stylesType<buttonStates> & {
  id?: string;
  children?: buttonStatesType;
};
type ButtonType = usePushType & useFocusType & useHoverType & ButtonElemType;
export type { ButtonElemType, ButtonType };

const Button = forwardRef(function Button(
  props: ButtonType,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const { children, className, style, ...restPropList } = props;
  const { isHovered, isFocused, isPushed, buttonPropList } = useButton({
    ...restPropList,
  });

  return (
    <button
      style={style}
      className={
        typeof className != "function"
          ? className
          : className?.({ isPushed, isHovered, isFocused })
      }
      {...buttonPropList}
      ref={ref}
    >
      {typeof children != "function"
        ? children
        : children?.({ isPushed, isHovered, isFocused })}
    </button>
  );
});
export { Button };
