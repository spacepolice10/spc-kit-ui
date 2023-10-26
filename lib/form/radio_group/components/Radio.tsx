import { ButtonType } from "../../../button/button/components/Button";
import { eventsReturnType } from "../../../interactions/util/formMouseEventArgs";
import { Button } from "../../../main";
import { useRadio, useRadioType } from "./useRadio";

type RadioType = useRadioType & ButtonType;
const Radio = (propList: RadioType) => {
	const { children, className, ...restPropList } = propList;
	const { radioPropList, ...restRadioPropList } =
		useRadio(restPropList);
	return (
		<Button
			{...propList}
			className={
				typeof className != "function"
					? className
					: className?.(restRadioPropList)
			}
			{...radioPropList}
			onPush={(returnEventsData: eventsReturnType) =>
				radioPropList.onClick(returnEventsData.ev)
			}
		>
			{typeof children != "function"
				? children
				: children?.(restRadioPropList)}
		</Button>
	);
};

export { Radio };
