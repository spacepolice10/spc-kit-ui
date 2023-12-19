import { CSSProperties, useState } from "react";
import {
	useToggleButton,
	useToggleButtonType,
} from "../../button/toggle_button/useToggleButton";

export type useSwitchType = useToggleButtonType & {
	isVertical: boolean;
};

export type switchChildrenPropListType = {
	ref: (ref: HTMLDivElement) => void;
	style: CSSProperties;
};

export type useSwitchReturnType = {
	isToggle: boolean;
	switchPropList;
	switchChildrenPropList: switchChildrenPropListType;
};

export const useSwitch = (
	propList: useSwitchType
): useSwitchReturnType => {
	const { toggleButtonPropList, isToggle } =
		useToggleButton(propList);
	const [outerWidth, changeOuterWidth] = useState(0);
	const [innerWidth, changeInnerWidth] = useState(0);

	const switchPropList = {
		ref: (ref: HTMLButtonElement) => {
			if (!ref) return;
			changeOuterWidth(ref?.offsetWidth);
		},
		style: {
			position: "relative",
			display: "flex",
		} as CSSProperties,

		...toggleButtonPropList,
	};
	const offset = isToggle
		? `${
				propList?.isVertical ? "translateY" : "translateX"
		  }(${outerWidth - innerWidth}px)`
		: "";

	const switchChildrenPropList = {
		ref: (ref: HTMLDivElement) => {
			if (!ref) return;
			changeInnerWidth(ref?.offsetWidth);
		},
		style: {
			transform: offset,
			position: "absolute",
			inset: "auto 0px",
		} as CSSProperties,
	};
	return {
		isToggle,
		switchPropList,
		switchChildrenPropList,
	};
};
