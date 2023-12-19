import { ReactNode } from "react";
import { ButtonType } from "../../button/button/Button";
import { useToggleButton } from "../../button/toggle_button/useToggleButton";
import { elementPropListTypeComponents } from "../../util/useElement";
import {
	useCheckboxCollection,
	useCheckboxCollectionType,
} from "./useCheckboxCollection";

export type CheckboxCollectionType<T> =
	useCheckboxCollectionType<T> & {
		children: (args: CheckboxType<T>) => ReactNode;
		className?: string;
	};

type CheckboxType<T> = T & {
	detectIfSelected: (id: string) => boolean;
	onChange: ({
		id,
		isToggle,
	}: {
		id: string;
		isToggle: boolean;
	}) => void;
} & elementPropListTypeComponents;

const CheckboxCollection = <
	T extends { id: string; isToggle: boolean },
>(
	propList: CheckboxCollectionType<T>
) => {
	const { className, children, data } = propList;
	const {
		checkboxCollectionPropList,
		onChange,
		detectIfSelected,
	} = useCheckboxCollection(propList);
	return (
		<div
			{...checkboxCollectionPropList}
			className={className}
		>
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

const Checkbox = <T extends { id: string }>(
	propList: CheckboxType<T> & ButtonType
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
			onClick={() =>
				onChange({
					id,
					isToggle: !isToggle,
				})
			}
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

const CheckboxCollectionExport = Object.assign(Checkbox, {
	Collection: CheckboxCollection,
});

export { CheckboxCollectionExport as Checkbox };
