import {
	Children,
	MutableRefObject,
	ReactNode,
	createContext,
	useContext,
} from "react";
import {
	useTooltip,
	useTooltipReturnType,
	useTooltipType,
} from "./useTooltip";

const TooltipContext = createContext(
	{} as useTooltipReturnType
);
const useTooltipContext = () => useContext(TooltipContext);

type TooltipType = useTooltipType & {
	children: ReactNode[];
};
type TooltipTriggerType = {
	children: ReactNode;
	className?: string;
};

const Tooltip = (props: TooltipType) => {
	const { children, ...restPropList } = props;
	const tooltipPropList = useTooltip(restPropList);
	const [button, body] = Children.toArray(children);
	return (
		<div style={{ position: "relative" }}>
			<TooltipContext.Provider value={tooltipPropList}>
				{button}
				<div {...tooltipPropList.tooltipPropList}>
					{tooltipPropList.isShow && body}
				</div>
			</TooltipContext.Provider>
		</div>
	);
};

const TooltipTrigger = (propList: TooltipTriggerType) => {
	const { children, className } = propList;
	const { tooltipTriggerPropList } = useTooltipContext();
	const ref =
		tooltipTriggerPropList.ref as MutableRefObject<HTMLDivElement>;
	return (
		<div
			{...tooltipTriggerPropList}
			ref={ref}
			className={className}
		>
			{children}
		</div>
	);
};

const TooltipExport = Object.assign(Tooltip, {
	Trigger: TooltipTrigger,
});

export { TooltipExport as Tooltip };
