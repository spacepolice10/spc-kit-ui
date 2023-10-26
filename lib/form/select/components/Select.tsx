import {
	CSSProperties,
	Children,
	ReactElement,
	ReactNode,
	cloneElement,
} from "react";
import { useButtonType } from "../../../button/button";
import { useButton } from "../../../main";
import { useSelect, useSelectType } from "./useSelect";

type SelectType<T> = useSelectType<T> & {
	children: ReactNode[];
	className?: string;
};

const Select = <
	T extends { id: string; isSelected: boolean },
>(
	propList: SelectType<T>
) => {
	const { children, className } = propList;
	const { selectPropList, select, detectIfSelected } =
		useSelect(propList);
	return (
		<div {...selectPropList} className={className}>
			{Children.toArray(children).map((item) => {
				const elem = item as ReactElement;
				return cloneElement(elem, {
					select,
					detectIfSelected,
				});
			})}
		</div>
	);
};

function SelectItem(
	propList: {
		id: string;
		children:
			| ((isSelected: boolean) => ReactNode)
			| ReactNode;
		className?: string;
		style?: CSSProperties;
		select?: (id: string) => void;
		detectIfSelected?: (id: string) => boolean;
	} & useButtonType
) {
	const {
		id,
		children,
		className,
		style,
		select,
		detectIfSelected,
	} = propList;
	const pick = () => select(id);
	const isSelected = detectIfSelected(id);
	const { buttonPropList } = useButton({
		...propList,
		onPush: pick,
	});
	return (
		<button
			style={style}
			className={className}
			{...buttonPropList}
		>
			{typeof children == "function"
				? children?.(isSelected)
				: children}
		</button>
	);
}

const select = Object.assign(Select, { Item: SelectItem });
export { select as Select };
