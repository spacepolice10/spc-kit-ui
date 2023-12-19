import { useState } from "react";

export type useToggleType = {
	isToggle?: boolean;
	isInitToggle?: boolean;
	onChange?: (args: boolean) => void;
	isDisabled?: boolean;
};

type useToggleReturnType = {
	isToggle: boolean;
	toggle: () => void;
};

const useToggle = (
	propList: useToggleType
): useToggleReturnType => {
	const { isInitToggle, onChange } = propList;
	const [uncontrolledIsToggle, changeUncontrolledIsToggle] =
		useState(isInitToggle);
	const IS_TOGGLE =
		propList?.isToggle ?? uncontrolledIsToggle;
	function toggle() {
		onChange?.(!IS_TOGGLE);
		changeUncontrolledIsToggle((state) => !state);
	}
	return {
		isToggle: IS_TOGGLE,
		toggle,
	};
};

export { useToggle };
