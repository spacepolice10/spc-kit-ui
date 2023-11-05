import { createContext, useContext } from "react";
import { ButtonType } from "../../../button/button/Button";
import { useSwitch, useSwitchType } from "./useSwitch";

const SwitchCtxt = createContext({});

type SwitchType = useSwitchType & ButtonType;

const Switch = (propList: SwitchType) => {
	const { children, className, ...restPropList } = propList;
	const {
		switchWrapPropList,
		switchPropList,
		...restSwitchPropList
	} = useSwitch(restPropList);
	return (
		<SwitchCtxt.Provider value={switchPropList}>
			<button
				{...switchWrapPropList}
				style={{ position: "relative", display: "flex" }}
				className={
					typeof className != "function"
						? className
						: className?.(restSwitchPropList)
				}
			>
				{typeof children != "function"
					? children
					: children?.(restSwitchPropList)}
			</button>
		</SwitchCtxt.Provider>
	);
};

const SwitchBody = (propList) => {
	const switchPropList = useContext(SwitchCtxt);
	return (
		<div
			{...switchPropList}
			className={propList.className}
		></div>
	);
};

export { Switch, SwitchBody };
