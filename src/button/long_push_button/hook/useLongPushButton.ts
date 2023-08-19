import { useFocus } from "../../../interactions/focus/hook/useFocus";
import { useHover } from "../../../interactions/hover/hook/useHover";
import {
  useLongPush,
  useLongPushType,
} from "../../../interactions/long_push/hook/useLongPush";

const useLongPushButton = (props: useLongPushType) => {
  const { isLongPushed, longPushPropList } = useLongPush(props);
  const { isHovered, hoverPropList } = useHover();
  const { isFocused, focusPropList } = useFocus();
  const longPushButtonPropList = {
    ...longPushPropList,
    ...hoverPropList,
    ...focusPropList,
  };
  return {
    isLongPushed,
    isFocused,
    isHovered,
    longPushButtonPropList,
  };
};

export { useLongPushButton };
