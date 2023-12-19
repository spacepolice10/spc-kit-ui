import { CSSProperties, ReactNode } from "react";
export type useElementType = {
	name?: string;
	role?: string;
	value?: string;
	label: string;
};
export type elementPropListType = {
	name?: string;
	role?: string;
	value?: string;
	label: string;
};
export type elementChildrenType = {
	isHovered?: boolean;
	isFocused?: boolean;
	isPressed?: boolean;
	isDisabled?: boolean;
	isShow?: boolean;
	isToggle?: boolean;
};
export type elementPropListTypeComponents = {
	id?: string;
	style?: CSSProperties;
	className?:
		| string
		| ((args: elementChildrenType) => string);
	children?:
		| ReactNode
		| ((args: elementChildrenType) => ReactNode);
};
export type useElementReturnType = {
	elemPropList: elementPropListType;
};
const useElement = (
	propList: useElementType
): useElementReturnType => {
	return {
		elemPropList: propList,
	};
};

export { useElement };
