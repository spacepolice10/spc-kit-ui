import { useLongPushType } from "../../interactions/hooks/useLongPush/useLongPushType";
import { useLongPushButton } from "../hooks/useLongPushButton";
import { ButtonElemType } from "./buttonType";

const LongPushButton = (props: useLongPushType & ButtonElemType) => {
  const { styles, classNames, children, ...restPropList } = props;
  const { isLongPushed, isFocused, isHovered, longPushButtonPropList } =
    useLongPushButton(restPropList);
  return (
    <button
      style={styles}
      className={
        typeof classNames != "function"
          ? classNames
          : classNames?.({ isPushed: isLongPushed, isHovered, isFocused })
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
