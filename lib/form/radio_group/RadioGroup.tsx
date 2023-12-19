import { ReactNode } from "react";
import { ButtonType } from "../../button/button/Button";
import { useToggleButton } from "../../button/toggle_button/useToggleButton";
import { elementPropListTypeComponents } from "../../util/useElement";
import {
	useRadioGroup,
	useRadioGroupType,
} from "./useRadioGroup";

export type RadioGroupType<T> = useRadioGroupType<T> & {
	children: (args: RadioType<T>) => ReactNode;
	className?: string;
};
type RadioType<T> = T & {
	detectIfSelected: (id: string) => boolean;
	onChange: (id: string) => void;
} & elementPropListTypeComponents;

const RadioGroup = <T extends { id: string }>(
	propList: RadioGroupType<T>
) => {
	const { children, className, data } = propList;
	const { radioGroupPropList, onChange, detectIfSelected } =
		useRadioGroup<T>(propList);
	return (
		<div {...radioGroupPropList} className={className}>
			{data.map(
				(item) =>
					typeof children == "function" &&
					children({
						onChange,
						detectIfSelected,
						...item,
					})
			)}
		</div>
	);
};

const Radio = <T extends { id: string }>(
	propList: RadioType<T> & ButtonType
) => {
	const {
		id,
		onChange,
		detectIfSelected,
		children,
		className,
		...restPropList
	} = propList;
	const isToggle = detectIfSelected(id);
	const { toggleButtonPropList } = useToggleButton({
		isToggle,
		...restPropList,
	});
	return (
		<button
			{...toggleButtonPropList}
			onClick={() => onChange(id)}
			className={
				typeof className == "function"
					? className({ isToggle })
					: className
			}
		>
			{typeof children == "function"
				? children({ isToggle })
				: children}
		</button>
	);
};

const RadioGroupExport = Object.assign(Radio, {
	Group: RadioGroup,
});

export { RadioGroupExport as Radio };
