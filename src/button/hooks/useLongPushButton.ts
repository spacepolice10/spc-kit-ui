import { useFocus } from "../../interactions/hooks/useFocus/useFocus";
import { useHover } from "../../interactions/hooks/useHover/useHover";
import { useLongPush } from "../../interactions/hooks/useLongPush/useLongPush";
import { useLongPushType } from "../../interactions/hooks/useLongPush/useLongPushType";

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
