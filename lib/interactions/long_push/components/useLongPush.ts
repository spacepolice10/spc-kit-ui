import { useRef, useState } from "react";

import {
	usePress,
	usePressReturnType,
	usePressType,
} from "../../press/usePress";

export type useLongPushType = usePressType & {
	delay: number;
};
export const useLongPush = (
	propList: useLongPushType
): usePressReturnType => {
	const { onPress, onPressStarts, onPressFinishes, delay } =
		propList;
	const { pressPropList } = usePress({
		onPressStarts: (ev) => {
			onPressStarts(ev);
			hold(ev);
		},
		onPressFinishes: (ev) => {
			onPressFinishes(ev);
			release();
		},
	});
	const [isPushed, setIsPushed] = useState(false);
	const timerRef = useRef<ReturnType<typeof setTimeout>>();
	function hold(ev: React.MouseEvent | React.KeyboardEvent) {
		ev.preventDefault();
		ev.stopPropagation();
		const customEv = ev as { key: string };
		if (
			ev.type == "keydown" &&
			!["Enter", " "].includes(customEv.key)
		)
			return;
		setIsPushed(true);
		timerRef.current = setTimeout(() => {
			onPress?.(ev);
		}, delay ?? 0);
	}
	function release() {
		setIsPushed(false);
		clearTimeout(timerRef.current);
	}

	const longPushPropList = {
		...pressPropList,
		onClick: (ev: React.MouseEvent) => ev.preventDefault(),
		onDoubleClick: (ev: React.MouseEvent) =>
			ev.preventDefault(),
	};
	return {
		isPressed: isPushed,
		pressPropList: longPushPropList,
	};
};
