import { CSSProperties, useState } from "react";

import { useKeyboard } from "../keyboard/useKeyboard";

/**
 * @param onPress callback to fire on push (click and touch)
 * @param onDoublePress  callback to fire on double push (click and touch)
 * @param onPressStarts callback to fire on push down (mousedown, keydown)
 * @param onPressFinishes callback to fire on push up (mouseup, keyup)
 * @param isntSemanticElem adds button-like properties to different HTML Elements (if you wish to make divs or spans clickable for some reason like taming typescript in "button in button" cases)
 * @param isBubbling  bubbling is turned off by default because in most cases your interface doesn't have to detect actions from elements placed above the button itself
 */
export type usePressType = {
	onPress?: (
		args?: React.MouseEvent | React.KeyboardEvent
	) => void;
	onDoublePress?: (
		args?: React.MouseEvent | React.KeyboardEvent
	) => void;
	onPressStarts?: (
		args?: React.MouseEvent | React.KeyboardEvent
	) => void;
	onPressFinishes?: (
		args?: React.MouseEvent | React.KeyboardEvent
	) => void;
	isntSemanticElem?: boolean;
	isBubbling?: boolean;
};

export type pressPropListType = {
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

export type usePressReturnType = {
	isPressed: boolean;
	pressPropList: pressPropListType;
};

export const usePress = (
	props: usePressType
): usePressReturnType => {
	const {
		onPress,
		onDoublePress,
		onPressStarts,
		onPressFinishes,
		isntSemanticElem,
		isBubbling,
	} = props;
	const [isPressed, changeIsPressed] = useState(false);

	function handlePush(
		ev: React.MouseEvent | React.KeyboardEvent
	) {
		if (!isBubbling) ev?.stopPropagation();

		onPress?.(ev);
	}
	function handleDoublePush(
		ev: React.MouseEvent | React.KeyboardEvent
	) {
		if (!isBubbling) ev?.stopPropagation();
		onDoublePress?.(ev);
	}

	function handlePushStarts(
		ev: React.MouseEvent | React.KeyboardEvent
	) {
		changeIsPressed(true);
		onPressStarts?.(ev);
	}
	function handlePushFinishes(
		ev: React.MouseEvent | React.KeyboardEvent
	) {
		changeIsPressed(false);
		onPressFinishes?.(ev);
	}

	const { keyboardPropList } = useKeyboard({
		"": handlePush,
		...(isntSemanticElem && { Enter: handlePush }),
	});

	const pressPropList = {
		onPointerDown: handlePushStarts,
		onPointerUp: handlePushFinishes,
		onClick: handlePush,
		onDoubleClick: handleDoublePush,
		...keyboardPropList,
		...(isntSemanticElem && {
			type: "button" as const,
			role: "button",
			tabIndex: 0,
			style: { cursor: "pointer" },
		}),
	};
	return { isPressed, pressPropList };
};
