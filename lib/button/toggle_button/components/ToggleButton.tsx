import { LegacyRef, forwardRef } from "react";
import { ButtonType } from "../../button/components/Button";
import {
	useToggleButton,
	useToggleButtonType,
} from "./useToggleButton";

type ToggleButtonType = useToggleButtonType & ButtonType;

const ToggleButton = forwardRef(function ToggleButton(
	propList: ToggleButtonType,
	ref: LegacyRef<HTMLButtonElement>
) {
	const { children, className, ...restPropList } = propList;
	const { toggleButtonPropList, ...restButtonPropList } =
		useToggleButton(restPropList);
	return (
		<button
			className={
				typeof className != "function"
					? className
					: className?.(restButtonPropList)
			}
			{...toggleButtonPropList}
			ref={ref}
		>
			{typeof children != "function"
				? children
				: children?.(restButtonPropList)}
		</button>
	);
});

export { ToggleButton };
