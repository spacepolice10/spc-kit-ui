import { CSSProperties, useState } from "react";

import { useKeyboard } from "../keyboard/useKeyboard";

/**
 * @param onPush callback to fire on push (click and touch)
 * @param onDoublePush  callback to fire on double push (click and touch)
 * @param onPushStarts callback to fire on push down (mousedown, keydown)
 * @param onPushFinishes callback to fire on push up (mouseup, keyup)
 * @param isntSemanticPushableElem adds button-like properties to different HTML Elements (if you wish to make divs or spans clickable for some reason like taming typescript in "button in button" cases)
 * @param isBubbling  bubbling is turned off by default because in most cases your interface doesn't have to detect actions from elements placed above the button itself
 */
export type usePushType = {
	onPush?: (
		args?: React.MouseEvent | React.KeyboardEvent
	) => void;
	onDoublePush?: (
		args?: React.MouseEvent | React.KeyboardEvent
	) => void;
	onPushStarts?: (
		args?: React.MouseEvent | React.KeyboardEvent
	) => void;
	onPushFinishes?: (
		args?: React.MouseEvent | React.KeyboardEvent
	) => void;
	isntSemanticPushableElem?: boolean;
	isBubbling?: boolean;
};

export type pushPropListType = {
	onPointerDown: (ev: React.PointerEvent) => void;
	onPointerUp: (ev: React.PointerEvent) => void;
	onClick: (
		ev: React.MouseEvent | React.KeyboardEvent
	) => void;
	onKeyDown: (ev: React.KeyboardEvent) => void;
	role?: string;
	tabIndex?: number;
	style?: CSSProperties;
	type?: "button" | "submit";
};

export type usePushReturnType = {
	isPushed: boolean;
	pushPropList: pushPropListType;
};

const usePush = (props: usePushType): usePushReturnType => {
	const {
		onPush,
		onDoublePush,
		onPushStarts,
		onPushFinishes,
		isntSemanticPushableElem,
		isBubbling,
	} = props;
	const [isPushed, setIsPushed] = useState(false);

	function handlePush(
		ev: React.MouseEvent | React.KeyboardEvent
	) {
		if (!isBubbling) ev?.stopPropagation();

		onPush?.(ev);
	}
	function handleDoublePush(
		ev: React.MouseEvent | React.KeyboardEvent
	) {
		if (!isBubbling) ev?.stopPropagation();
		onDoublePush?.(ev);
	}

	function handlePushStarts(
		ev: React.MouseEvent | React.KeyboardEvent
	) {
		setIsPushed(true);
		onPushStarts?.(ev);
	}
	function handlePushFinishes(
		ev: React.MouseEvent | React.KeyboardEvent
	) {
		setIsPushed(false);
		onPushFinishes?.(ev);
	}

	const { keyboardPropList } = useKeyboard({
		"": handlePush,
		...(isntSemanticPushableElem && { Enter: handlePush }),
	});

	const pushPropList = {
		onPointerDown: handlePushStarts,
		onPointerUp: handlePushFinishes,
		onClick: handlePush,
		onDoubleClick: handleDoublePush,
		...keyboardPropList,
		...(isntSemanticPushableElem && {
			type: "button" as const,
			role: "button",
			tabIndex: -1,
			style: { cursor: "pointer" },
		}),
	};
	return { isPushed, pushPropList };
};

export { usePush };
