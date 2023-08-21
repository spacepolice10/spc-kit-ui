import { useFocusType } from "../../../interactions/focus/hook/useFocus";
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
type ButtonType = usePushType & useFocusType & ButtonElemType;
export type { ButtonElemType, ButtonType };

export function Button(props: ButtonType) {
  const { children, classStyle, style, ...restPropList } = props;
  const { isHovered, isFocused, isPushed, buttonPropList } = useButton({
    ...restPropList,
  });

  return (
    <button
      style={style}
      className={
        typeof classStyle != "function"
          ? classStyle
          : classStyle?.({ isPushed, isHovered, isFocused })
      }
      {...buttonPropList}
    >
      {typeof children != "function"
        ? children
        : children?.({ isPushed, isHovered, isFocused })}
    </button>
  );
}
