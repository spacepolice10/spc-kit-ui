import { LegacyRef, forwardRef } from "react";
import { elementPropListTypeComponents } from "../../util/useElement.js";
import { useButton, useButtonType } from "./useButton.js";

export type ButtonType = useButtonType &
	elementPropListTypeComponents;

const Button = forwardRef(function Button(
	propList: ButtonType,
	ref: LegacyRef<HTMLButtonElement>
) {
	const { children, className, ...restPropList } = propList;
	const { buttonPropList, ...restButtonPropList } =
		useButton(restPropList);
	return (
		<button
			ref={ref}
			{...buttonPropList}
			className={
				typeof className != "function"
					? className
					: className?.(restButtonPropList)
			}
		>
			{typeof children != "function"
				? children
				: children?.(restButtonPropList)}
		</button>
	);
});
export { Button };
