import { useRef, useState } from "react";

import formEventsArgs from "../../util/formEventsArgs";
import { usePush } from "../../push/components/usePush";

/**
 * @typedef useLongPushType
 * @property {import("../../push/components/usePush").usePushType}
 * @property {number} delay
 * @returns
 */

/**
 *
 * @param {useLongPushType} props
 * @returns
 */
const useLongPush = (props) => {
	const { onPush, delay } = props;
	const { pushPropList } = usePush(props);
	const [isLongPushed, setIsLongPushed] = useState(false);
	const timerRef = useRef(0);
	function hold(ev) {
		if (
			ev.type == "keydown" &&
			!["Enter", " "].includes(ev.key)
		)
			return;
		setIsLongPushed(true);
		timerRef.current = setTimeout(() => {
			onPush?.(formEventsArgs(ev));
		}, delay ?? 0);
	}
	function release() {
		setIsLongPushed(false);
		clearTimeout(timerRef.current);
	}
	function overrideClicks(ev) {
		ev.preventDefault();
	}

	const longPushPropList = {
		...pushPropList,
		onClick: overrideClicks,
		onDoubleClick: overrideClicks,
		onMouseDown: hold,
		onMouseUp: release,
		onTouchStart: release,
		onTouchEnd: release,
		onKeyDown: hold,
		onKeyUp: release,
	};
	return {
		isLongPushed,
		longPushPropList,
	};
};

export { useLongPush };
