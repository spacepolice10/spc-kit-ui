import {
	MutableRefObject,
	RefObject,
	useEffect,
	useRef,
} from "react";
import { useKeyboard } from "../../../main";

export type useFocusScopeType = {
	isTabbingTrapped?: boolean;
	getOutOfFocusingList?: boolean;
};

export type focusScopePropListType = {
	ref: RefObject<HTMLDivElement>;
	onKeyDown: (ev: React.KeyboardEvent) => void;
};
export type useFocusScopeReturnType = {
	focusNextElem: () => void;
	focusPrevElem: () => void;
	focusFirstElem: () => void;
	focusLastElem: () => void;
	focusPrevElemGrid: (colsNumber: number) => void;
	focusNextElemGrid: (colsNumber: number) => void;
	focusScopePropList: focusScopePropListType;
	focusScopeRef: MutableRefObject<HTMLElement>;
};

const useFocusScope = (
	props?: useFocusScopeType
): useFocusScopeReturnType => {
	const { isTabbingTrapped, getOutOfFocusingList } =
		props ?? {};
	const focussableElements =
		'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';
	const ref = useRef(null);

	function detectFocussable() {
		if (!document.activeElement) return;
		const focussable = Array.prototype.filter.call(
			ref?.current?.querySelectorAll(focussableElements),
			function (element: HTMLElement) {
				return (
					element.offsetWidth > 0 ||
					element == document.activeElement
				);
			}
		);
		return focussable;
	}
	function detectPosition() {
		const focussable = detectFocussable();
		const index = focussable?.indexOf(document.activeElement);
		if ((index ?? 0) <= -1) return;
		return index;
	}
	function focusElem(position) {
		const focussable = detectFocussable();
		if (!focussable) return;
		const elem = focussable?.[position]
			? focussable?.[position]
			: position <= 0
			? focussable?.[focussable.length - 1]
			: focussable?.[0];
		elem?.focus();
	}
	function focusNextElem() {
		if (document.activeElement == ref.current) {
			focusFirstElem();
			return;
		}
		const position = detectPosition();
		focusElem((position ?? 0) + 1);
	}
	function focusPrevElem() {
		if (document.activeElement == ref.current) {
			focusLastElem();
			return;
		}
		const position = detectPosition();
		focusElem((position ?? 0) - 1);
	}
	// amount of columns in grid helps to determine vertical position
	function focusPrevElemGrid(colsNumber: number) {
		const position = detectPosition();
		focusElem((position ?? 0) - colsNumber);
	}
	function focusNextElemGrid(colsNumber: number) {
		const position = detectPosition();
		focusElem((position ?? 0) + colsNumber);
	}
	function focusFirstElem() {
		const position = 0;
		focusElem(position);
	}
	function focusLastElem() {
		const focussable = detectFocussable();
		focusElem(
			focussable?.length ? focussable?.length - 1 : 0
		);
	}

	const { keyboardPropList } = useKeyboard({
		Tab: focusNextElem,
	});

	useEffect(() => {
		if (!ref.current) return;
		const children = Array.from(ref.current?.children);
		if (!children) return;
		children.forEach((x: HTMLElement, i: number) => {
			if (i > 0) x.tabIndex = -1;
		});
	}, []);

	const focusScopePropList = {
		ref,
		...(isTabbingTrapped && { ...keyboardPropList }),
	} as focusScopePropListType;

	return {
		focusNextElem,
		focusPrevElem,
		focusFirstElem,
		focusLastElem,
		focusPrevElemGrid,
		focusNextElemGrid,
		focusScopePropList,
		focusScopeRef: ref,
	};
};

export { useFocusScope };
