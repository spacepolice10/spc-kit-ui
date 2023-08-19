import { useToggle, useToggleType } from "../../../form/util/useToggle";
import { useButton } from "../../button/hook/useButton";
import { ButtonType } from "../../button/components/Button";

export function ToggleButton(props: ButtonType & useToggleType) {
  const { children, classStyle, styles, ...restPropList } = props;
  const { isToggle, toggle } = useToggle(props);
  const { isHovered, isFocused, isPushed, buttonPropList } = useButton({
    ...restPropList,
    onPush: toggle,
  });

  return (
    <button
      style={styles}
      className={
        typeof classStyle != "function"
          ? classStyle
          : classStyle?.({ isPushed, isToggle, isHovered, isFocused })
      }
      {...buttonPropList}
    >
      {typeof children != "function"
        ? children
        : children?.({ isPushed, isToggle, isHovered, isFocused })}
    </button>
  );
}
