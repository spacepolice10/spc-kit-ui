import {
	Children,
	ReactNode,
	RefObject,
	createContext,
	useContext,
} from "react";
import { createPortal } from "react-dom";

import {
	buttonChildrenType,
	useButton,
	useButtonType,
} from "../../../button/button";
import {
	useOverlay,
	useOverlayReturnType,
	useOverlayType,
} from "./useOverlay";

const OverlayContext = createContext(
	{} as useOverlayReturnType
);

type OverlayType = useOverlayType & {
	className?: string;
	children: ReactNode[];
};

const Overlay = (propList: OverlayType) => {
	const { children, className, ...restPropList } = propList;
	const {
		isShow,
		overlayBackgroundPropList,
		...restOverlayBackgroundPropList
	} = useOverlay(restPropList);
	const [button, body] = Children.toArray(children);
	return (
		<OverlayContext.Provider
			value={{
				isShow,
				overlayBackgroundPropList,
				...restOverlayBackgroundPropList,
			}}
		>
			{propList.isShow == undefined && button}
			{isShow && typeof document == "object" ? (
				createPortal(
					<div
						{...overlayBackgroundPropList}
						className={className}
					>
						{body ?? button}
					</div>,
					document.body
				)
			) : (
				<></>
			)}
		</OverlayContext.Provider>
	);
};

type OverlayTriggerType = useButtonType & {
	children:
		| ((args: buttonChildrenType) => ReactNode)
		| ReactNode;
	className: string | ((args: buttonChildrenType) => string);
};
function OverlayTrigger(propList: OverlayTriggerType) {
	const { show, isShow, triggerRef } =
		useContext(OverlayContext);
	const tr = triggerRef as RefObject<HTMLButtonElement>;
	const { buttonPropList } = useButton({
		...propList,
		onPush: show,
	});
	return (
		<button ref={tr} {...buttonPropList}>
			{typeof propList?.children == "function"
				? propList?.children({ isShow })
				: propList?.children}
		</button>
	);
}

type OverlayContentType = {
	children: ((hide: () => void) => ReactNode) | ReactNode;
	className: string;
};
function OverlayContent(props: OverlayContentType) {
	const { className, children } = props;
	const { hide, overlayRef } = useContext(OverlayContext);
	return (
		<div ref={overlayRef} className={className} tabIndex={-1}>
			{typeof children == "function"
				? children(hide)
				: children}
		</div>
	);
}

const OverlayExport = Object.assign(Overlay, {
	Trigger: OverlayTrigger,
	Content: OverlayContent,
});
export { OverlayExport as Overlay };
