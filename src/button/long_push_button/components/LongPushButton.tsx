import { useLongPushType } from "../../../interactions/long_push/hook/useLongPush";
import { ButtonElemType } from "../../button/components/Button";
import { useLongPushButton } from "../hook/useLongPushButton";

const LongPushButton = (props: useLongPushType & ButtonElemType) => {
  const { styles, classStyle, children, ...restPropList } = props;
  const { isLongPushed, isFocused, isHovered, longPushButtonPropList } =
    useLongPushButton(restPropList);
  return (
    <button
      style={styles}
      className={
        typeof classStyle != "function"
          ? classStyle
          : classStyle?.({ isPushed: isLongPushed, isHovered, isFocused })
      }
      {...longPushButtonPropList}
    >
      {typeof children != "function"
        ? children
        : children?.({ isPushed: isLongPushed, isHovered, isFocused })}
    </button>
  );
};

export { LongPushButton };
