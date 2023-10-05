import { Children, createContext, useContext } from "react";
import { usePopover } from "./usePopover";
import { Button } from "../../../button/button/components/Button";

const PopoverContext = createContext({});

/**
 * Combination of usePopover hook type and children passed to component
 * @typedef PopoverType
 * @type {import('./usePopover').usePopoverType & {children: ReactNode[]}}
 */

/**
 *
 * @param {PopoverType} props
 * @returns
 */
const Popover = (props) => {
	const { children, ...restPropList } = props;
	const { isShow, ...restPopoverPropList } =
		usePopover(restPropList);
	const [button, body] = Children.toArray(children);
	return (
		<PopoverContext.Provider value={restPopoverPropList}>
			<div style={{ position: "relative" }}>
				{isShow && (
					<div
						style={{
							position: "fixed",
							inset: 0,
							width: "100%",
							height: "100vh",
							background: "none",
							cursor: "default",
						}}></div>
				)}
				{button}
				{isShow && body}
			</div>
		</PopoverContext.Provider>
	);
};

/**
 *
 * @param {import('../../../button/button/components/Button').ButtonType &
 * {children: ((isShow: boolean) => ReactNode) | ReactNode}} props
 */
function PopoverTrigger(props) {
	/**
	 * Consume properties necessary to interact with PopoverTrigger through context
	 * @type {import("./usePopover").usePopoverReturn}
	 */
	const { isShow, triggerRef, popoverTriggerPropList } =
		useContext(PopoverContext);
	const ref = triggerRef;
	return (
		<Button
			{...props}
			ref={ref}
			onPush={() => popoverTriggerPropList.onClick()}>
			{typeof props.children == "function"
				? props?.children(isShow ?? false)
				: props?.children}
		</Button>
	);
}

/**
 *
 * @param {object} props
 * @param {string} props.className
 * @param {((hide: () => void) => ReactNode) | ReactNode} props.children
 */
function PopoverContent(props) {
	const { className, children } = props;
	/**
	 * Consume properties necessary to interact with PopoverContent through context
	 * @type {import("./usePopover").usePopoverReturn}
	 */
	const { hide, popoverPropList } = useContext(PopoverContext);
	return (
		<div {...popoverPropList} className={className}>
			{typeof children == "function" ? children(hide) : children}
		</div>
	);
}

export { Popover, PopoverTrigger, PopoverContent };
