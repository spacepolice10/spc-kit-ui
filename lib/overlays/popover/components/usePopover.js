import { useEffect, useRef, useState } from "react";
import { useKeyboard } from "../../../interactions/keyboard/components/useKeyboard";

/**
 * @typedef usePopoverType
 * @property {'b' | 't' | 'l' | 'r'} [props.position]
 * @property {number} [props.offset]
 * @property {function} [props.onShow]
 * @property {function} [props.onHide]
 * @property {boolean} [ignoreFocusingOnHide]
 * @returns
 */

/**
 * @typedef usePopoverReturn
 * @property {popoverPropListType} popoverPropList
 * @property {popoverTriggerPropListType} popoverTriggerPropList
 * @property {RefObject<HTMLButtonElement | HTMLInputElement>} triggerRef
 * @property {function} onClick
 * @property {function} show
 * @property {function} hide
 * @property {boolean} isShow
 * @property {boolean} isInverted
 */

/**
 * @typedef popoverPropListType
 * @property {RefObject<HTMLElement>} ref
 * @property {CSSProperties} style
 * @property {function} onKeyDown
 * @returns
 */

/**
 * @typedef popoverTriggerPropListType
 * @property {RefObject<HTMLButtonElement | HTMLInputElement>} ref
 * @property {function} onClick
 * @returns
 */

/**
 *
 * @param {usePopoverType} props
 * @returns {usePopoverReturn}
 */
const usePopover = (props) => {
	const [isShow, setIsShow] = useState(false);
	const [popoverStyle, setPopoverStyle] = useState({});
	const triggerRef = useRef(null);
	const popoverRef = useRef(null);

	function show() {
		setIsShow(true);
		detectPosition();
	}
	function detectPosition() {
		const offsetNumber = props?.offset ?? 0;
		if (!triggerRef.current) return;
		if (!window) return;
		const triggerRect = triggerRef.current.getBoundingClientRect();

		const dimensions = {
			w: window.innerWidth,
			h: window.innerHeight,
		};
		const elemIsOnLeftHalf = triggerRect.x <= dimensions.w / 2;
		const elemIsOnTopHalf = triggerRect.y < dimensions.h / 2;

		let left = "auto";
		let right = "auto";
		let top = "auto";
		let bottom = "auto";

		function basePosition() {
			elemIsOnLeftHalf
				? (left = offsetNumber)
				: (right = offsetNumber);
			elemIsOnTopHalf
				? (top = triggerRect.height + offsetNumber)
				: (bottom = triggerRect.height + offsetNumber);
		}
		basePosition();

		switch (props?.position) {
			case "l": {
				left = -(triggerRect.width * 2 + offsetNumber);
				break;
			}
			case "r": {
				left = triggerRect.width + offsetNumber;
				break;
			}
			case "b": {
				top = triggerRect.height + offsetNumber;
				break;
			}
			case "t": {
				bottom = triggerRect.height * 2 + offsetNumber;
				break;
			}
			default:
				basePosition();
		}
		setPopoverStyle({
			position: "absolute",
			opacity: "0%",
		});
		setTimeout(() => {
			setPopoverStyle({
				position: "absolute",
				opacity: "100%",
				left,
				right,
				top,
				bottom,
			});
		});
	}

	function hide() {
		setPopoverStyle({});
		!props?.ignoreFocusingOnHide &&
			triggerRef.current?.focus({ preventScroll: true });
		props?.onHide?.();
		setIsShow(false);
	}
	const { keyboardPropList } = useKeyboard({
		Escape: (ev) => {
			ev.preventDefault();
			hide();
		},
	});

	const popoverPropList = {
		ref: popoverRef,
		style: popoverStyle,
		...keyboardPropList,
	};
	const popoverTriggerPropList = {
		ref: triggerRef,
		onClick: () => (isShow ? hide() : show()),
	};

	useEffect(() => {
		if (!isShow || props?.ignoreFocusingOnHide) return;
		const focusElem = popoverRef.current;
		if (!focusElem) return;
		focusElem?.focus({ preventScroll: true });
	}, [isShow]);

	useEffect(() => {
		function backgroundPushHandle(ev) {
			if (popoverRef.current?.contains(ev.target)) return;
			hide();
		}
		if (!isShow) return;
		document.addEventListener("mousedown", backgroundPushHandle);
		if (!isShow)
			document.removeEventListener(
				"mousedown",
				backgroundPushHandle
			);
	}, [isShow]);

	return {
		popoverPropList,
		popoverTriggerPropList,
		triggerRef,
		isShow,
		show,
		hide,
		isInverted:
			!!popoverStyle.bottom && popoverStyle.bottom != "auto",
	};
};

export { usePopover };
