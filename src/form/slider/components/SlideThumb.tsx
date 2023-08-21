import { useContext } from "react";
import { SliderCtxt } from "./Slider";
import { ButtonElemType } from "../../../button/button/components/Button";
import { useFocus } from "../../../interactions/focus/hook/useFocus";
import { useHover } from "../../../interactions/hover/hook/useHover";
import { stylesType } from "../../../util/stylesType";

type SlideThumbType = stylesType & ButtonElemType;
const SlideThumb = (props: SlideThumbType) => {
  const { children, style } = props;
  const thumbPropList = useContext(SliderCtxt);
  const { isHovered, hoverPropList } = useHover();
  const { isFocused, focusPropList } = useFocus();
  return (
    <div
      {...thumbPropList}
      style={{ ...style, ...thumbPropList.style }}
      {...hoverPropList}
      {...focusPropList}
    >
      {typeof children != "function"
        ? children
        : children?.({ isHovered, isFocused })}
    </div>
  );
};

export { SlideThumb };
