import { stylesType } from "../../../util/stylesType";
import { useSlider, useSliderType, useSlideType } from "../hook/useSlider";
import { createContext } from "react";
import { SlideThumb } from "./SlideThumb";
import { childrenStatesType } from "../../../util/childrenStatesType";

export type SliderType = stylesType &
  useSliderType & {
    children: childrenStatesType<{ value: number }>;
  };
export const SliderCtxt = createContext({} as useSlideType);

const Slider = (props: SliderType) => {
  const { children, style, classStyle } = props;
  const { slidePropList, thumbPropList, value } = useSlider(props);

  return (
    <div
      {...slidePropList}
      style={{ ...style, ...slidePropList.style }}
      className={classStyle as string}
    >
      <SliderCtxt.Provider value={thumbPropList}>
        {typeof children != "function" ? children : children?.({ value })}
      </SliderCtxt.Provider>
    </div>
  );
};

export { Slider, SlideThumb };
