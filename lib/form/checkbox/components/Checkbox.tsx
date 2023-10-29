import { useButtonType } from "../../../button/button";
import { Button } from "../../../button/button/components/Button";
import { elementPropListTypeComponents } from "../../../util/useElement";
import { useCheckbox, useCheckboxType } from "./useCheckbox";

type CheckboxType = useCheckboxType &
	useButtonType &
	elementPropListTypeComponents;

const Checkbox = (propList: CheckboxType) => {
	const { children, className, ...restPropList } = propList;
	const { checkboxPropList, ...restCheckboxPropList } =
		useCheckbox(restPropList);
	return (
		<>
			<Button
				{...propList}
				{...checkboxPropList}
				className={
					typeof className != "function"
						? className
						: className?.(restCheckboxPropList)
				}
				onPush={(
					ev: React.MouseEvent | React.KeyboardEvent
				) => checkboxPropList.onClick(ev)}
			>
				{typeof children != "function"
					? children
					: children?.(restCheckboxPropList)}
			</Button>
		</>
	);
};
export { Checkbox };
