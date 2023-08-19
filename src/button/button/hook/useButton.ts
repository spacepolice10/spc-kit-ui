import {
  useFocus,
  useFocusType,
} from "../../../interactions/focus/hook/useFocus";
import { useHover } from "../../../interactions/hover/hook/useHover";
import { usePush, usePushType } from "../../../interactions/push/hook/usePush";

const useButton = (props: usePushType & useFocusType) => {
  const { isPushed, pushPropList } = usePush(props);
  const { isHovered, hoverPropList } = useHover();
  const { isFocused, focusPropList } = useFocus(props);
  const buttonPropList = {
    ...pushPropList,
    ...hoverPropList,
    ...focusPropList,
  };
  return {
    isPushed,
    isFocused,
    isHovered,
    buttonPropList,
  };
};

export { useButton };
