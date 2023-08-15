import { useFocus } from "../../interactions/hooks/useFocus/useFocus";
import { useFocusType } from "../../interactions/hooks/useFocus/useFocusType";
import { useHover } from "../../interactions/hooks/useHover/useHover";
import { usePush } from "../../interactions/hooks/usePush/usePush";
import { usePushType } from "../../interactions/hooks/usePush/usePushType";

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
