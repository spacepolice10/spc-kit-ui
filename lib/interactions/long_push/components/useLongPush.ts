import { useRef, useState } from "react";

import {
	usePush,
	usePushReturnType,
	usePushType,
} from "../../push/components/usePush";

type useLongPushType = usePushType & {
	delay: number;
};
const useLongPush = (
	propList: useLongPushType
): usePushReturnType => {
	const { onPush, delay } = propList;
	const { pushPropList } = usePush({
		onPushStarts: hold,
		onPushFinishes: release,
	});
	const [isPushed, setIsPushed] = useState(false);
	const timerRef = useRef<ReturnType<typeof setTimeout>>(0);
	function hold(ev: React.MouseEvent | React.KeyboardEvent) {
		const customEv = ev as { key: string };
		if (
			ev.type == "keydown" &&
			!["Enter", " "].includes(customEv.key)
		)
			return;
		setIsPushed(true);
		timerRef.current = setTimeout(() => {
			onPush?.(ev);
		}, delay ?? 0);
	}
	function release() {
		setIsPushed(false);
		clearTimeout(timerRef.current);
	}

	const longPushPropList = {
		...pushPropList,
		onClick: (ev: React.MouseEvent) => ev.preventDefault(),
		onDoubleClick: (ev: React.MouseEvent) =>
			ev.preventDefault(),
	};
	return {
		isPushed,
		pushPropList: longPushPropList,
	};
};

export { useLongPush };
