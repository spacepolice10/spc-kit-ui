import { LegacyRef, forwardRef } from "react";
import { elementPropListTypeComponents } from "../../util/useElement.js";
import {
	useLongPushButton,
	useLongPushButtonType,
} from "./useLongPushButton.js";

export type ButtonType = useLongPushButtonType &
	elementPropListTypeComponents;

export const LongPushButton = forwardRef(function Button(
	propList: ButtonType,
	ref: LegacyRef<HTMLButtonElement>
) {
	const { children, className, ...restPropList } = propList;
	const { longPushButtonPropList, ...restButtonPropList } =
		useLongPushButton(restPropList);
	return (
		<button
			ref={ref}
			{...longPushButtonPropList}
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
