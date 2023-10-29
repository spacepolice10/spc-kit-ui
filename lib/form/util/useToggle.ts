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
	const [controlledIsToggle, setControlledIsToggle] =
		useState(isInitToggle);
	const isToggle = propList?.isToggle ?? controlledIsToggle;
	function toggle() {
		onChange?.(!isToggle);
		setControlledIsToggle((state) => !state);
	}
	return { isToggle: propList?.isToggle ?? isToggle, toggle };
};

export { useToggle };
