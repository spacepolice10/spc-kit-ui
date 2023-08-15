import { ButtonElemType } from "./buttonType";
import { useButton } from "../hooks/useButton";
import { usePushType } from "../../interactions/hooks/usePush/usePushType";
import { useFocusType } from "../../interactions/hooks/useFocus/useFocusType";

export type ButtonType = usePushType & useFocusType & ButtonElemType;

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
