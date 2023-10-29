import { ReactNode } from "react";

export type pushChildrenType = {
	isHovered?: boolean;
	isFocused?: boolean;
	isPushed?: boolean;
	isDisabled?: boolean;
	isShow?: boolean;
	isToggle?: boolean;
};

export type pushPropListType = {
	className?:
		| string
		| ((args: pushChildrenType) => ReactNode);
	children?:
		| ReactNode
		| ((args: pushChildrenType) => ReactNode);
};
