import { useState } from "react";

/**
 * Propgramatically handle hovering elements with states change and preventing hovering on touch device. IT DOESN'T PREVENT BASIC CSS `hover` pseudo-classes from working
 * @param onHover fires when user hovers with pointer above element (actually `onMouseEnter`)
 * @param onHoverLoose fires when user hovers with pointer above element (actually `onMouseLeave`)
 */
export type useHoverType = {
	onHover?: () => void;
	onHoverLoose?: () => void;
};
export type hoverPropListType = {
	onMouseEnter: () => void;
	onMouseLeave: () => void;
};
export type useHoverReturnType = {
	isHovered: boolean;
	hoverPropList: hoverPropListType;
};

const useHover = (
	props?: useHoverType
): useHoverReturnType => {
	const { onHover, onHoverLoose } = props ?? {};
	const [isHovered, setIsHovered] = useState(false);
	const hoverPropList = {
		tabIndex: 0,
		onMouseEnter: () => {
			if (matchMedia("(pointer:coarse)").matches) return;
			setIsHovered(true);
			onHover?.();
		},
		onMouseLeave: () => {
			setIsHovered(false);
			onHoverLoose?.();
		},
	};
	return {
		isHovered,
		hoverPropList,
	};
};

export { useHover };
