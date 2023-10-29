import {
	CSSProperties,
	MutableRefObject,
	RefObject,
	useEffect,
	useRef,
	useState,
} from "react";
import { useKeyboard } from "../../../interactions/keyboard/components/useKeyboard";
import { useFocusScope } from "../../../main";
import { mergeProps } from "../../../util/mergeProps";

/**
 * @todo add option to make overlay `fixed`. It might be called `isOverflow`
 */

export type usePopoverType = {
	isOverflow?: boolean;
	side?: "left" | "right";
	offset?: number;
	isIgnoreFocusingOnHide?: boolean;
	onShow?: () => void;
	onHide?: () => void;
};

export type usePopoverReturnType = {
	popoverWrapPropList: popoverWrapPropListType;
	popoverPropList: popoverPropListType;
	triggerPropList: triggerPropListType;
	triggerRef: RefObject<HTMLButtonElement | HTMLInputElement>;
	popoverRef: RefObject<HTMLDivElement>;
	show: () => void;
	hide: () => void;
	isShow: boolean;
	isInverted: boolean;
};

export type popoverWrapPropListType = {
	style: CSSProperties;
};
export type popoverPropListType = {
	onKeyDown?: (ev: React.KeyboardEvent) => void;
	ref?: MutableRefObject<HTMLDivElement>;
	tabIndex?: number;
	style?: CSSProperties;
};

export type triggerPropListType = {
	ref: RefObject<HTMLButtonElement | HTMLInputElement>;
	onClick: (ev: React.MouseEvent) => void;
};

const usePopover = (
	props?: usePopoverType
): usePopoverReturnType => {
	const {
		isOverflow = false,
		side = "left",
		offset = 0,
		onHide,
		isIgnoreFocusingOnHide,
	} = props ?? {};
	const [isShow, setIsShow] = useState(false);
	/** reference to elem that opens `popover` */
	const triggerRef = useRef<
		HTMLButtonElement | HTMLInputElement
	>(null);
	/** reference to `popover` elem */
	const popoverRef = useRef<HTMLDivElement>(null);
	const show = () => setIsShow(true);
	const hide = () => {
		onHide?.();
		setIsShow(false);
		if (isIgnoreFocusingOnHide) return;
		triggerRef.current?.focus({ preventScroll: true });
	};
	/** keyboard controls (closing popover by clicking on escape) */
	const { keyboardPropList } = useKeyboard({
		Escape: (ev) => {
			ev.preventDefault();
			hide();
		},
	});

	const { focusScopePropList } = useFocusScope({
		isTabbingTrapped: true,
	});
	const popoverWrapPropList = {
		style: {
			position: "relative",
			height: "fit-content",
			width: "fit-content",
			margin: "auto",
		} as CSSProperties,
	};
	const popoverPropList = mergeProps<HTMLDivElement>([
		focusScopePropList,
		keyboardPropList,
		{ ref: popoverRef },
	]);

	const triggerPropList = {
		"aria-describedby": "Popover",
		"aria-haspopup": true,
		ref: triggerRef,
		onClick: () => (isShow ? hide() : show()),
	};
	/** check computed styles to detect if popover is shows itself on top of trigger/anchor */
	const isInverted =
		!!popoverRef.current?.style.bottom &&
		popoverRef.current?.style.bottom != "auto";

	/**
	 * this effect helps to find an elem to focus on when popover is open. It is necessary to provide keyboard control when popover is in sight
	 */
	useEffect(() => {
		if (!isShow || isIgnoreFocusingOnHide) return;
		popoverRef.current?.focus({ preventScroll: true });
	}, [isShow]);
	/**
	 * this effects handles closing popover when user clicks outside. In PopoverContent component it is upgraded with invisible fix-sized `div` that prevents any unnecessary clicsks outside of `popover`
	 */
	useEffect(() => {
		if (!isShow) return;
		function backgroundPushHandle(ev: PointerEvent) {
			const target = ev.target as HTMLElement;

			if (!popoverRef.current) return;
			if (popoverRef.current?.contains(target)) return;
			hide();
		}
		document.addEventListener(
			"pointerdown",
			backgroundPushHandle
		);
		return () =>
			document.removeEventListener(
				"pointerup",
				backgroundPushHandle
			);
	}, [isShow]);
	/**
	 * this effect calculates and imperatively sets the position of popover. It is important to use pure JS and imperative model here so we are not provoking rerenders before the correct position of elements are set. In any other case `IntersectionObserver` will generate unpleasant flickers
	 */
	useEffect(() => {
		if (!isShow) return;
		const popover = popoverRef.current;
		const trigger = triggerRef.current;

		if (!popover || !trigger) return;
		popover.style[side] = `${offset}px`;
		popover.style.position = isOverflow
			? "fixed"
			: "absolute";
		popover.style.opacity = "0%";
		popover.style.margin = "auto";
		const callback = function (
			entries: IntersectionObserverEntry[]
		) {
			const entry = entries[0] as IntersectionObserverEntry;
			const entryHeight = entry.intersectionRect.height;
			const entryWidth = entry.intersectionRect.width;
			const target = entry.target as HTMLElement;
			if (isOverflow) {
				const triggerRect = trigger.getBoundingClientRect();
				target.style.left = `${
					triggerRect.left + trigger.offsetWidth
				}px`;
				target.style.top = `${
					triggerRect.top + trigger.offsetHeight
				}px`;
			} else {
				if (!entry.isIntersecting) {
					if (entryHeight < popover.clientHeight) {
						target.style.bottom = `${
							trigger.clientHeight + offset
						}px`;
					}
					if (entryWidth < popover.offsetWidth) {
						target.style[side] = `-${
							popover.clientWidth - entryWidth + offset
						}px`;
					}
				}
			}
			setTimeout(() => {
				target.style.opacity = "100%";
			}, 0);
		};
		const observer = new IntersectionObserver(callback, {
			threshold: 1,
		});
		observer.observe(popoverRef.current);
		return () => observer.disconnect();
	}, [isShow]);

	return {
		popoverWrapPropList,
		popoverPropList,
		triggerPropList,
		triggerRef,
		popoverRef,
		isShow,
		isInverted,
		show,
		hide,
	};
};

export { usePopover };
