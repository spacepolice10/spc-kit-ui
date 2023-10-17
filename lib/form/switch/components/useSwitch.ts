import { useState } from "react";
import {
	useToggleButton,
	useToggleButtonType,
} from "../../../button/toggle_button/components/useToggleButton";

export type useSwitchType = useToggleButtonType & {
	isVertical?: boolean;
};

const useSwitch = (propList: useSwitchType) => {
	const { buttonPropList, isToggle, ...restButtonPropList } =
		useToggleButton({
			...propList,
			isntSemanticPushableElem: true,
		});

	const [outerWidth, setOuterWidth] = useState(0);
	const [innerWidth, setInnerWidth] = useState(0);
	const switchWrapPropList = {
		...buttonPropList,
		ref: (ref: HTMLButtonElement) => {
			if (!ref) return;
			setOuterWidth(ref?.offsetWidth);
		},
	};
	const switchPropList = {
		ref: (ref: HTMLDivElement) => {
			if (!ref) return;
			setInnerWidth(ref?.offsetWidth);
		},
		style: {
			position: "absolute",
			inset: "auto 0px",
			transform: isToggle
				? `${
						propList?.isVertical ? "translateY" : "translateX"
				  }(${outerWidth - innerWidth}px)`
				: "",
		},
	};
	return {
		isToggle,
		switchWrapPropList,
		switchPropList,
		...restButtonPropList,
	};
};

export { useSwitch };
