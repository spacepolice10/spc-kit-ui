import {
	Button,
	ButtonType,
} from "../../../button/button/components/Button";
import { eventsReturnType } from "../../../interactions/util/formMouseEventArgs";
import { useCheckbox, useCheckboxType } from "./useCheckbox";

type CheckboxType = useCheckboxType & ButtonType;

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
				onPush={(returnEventsData: eventsReturnType) =>
					checkboxPropList.onClick(returnEventsData.ev)
				}
			>
				{typeof children != "function"
					? children
					: children?.(restCheckboxPropList)}
			</Button>
		</>
	);
};
export { Checkbox };
