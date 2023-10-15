import { useState } from "react";

/**
 * Propgramatically handle focusing elements. IT DOESN'T PREVENT BASIC CSS `hover` pseudo-classes from working
 * @param onFocus fires when user focuses on element (actually `onFocus`)
 * @param onHoverLoose fires when user focuses out from element (actually `onBlur`)
 */
export type useFocusType = {
	onFocus?: () => void;
	onFocusLoose?: () => void;
};

export type focusPropListType = {
	onFocus: () => void;
	onBlur: () => void;
};

export type useFocusReturnType = {
	isFocused: boolean;
	focusPropList: focusPropListType;
};

const useFocus = (
	props?: useFocusType
): useFocusReturnType => {
	const { onFocus, onFocusLoose } = props ?? {};
	const [isFocused, setIsFocused] = useState(false);
	const focusPropList = {
		tabIndex: 0,
		onFocus: () => {
			setIsFocused(true);
			onFocus?.();
		},
		onBlur: () => {
			setIsFocused(false);
			onFocusLoose?.();
		},
	};
	return {
		isFocused,
		focusPropList,
	};
};

export { useFocus };
