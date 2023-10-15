import { LegacyRef, ReactNode, forwardRef } from "react";
import { useButton, useButtonType } from "./useButton.js";

export type ButtonType = useButtonType & {
	className?: ((args: buttonChildrenType) => string) | string;
	children:
		| ((args: buttonChildrenType) => ReactNode)
		| ReactNode;
};

export type buttonChildrenType = {
	isHovered?: boolean;
	isFocused?: boolean;
	isPushed?: boolean;
	isDisabled?: boolean;
	isShow?: boolean;
	isToggle?: boolean;
};

const Button = forwardRef(function Button(
	props: ButtonType,
	ref: LegacyRef<HTMLButtonElement>
) {
	const { children, className, ...restPropList } = props;
	const { buttonPropList, ...restButtonPropList } =
		useButton(restPropList);
	return (
		<button
			className={
				typeof className != "function"
					? className
					: className?.(restButtonPropList)
			}
			{...buttonPropList}
			ref={ref}
		>
			{typeof children != "function"
				? children
				: children?.(restButtonPropList)}
		</button>
	);
});
export { Button };
