import { ReactNode, createContext, useContext } from "react";
import { useButtonType } from "../../button/button";
import {
	useSlider,
	useSliderReturnType,
	useSliderType,
} from "./useSlider";

export const SliderCtxt = createContext(
	{} as useSliderReturnType
);
const useSliderCtxt = () => useContext(SliderCtxt);

type SliderType = useSliderType & {
	children: ReactNode;
	className?: string;
};

type SlideType = {
	children:
		| (({ value }: { value: number }) => ReactNode)
		| ReactNode;
	className?: string;
};

type ThumbType = {
	className?: string;
} & useButtonType;

const Slider = (propList: SliderType) => {
	const { children, className } = propList;
	const sliderPropList = useSlider(propList);
	return (
		<>
			<SliderCtxt.Provider value={sliderPropList}>
				<div className={className}>{children}</div>
			</SliderCtxt.Provider>
		</>
	);
};

const Slide = (propList: SlideType) => {
	const { children, className } = propList;
	const { slidePropList, value } = useContext(SliderCtxt);
	return (
		<div {...slidePropList} className={className}>
			{typeof children != "function"
				? children
				: children?.({ value })}
		</div>
	);
};

const Thumb = (propList: ThumbType) => {
	const { className } = propList;
	const { thumbPropList } = useContext(SliderCtxt);
	return (
		<div
			{...thumbPropList}
			style={thumbPropList?.style}
			className={className}
		></div>
	);
};

const SliderExport = Object.assign(Slider, {
	Slide,
	Thumb,
});

export { SliderExport as Slider };
