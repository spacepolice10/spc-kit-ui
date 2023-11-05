import { ReactNode, createContext, useContext } from "react";
import { useFocus } from "../../../interactions/focus/useFocus";
import { useHover } from "../../../interactions/hover/useHover";
import {
	useSlider,
	useSliderReturnType,
	useSliderType,
} from "./useSlider";

export const SliderCtxt = createContext(
	{} as useSliderReturnType
);

type SliderType = useSliderType & {
	children:
		| (({ value }: { value: number }) => ReactNode)
		| ReactNode;
	className?: string;
};

const Slider = (props: SliderType) => {
	const { children, className } = props;
	const sliderPropList = useSlider(props);
	return (
		<>
			<SliderCtxt.Provider value={sliderPropList}>
				<div
					{...sliderPropList.slidePropList}
					className={className}
				>
					{typeof children != "function"
						? children
						: children?.({ value: sliderPropList.value })}
				</div>
			</SliderCtxt.Provider>
		</>
	);
};

type ThumbType = {
	children?:
		| ((args: {
				isHovered: boolean;
				isFocused: boolean;
		  }) => ReactNode)
		| ReactNode;
	className?: string;
};

const Thumb = (props: ThumbType) => {
	const { children, className } = props;
	const { thumbPropList } = useContext(SliderCtxt);
	const { isHovered, hoverPropList } = useHover();
	const { isFocused, focusPropList } = useFocus();
	return (
		<div
			{...thumbPropList}
			{...hoverPropList}
			{...focusPropList}
			style={thumbPropList?.style}
			className={className}
		>
			{typeof children != "function"
				? children
				: children?.({ isHovered, isFocused })}
		</div>
	);
};

export { Slider, Thumb };
