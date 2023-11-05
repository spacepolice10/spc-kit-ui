import {
	Children,
	ReactNode,
	RefObject,
	createContext,
	useContext,
} from "react";
import { createPortal } from "react-dom";

import {
	useButton,
	useButtonType,
} from "../../button/button";
import { pushPropListType } from "../../util/pushChildrenType";
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
	const overlayPropList = useOverlay(restPropList);
	const [button, body] = Children.toArray(children);
	return (
		<OverlayContext.Provider value={overlayPropList}>
			{propList.isShow == undefined && button}
			{overlayPropList.isShow &&
			typeof document == "object" ? (
				createPortal(
					<div
						{...overlayPropList.overlayBackgroundPropList}
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

type OverlayTriggerType = useButtonType & pushPropListType;
const OverlayTrigger = (propList: OverlayTriggerType) => {
	const { show, isShow, triggerRef } =
		useContext(OverlayContext);
	const ref: RefObject<HTMLButtonElement> = triggerRef;
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
};

type OverlayContentType = {
	children: ((hide: () => void) => ReactNode) | ReactNode;
	className?: string;
};
const OverlayContent = (props: OverlayContentType) => {
	const { className, children } = props;
	const { hide, overlayRef } = useContext(OverlayContext);
	return (
		<div ref={overlayRef} className={className}>
			{typeof children == "function"
				? children(hide)
				: children}
		</div>
	);
};

const OverlayExport = Object.assign(Overlay, {
	Trigger: OverlayTrigger,
	Content: OverlayContent,
});
export { OverlayExport as Overlay };
