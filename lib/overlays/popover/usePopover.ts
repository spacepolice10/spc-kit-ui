import {
	KeyboardEventHandler,
	MutableRefObject,
	RefObject,
	useEffect,
	useRef,
	useState,
} from "react";
import {
	useFocusScope,
	useKeyboard,
} from "../../interactions";
import { mergeProps } from "../../util/mergeProps";

export type usePopoverType = {
	isShow?: boolean;
	isOverflowed?: boolean;
	axisX?: "L" | "R";
	axisY?: "T" | "B";
	isInverted?: boolean;
	ignoreFocusingOnHide?: boolean;
	onShow?: () => void;
	onHide?: () => void;
	onBeforeShow?: () => void;
	onAfterShow?: () => void;
	onBeforeHide?: () => void;
	onAfterHide?: () => void;
};

export type popoverPropListType = {
	ref?: MutableRefObject<HTMLDivElement>;
	onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
};

export type usePopoverReturnType = {
	triggerRef: RefObject<HTMLButtonElement | HTMLInputElement>;
	popoverPropList: popoverPropListType;
	isShow: boolean;
	isInverted: boolean;
	show: () => void;
	hide: () => void;
};

export const usePopover = (
	propList?: usePopoverType
): usePopoverReturnType => {
	const [uncontrolledIsShow, changeUncontrolledIsShow] =
		useState(false);
	const IS_SHOW = propList?.isShow ?? uncontrolledIsShow;

	const triggerRef = useRef<
		HTMLButtonElement | HTMLInputElement
	>(null);
	const popoverRef = useRef<HTMLDivElement>(null);

	const {
		onShow,
		onHide,
		ignoreFocusingOnHide,
		axisX,
		axisY,
		isOverflowed,
	} = propList;
	const show = () => {
		changeUncontrolledIsShow(true);
		onShow?.();
	};
	const hide = () => {
		changeUncontrolledIsShow(false);
		onHide?.();
	};

	useEffect(() => {
		function destroyOnVisibilityNone() {
			hide();
		}
	}, [IS_SHOW]);
	useEffect(() => {
		if (IS_SHOW) {
			const elemToMakeActive =
				popoverRef?.current as HTMLDivElement;
			elemToMakeActive?.focus({
				preventScroll: true,
			});
		} else {
			if (ignoreFocusingOnHide) return;
			const elemToMakeActive =
				triggerRef.current as HTMLDivElement;
			elemToMakeActive?.focus({
				preventScroll: true,
			});
		}
	}, [IS_SHOW]);

	useEffect(() => {
		const body = popoverRef.current;
		const anchor = triggerRef.current;
		if (!body || !IS_SHOW) return;
		body.style.opacity = "0%";
		body.style.zIndex = "9999";
		const observer = new IntersectionObserver(
			(entries, observer) => {
				const entry = entries[0] as IntersectionObserverEntry;
				const target = entry.target as HTMLElement;
				const anchorRect = anchor?.getBoundingClientRect();
				const bodyRect = body?.getBoundingClientRect();
				const intersectionRectH =
					entry.intersectionRect.height;
				const intersectionRectW =
					entry.intersectionRect.width;
				const h =
					entry.boundingClientRect.height +
					entry.boundingClientRect.top -
					document.body?.offsetHeight;
				const w =
					entry.boundingClientRect.width +
					entry.boundingClientRect.left -
					document.body?.offsetWidth;
				const directionX = { L: "left", R: "right" };
				const directionY = { T: "top", B: "bottom" };
				const horizontal = directionX?.[propList?.axisX];
				const vertical = directionY?.[propList?.axisY];
				if (isOverflowed) {
					target.style.left = `${
						anchorRect.left -
						(axisX == "R"
							? bodyRect.width - anchorRect.width
							: 0)
					}px`;
					target.style.top = `${
						anchorRect.y +
						anchorRect.height -
						(axisY == "T"
							? bodyRect.height + anchorRect.height
							: 0)
					}px`;
				}
				if (!isOverflowed) {
					if (horizontal != undefined) {
						body.style[horizontal] = `${
							anchor.clientWidth / 2
						}px`;
					}
					if (vertical != undefined) {
						body.style[vertical] = `${anchor.clientHeight}px`;
					}
					if (!entry.isIntersecting) {
						if (intersectionRectW < bodyRect.width) {
							body.style.left = `-${
								entry.boundingClientRect.width -
								intersectionRectW +
								anchorRect.width
							}px`;
						}
						if (intersectionRectH < bodyRect.height) {
							if (
								anchorRect.top >
								entry.rootBounds.height / 2
							) {
								body.style.bottom = `${anchor.clientHeight}px`;
							} else {
								body.style.top = `${anchor.clientHeight}px`;
							}
						}
					}
				}
				setTimeout(() => {
					target.style.opacity = "100%";
					observer.disconnect();
				}, 0);
			},
			{ threshold: 1, root: document.body }
		);
		observer.observe(body);
		return () => observer.disconnect();
	}, [IS_SHOW]);

	/**
	 * determine method that closes element on outside click/touch
	 */
	useEffect(() => {
		if (!IS_SHOW) return;
		function backgroundPushHandle(ev: PointerEvent) {
			const target = ev.target as HTMLElement;
			const anchor = triggerRef.current;
			const body = popoverRef.current;

			if (
				!body ||
				body?.contains(target) ||
				body == target ||
				anchor == target
			)
				return;
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
	}, [IS_SHOW]);

	const { keyboardPropList } = useKeyboard({
		Escape: (ev) => {
			ev.stopPropagation();
			hide();
		},
	});
	const { focusScopePropList } = useFocusScope({
		isTabbingTrapped: true,
	});
	const popoverPropList = mergeProps<HTMLDivElement>([
		focusScopePropList,
		keyboardPropList,
		{ ref: popoverRef },
	]);

	return {
		triggerRef,
		popoverPropList,
		isShow: IS_SHOW,
		isInverted: false,
		show,
		hide,
	};
};
