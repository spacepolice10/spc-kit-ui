import {
	Children,
	ReactNode,
	RefObject,
	createContext,
	useContext,
} from "react";
import {
	usePopover,
	usePopoverReturnType,
	usePopoverType,
} from "./usePopover";
import {
	Button,
	ButtonType,
	buttonChildrenType,
} from "../../../button/button/components/Button";

const PopoverContext = createContext(
	{} as usePopoverReturnType
);

type PopoverType = usePopoverType & {
	children: ReactNode[];
};

const Popover = (props: PopoverType) => {
	const { children, ...restPropList } = props;
	const popoverProList = usePopover(restPropList);
	const [button, body] = Children.toArray(children);
	return (
		<PopoverContext.Provider value={popoverProList}>
			<div
				style={{
					position: "relative",
					height: "fit-content",
					width: "fit-content",
					zIndex: 1,
				}}
			>
				{popoverProList.isShow && (
					<div
						style={{
							position: "fixed",
							inset: 0,
							width: "100%",
							height: "100vh",
							background: "none",
							cursor: "default",
						}}
					></div>
				)}
				{button}
				{popoverProList.isShow && body}
			</div>
		</PopoverContext.Provider>
	);
};

type PopoverTriggerType = ButtonType & {
	children:
		| ((args: buttonChildrenType) => ReactNode)
		| ReactNode;
	className: string | ((args: buttonChildrenType) => string);
};
function PopoverTrigger(props: PopoverTriggerType) {
	/**
	 * Consume properties necessary to interact with PopoverTrigger through context
	 */
	const { isShow, triggerPropList } =
		useContext(PopoverContext);
	const triggerRef =
		triggerPropList.ref as RefObject<HTMLButtonElement>;
	console.log(triggerPropList);
	console.log(triggerPropList.onClick);
	return (
		<Button
			{...props}
			ref={triggerRef}
			className={(args: buttonChildrenType) =>
				typeof props.className != "function"
					? props.className
					: props.className({ ...args, isShow })
			}
			onPush={triggerPropList.onClick}
		>
			{(args: buttonChildrenType) =>
				typeof props.children != "function"
					? props?.children
					: props?.children({ ...args, isShow })
			}
		</Button>
	);
}

type PopoverContentType = {
	children: ((hide: () => void) => ReactNode) | ReactNode;
	className: string;
};
function PopoverContent(props: PopoverContentType) {
	const { className, children } = props;
	/**
	 * Consume properties necessary to interact with PopoverContent through context
	 */
	const { hide, popoverPropList } =
		useContext(PopoverContext);
	return (
		<div {...popoverPropList} className={className}>
			{typeof children == "function"
				? children(hide)
				: children}
		</div>
	);
}

export { Popover, PopoverTrigger, PopoverContent };
