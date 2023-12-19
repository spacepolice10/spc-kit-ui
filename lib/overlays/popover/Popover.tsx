import {
	Children,
	ReactNode,
	RefObject,
	createContext,
	useContext,
} from "react";
import { useButtonType } from "../../button/button";
import { useButton } from "../../main";
import {
	usePopover,
	usePopoverReturnType,
	usePopoverType,
} from "./usePopover";

type PopoverType = {
	children: ReactNode[];
	className?: string;
} & usePopoverType;

type PopoverTriggerType = {
	children:
		| ReactNode
		| (({ isShow }: { isShow: boolean }) => ReactNode);
	className?: string;
} & useButtonType;

type PopoverContentType = {
	children:
		| ReactNode
		| (({ hide }: { hide: () => void }) => ReactNode);
	className?: string;
};

const PopoverContext = createContext(
	{} as usePopoverReturnType
);
const usePopoverContext = () => useContext(PopoverContext);

const Popover = (propList: PopoverType) => {
	const { children, className, ...restPropList } = propList;
	const popoverPropList = usePopover(restPropList);
	const { isShow } = popoverPropList;
	const [button, body] = Children.toArray(children);
	return (
		<PopoverContext.Provider value={popoverPropList}>
			<div className={className}>
				{isShow && (
					<div
						style={{
							position: "fixed",
							inset: 0,
							width: "100%",
							height: "100vh",
							zIndex: 9998,
							cursor: "default",
						}}
					></div>
				)}
				{button}
				{isShow && body}
			</div>
		</PopoverContext.Provider>
	);
};

const PopoverTrigger = (propList: PopoverTriggerType) => {
	const { children, className, ...restPropList } = propList;
	const { triggerRef, isShow, show, hide } =
		usePopoverContext();
	const { buttonPropList } = useButton({
		onPress: () => (isShow ? hide() : show()),
		...restPropList,
	});
	const ref =
		triggerRef as unknown as RefObject<HTMLButtonElement>;
	return (
		<button
			className={className}
			ref={ref}
			{...buttonPropList}
		>
			{typeof children == "function"
				? children({ isShow })
				: children}
		</button>
	);
};

const PopoverContent = (propList: PopoverContentType) => {
	const { children, className } = propList;
	const { popoverPropList, hide } = usePopoverContext();
	return (
		<div className={className} {...popoverPropList}>
			{typeof children == "function"
				? children({ hide })
				: children}
		</div>
	);
};

const PopoverExport = Object.assign(Popover, {
	Trigger: PopoverTrigger,
	Content: PopoverContent,
});

export { PopoverExport as Popover };
