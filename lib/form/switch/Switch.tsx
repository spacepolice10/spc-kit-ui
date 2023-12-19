import { ReactNode, createContext, useContext } from "react";
import { elementPropListTypeComponents } from "../../util/useElement";
import {
	switchChildrenPropListType,
	useSwitch,
	useSwitchType,
} from "./useSwitch";

const SwitchCtxt = createContext(
	{} as switchChildrenPropListType
);
const useSwitchCtxt = () => useContext(SwitchCtxt);

type SwitchType = useSwitchType &
	elementPropListTypeComponents;
type SwitchChildrenType = {
	className?: string;
	children: ReactNode;
};

const Switch = (propList: SwitchType) => {
	const { children, className } = propList;
	const { isToggle, switchPropList, switchChildrenPropList } =
		useSwitch(propList);
	return (
		<SwitchCtxt.Provider value={switchChildrenPropList}>
			<button
				{...switchPropList}
				style={{ position: "relative", display: "flex" }}
				className={
					typeof className != "function"
						? className
						: className?.({ isToggle })
				}
			>
				{typeof children != "function"
					? children
					: children?.({ isToggle })}
			</button>
		</SwitchCtxt.Provider>
	);
};

const SwitchChildren = (propList: SwitchChildrenType) => {
	const { className, children } = propList;
	const switchChildrenPropList = useSwitchCtxt();
	return (
		<div {...switchChildrenPropList} className={className}>
			{children}
		</div>
	);
};

const SwitchExport = Object.assign(Switch, {
	Children: SwitchChildren,
});

export { SwitchExport as Switch };
