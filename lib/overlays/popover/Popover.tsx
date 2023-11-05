import {
	Children,
	ReactNode,
	RefObject,
	createContext,
	useContext,
} from "react";
import {
	useButton,
	useButtonType,
} from "../../button/button";
import { pushPropListType } from "../../util/pushChildrenType";
import {
	usePopover,
	usePopoverReturnType,
	usePopoverType,
} from "./usePopover";

const PopoverContext = createContext(
	{} as usePopoverReturnType
);

type PopoverType = usePopoverType & {
	children: ReactNode[];
};

const Popover = (props: PopoverType) => {
	const { children, ...restPropList } = props;
	const popoverPropList = usePopover(restPropList);
	const [button, body] = Children.toArray(children);
	return (
		<PopoverContext.Provider value={popoverPropList}>
			<div {...popoverPropList.popoverWrapPropList}>
				{popoverPropList.isShow && (
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
				{popoverPropList.isShow && body}
			</div>
		</PopoverContext.Provider>
	);
};

type PopoverTriggerType = useButtonType & pushPropListType;
function PopoverTrigger(propList: PopoverTriggerType) {
	const { show, isShow, triggerPropList } =
		useContext(PopoverContext);
	const ref =
		triggerPropList.ref as RefObject<HTMLButtonElement>;
	const { buttonPropList } = useButton({
		...propList,
		onPush: show,
	});
	return (
		<button ref={ref} {...buttonPropList}>
			{typeof propList?.children == "function"
				? propList?.children({ isShow })
				: propList?.children}
		</button>
	);
}

type PopoverContentType = {
	children: ((hide: () => void) => ReactNode) | ReactNode;
	className?: string;
};
function PopoverContent(propList: PopoverContentType) {
	const { className, children } = propList;
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

const PopoverExport = Object.assign(Popover, {
	Trigger: PopoverTrigger,
	Content: PopoverContent,
});

export { PopoverExport as Popover };
