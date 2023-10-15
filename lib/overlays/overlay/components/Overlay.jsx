import { Children, createContext, useContext } from "react";
import { useOverlay } from "./useOverlay";
import { createPortal } from "react-dom";
import { Button } from "../../../button/button/components/Button";

const OverlayContext = createContext({});

/**
 * Combination of useOverlay hook type and children passed to component
 * @typedef {import("./useOverlay").useOverlayType} useOverlayType
 * @typedef OverlayType
 * @property {string} [className]
 * @property {object} children
 */

/**
 *
 * @param {OverlayType & useOverlayType} props
 * @returns
 */
const Overlay = (props) => {
	const { children, className, ...restPropList } = props;
	const {
		isShow,
		overlayBackgroundPropList,
		...restOverlayBackgroundPropList
	} = useOverlay(restPropList);
	const [button, body] = Children.toArray(children);
	return (
		<OverlayContext.Provider
			value={restOverlayBackgroundPropList}>
			{props?.isShow == undefined && button}
			{isShow && typeof document == "object" ? (
				createPortal(
					<div
						className={className}
						{...overlayBackgroundPropList}>
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

/**
 *
 * @param {import('../../../button/button/components/Button').ButtonType} props
 * @returns
 */
function OverlayTrigger(props) {
	/**
	 * Consume properties necessary to interact with OverlayContent through context
	 * @type {import("./useOverlay").useOverlayReturn}
	 */
	const { show, triggerRef } = useContext(OverlayContext);
	return (
		<Button {...props} ref={triggerRef} onPush={show}>
			{props?.children}
		</Button>
	);
}

/**
 *
 * @param {object} props
 * @param {string} props.className
 * @param {(hide: function) => ReactNode | ReactNode} props.children
 * @returns
 */
function OverlayContent(props) {
	const { className, children } = props;
	/**
	 * Consume properties necessary to interact with OverlayContent through context
	 * @type {import("./useOverlay").useOverlayReturn}
	 */
	const { hide, overlayRef } = useContext(OverlayContext);
	return (
		<div className={className} ref={overlayRef} tabIndex={-1}>
			{typeof children == "function"
				? children(hide)
				: children}
		</div>
	);
}

export { Overlay, OverlayTrigger, OverlayContent };
