import {
	RefObject,
	useEffect,
	useRef,
	useState,
} from "react";
import { useKeyboard } from "../../../interactions/keyboard/components/useKeyboard";
import { eventsReturnType } from "../../../interactions/util/formEventsArgs";

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
	popoverPropList: popoverPropListType;
	triggerPropList: triggerPropListType;
	triggerRef: RefObject<HTMLButtonElement | HTMLInputElement>;
	popoverRef: RefObject<HTMLDivElement>;
	show: () => void;
	hide: () => void;
	isShow: boolean;
	isInverted: boolean;
};

export type popoverPropListType = {
	ref: RefObject<HTMLDivElement>;
	onKeyDown: (ev: React.KeyboardEvent) => void;
};

export type triggerPropListType = {
	ref: RefObject<HTMLButtonElement | HTMLInputElement>;
	onClick: (ev: eventsReturnType) => void;
};

const usePopover = (
	props: usePopoverType
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
	const popoverPropList = {
		ref: popoverRef,
		...keyboardPropList,
	};
	const triggerPropList = {
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
		const focusElem = popoverRef.current;
		if (!focusElem) return;
		focusElem?.focus({ preventScroll: true });
	}, [isShow]);
	/**
	 * this effects handles closing popover when user clicks outside. In PopoverContent component it is upgraded with invisible fix-sized `div` that prevents any unnecessary clicks outside of `popover`
	 */
	useEffect(() => {
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
			const entry = entries[0];
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
					if (entryHeight < popover.offsetHeight) {
						target.style.bottom = `${
							trigger.offsetHeight + offset
						}px`;
					}
					if (entryWidth < popover.offsetWidth) {
						target.style[side] = `-${
							popover.offsetWidth - entryWidth + offset
						}px`;
					}
				}
			}
			setTimeout(() => {
				target.style.opacity = "100%";
			}, 20);
		};
		const observer = new IntersectionObserver(callback, {
			threshold: 1,
		});
		observer.observe(popoverRef.current);
		return () => observer.disconnect();
	}, [isShow]);

	return {
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
