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
  const { children, style, className } = props;
  const { slidePropList, thumbPropList, offsetSlider, value } =
    useSlider(props);
  function offsetSliderDemo() {
    offsetSlider(200);
  }

  return (
    <>
      <button onClick={offsetSliderDemo}>TEST</button>
      <div
        {...slidePropList}
        style={{ ...style, ...slidePropList.style }}
        className={className as string}
      >
        <SliderCtxt.Provider value={thumbPropList}>
          {typeof children != "function" ? children : children?.({ value })}
        </SliderCtxt.Provider>
      </div>
    </>
  );
};

export { Slider, SlideThumb };
