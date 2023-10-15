import { useEffect, useRef, useState } from "react";
import { useKeyboard } from "../../../interactions/keyboard/components/useKeyboard";

/**
 * Overlay is an item that covers viewport trapping focus and user's attention. Most of developers know them as modal-windows
 * @typedef {object} useOverlayType
 * @property {boolean} [isShow]
 * @property {boolean} [isInitShow]
 * @property {boolean} [hideOnBackdropPush = true]
 * @property {boolean} [isScrollBlocking = false]
 * @property {() => void} [onShow]
 * @property {() => void} [onHide]
 * @property {RefObject<HTMLButtonElement>} [focusingElemOnShow]
 * @property {RefObject<HTMLButtonElement>} [focusingElemOnHide]
 * @returns
 */

/**
 * Return type of useOverlay hook. Often used when building components with React.Context
 * @typedef useOverlayReturnType
 * @property {overlayBackgroundPropListType}
 * @property {boolean} isShow
 * @property {function} show
 * @property {function} hide
 * @property {RefObject<HTMLButtonElement>} triggerRef
 * @property {RefObject<HTMLElement>} overlayRef
 */

/**
 * Innter typing for propList returned by hook to compose interface elements
 * @typedef overlayBackgroundPropListType
 * @property {function} onClick
 * @property {function} onKeyDown
 */

/**
 * Overlay is an item that covers viewport trapping focus and user's attention. Most of developers know them as modal-windows
 * @param {...useOverlayType} props
 * @returns {useOverlayReturnType}
 */
const useOverlay = (props) => {
	const {
		onShow,
		onHide,
		hideOnBackdropPush = true,
		isScrollBlocking,
		focusingElemOnHide,
		focusingElemOnShow,
	} = props ?? {};

	const [uncontrolledIsShow, setUncontrolledIsShow] =
		useState(props?.isInitShow);
	const isShow = props?.isShow ?? uncontrolledIsShow;

	const overlayRef = useRef(null);
	const triggerRef = useRef(null);

	const { keyboardPropList } = useKeyboard({
		Escape: () => hide(),
	});
	function show() {
		setUncontrolledIsShow(true);
		onShow?.();
	}
	function hide() {
		if (!focusingElemOnHide?.current) {
			triggerRef.current?.focus({ preventScroll: true });
		} else {
			focusingElemOnHide.current?.focus({
				preventScroll: true,
			});
		}
		setUncontrolledIsShow(false);
		onHide?.();
	}

	useEffect(() => {
		if (!isShow) return;
		if (focusingElemOnShow) {
			focusingElemOnShow?.current?.focus();
		} else {
			overlayRef.current?.focus();
		}
	}, [isShow]);
	useEffect(() => {
		if (!isShow || !isScrollBlocking) return;
		const html = document.querySelector("html");
		if (!html) return;
		html.style.overflow = "hidden";
		return () => {
			html.style.overflow = "auto";
		};
	}, [isShow]);

	const overlayBackgroundPropList = {
		onClick: (ev) => {
			if (ev.target != ev.currentTarget) return;
			hideOnBackdropPush && hide();
		},
		...keyboardPropList,
	};

	return {
		isShow: isShow ?? uncontrolledIsShow,
		overlayBackgroundPropList,
		show,
		hide,
		triggerRef,
		overlayRef,
	};
};

export { useOverlay };
