import { Children, ReactNode, useContext } from "react";
import {
	TooltipContext,
	useTooltip,
	useTooltipType,
} from "./useTooltip";

type TooltipType = useTooltipType & {
	children: ReactNode[];
};

const Tooltip = (props: TooltipType) => {
	const { children, ...restPropList } = props;
	const { tooltipPropList, tooltipTriggerPropList, isShow } =
		useTooltip(restPropList);

	const [button, body] = Children.toArray(children);
	return (
		<div style={{ position: "relative" }}>
			<TooltipContext.Provider value={tooltipTriggerPropList}>
				{button}
				<div {...tooltipPropList}>{isShow && body}</div>
			</TooltipContext.Provider>
		</div>
	);
};

/**
 *
 * @param {import('../../../button/button/components/Button').ButtonType
 * &
 * {children: ((isShow: boolean) => ReactNode) | ReactNode}} props
 * @returns
 */
const TooltipTrigger = (props) => {
	/**
	 * Consume properties necessary to interact with PopoverTrigger through context
	 * @type {{
	 * show: () => void,
	 * isShow: boolean,
	 * triggerRef: import('react').RefObject
	 * }}
	 */
	const tooltipTriggerPropList = useContext(TooltipContext);
	return (
		<div {...tooltipTriggerPropList}>{props.children}</div>
		// <Button {...props} ref={ref} onHover={show}>
		//   {typeof props.children == 'function'
		//     ? props?.children(isShow ?? false)
		//     : props?.children}
		// </Button>
	);
};

export { Tooltip, TooltipTrigger };
