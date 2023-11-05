import { ReactNode } from "react";
export type useElementType = {
	name?: string;
	role?: string;
	value?: string;
	label: string;
	isDisabled?: boolean;
	isErrMsg?: boolean;
};
export type elementPropListType = {
	name?: string;
	role?: string;
	value?: string;
	label: string;
	disabled?: boolean;
	invalid: boolean;
};
export type elementChildrenType = {
	isHovered?: boolean;
	isFocused?: boolean;
	isPushed?: boolean;
	isDisabled?: boolean;
	isShow?: boolean;
	isToggle?: boolean;
};
export type elementPropListTypeComponents = {
	className?:
		| string
		| ((args: elementChildrenType) => string);
	children?:
		| ReactNode
		| ((args: elementChildrenType) => ReactNode);
};
export type useElementReturnType = {
	elemPropList: elementPropListType;
	isDisabled: boolean;
	isErrMsg: boolean;
};
const useElement = (
	propList: useElementType
): useElementReturnType => {
	const { isDisabled, isErrMsg } = propList;
	const elemPropList = {
		disabled: isDisabled,
		invalid: isErrMsg,
		...propList,
	};
	return {
		isDisabled,
		isErrMsg,
		elemPropList,
	};
};

export { useElement };
