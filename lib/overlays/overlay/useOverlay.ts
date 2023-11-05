import {
	CSSProperties,
	RefObject,
	useEffect,
	useRef,
	useState,
} from "react";
import { useKeyboard } from "../../interactions/keyboard/useKeyboard";
import { useFocusScope } from "../../main";
import { mergeProps } from "../../util/mergeProps";

/**
 * @param isShow it is possible to control `overlay` state from its parent by passing `isShow` prop
 * @param isInitShow by default overlays are hidden until `isShow` state is changed to `true` or `OverlayTrigger` is pressed. But you can change default behavior without taking control over inner `isShow` state
 * @param hideOnBackdropPush determines if overlay should be hidden after clicking on its background. Set to be true by default
 * @param isScrollBlocking determines if it should be possible to scroll page when overlay is shown. It actually adds `overflow: hidden` to root of the DOM-tree. It is recommended to use CSS-property `has` to make overall scroll blocking system more stable
 * @param onShow callback that fires when overlay is shown
 * @param onShow callback that fires when overlay is hidden
 * @param focusingElemOnShow reference to the element which should be focused after `OverlayContent` is shown. By default overlay tries to focus first child of `OverlayContent`
 * @param focusingElemOnShow reference to the element which should be focused after `OverlayContent` is hidden. By default overlay tries to focus `OverlayTrigger`. Even though for now this prop is optional, if `isShow` is passed it is a must to provide `focusinElemOnShow`
 */
export type useOverlayType = {
	isShow?: boolean;
	isInitShow?: boolean;
	hideOnBackdropPush?: boolean;
	isScrollBlocking?: boolean;
	onShow?: () => void;
	onHide?: () => void;
	focusingElemOnShow?: RefObject<HTMLButtonElement>;
	focusingElemOnHide?: RefObject<HTMLButtonElement>;
};

type overlayBackgroundPropListType = {
	onClick: (ev: React.MouseEvent) => void;
	ref: (elem: HTMLDivElement) => void;
	onKeyDown: (ev: React.KeyboardEvent) => void;
	tabIndex?: number;
	style?: CSSProperties;
};

export type useOverlayReturnType = {
	overlayBackgroundPropList: overlayBackgroundPropListType;
	isShow: boolean;
	show: () => void;
	hide: () => void;
	triggerRef: RefObject<HTMLButtonElement>;
	overlayRef: RefObject<HTMLDivElement>;
};

/**
 * Overlay is an item that covers viewport trapping focus and user's attention. Most of developers know them as modal-windows
 */
const useOverlay = (
	propList: useOverlayType
): useOverlayReturnType => {
	const {
		onShow,
		onHide,
		hideOnBackdropPush = true,
		isScrollBlocking,
		focusingElemOnHide,
		focusingElemOnShow,
	} = propList ?? {};

	const [uncontrolledIsShow, setUncontrolledIsShow] =
		useState(propList?.isInitShow);
	const isShow = propList?.isShow ?? uncontrolledIsShow;

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
			focusingElemOnShow?.current?.focus({
				preventScroll: true,
			});
		} else {
			overlayRef.current?.focus({ preventScroll: true });
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
	const { focusScopePropList } = useFocusScope({
		isTabbingTrapped: true,
	});
	const overlayBackgroundPropList =
		mergeProps<HTMLDivElement>([
			keyboardPropList,
			focusScopePropList,
			{ ref: overlayRef },
			{
				onClick: (ev: React.MouseEvent) => {
					if (ev.target != ev.currentTarget) return;
					hideOnBackdropPush && hide();
				},
			},
		]) as unknown as overlayBackgroundPropListType;

	return {
		isShow: isShow ?? uncontrolledIsShow,
		triggerRef,
		overlayRef,
		overlayBackgroundPropList,
		show,
		hide,
	};
};

export { useOverlay };
