import { LegacyRef, forwardRef } from "react";
import { elementPropListTypeComponents } from "../../util/useElement";
import { useButtonType } from "../button";
import {
	useToggleButton,
	useToggleButtonType,
} from "./useToggleButton";

export type ToggleButtonType = useToggleButtonType &
	useButtonType &
	elementPropListTypeComponents;

const ToggleButton = forwardRef(function ToggleButton(
	propList: ToggleButtonType,
	ref: LegacyRef<HTMLButtonElement>
) {
	const { children, className, ...restPropList } = propList;
	const { toggleButtonPropList, ...restButtonPropList } =
		useToggleButton(restPropList);
	return (
		<button
			{...toggleButtonPropList}
			ref={ref}
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

export { ToggleButton };
