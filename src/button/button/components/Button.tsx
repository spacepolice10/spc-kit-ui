import { useFocusType } from "../../../interactions/focus/hook/useFocus";
import { usePushType } from "../../../interactions/push/hook/usePush";
import { useButton } from "../hook/useButton";

import { CSSProperties, ReactNode } from "react";

type buttonStatesType<T> = ({
  isPushed,
  isToggle,
  isHovered,
  isFocused,
}: {
  isPushed?: boolean;
  isToggle?: boolean;
  isHovered?: boolean;
  isFocused?: boolean;
}) => T;

type ButtonElemType = {
  styles?: CSSProperties;
  classStyle?: buttonStatesType<string>;
  id?: string;
  children?: buttonStatesType<ReactNode> | ReactNode;
};

type ButtonType = usePushType & useFocusType & ButtonElemType;

export type { ButtonElemType, ButtonType };

export function Button(props: ButtonType) {
  const { children, classStyle, styles, ...restPropList } = props;
  const { isHovered, isFocused, isPushed, buttonPropList } = useButton({
    ...restPropList,
  });

  return (
    <button
      style={styles}
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
