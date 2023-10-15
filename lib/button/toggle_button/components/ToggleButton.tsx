import { LegacyRef, forwardRef } from "react";
import {
	useToggleButton,
	useToggleButtonType,
} from "./useToggleButton";
import { ButtonType } from "../../button/components/Button";

type ToggleButtonType = useToggleButtonType & ButtonType;

const ToggleButton = forwardRef(function ToggleButton(
	propList: ToggleButtonType,
	ref: LegacyRef<HTMLButtonElement>
) {
	const { children, className, ...restPropList } = propList;
	const { buttonPropList, ...restButtonPropList } =
		useToggleButton(restPropList);
	return (
		<button
			className={
				typeof className != "function"
					? className
					: className?.(restButtonPropList)
			}
			{...buttonPropList}
			ref={ref}>
			{typeof children != "function"
				? children
				: children?.(restButtonPropList)}
		</button>
	);
});

export { ToggleButton };
