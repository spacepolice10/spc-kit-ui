import { CSSProperties, useState } from "react";

import formEventsArgs, {
	eventsReturnType,
	eventsType,
} from "../../util/formEventsArgs";
import { useKeyboard } from "../../keyboard/components/useKeyboard";

/**
 * @param onPush callback to fire on push (click and touch)
 * @param onDoublePush  callback to fire on double push (click and touch)
 * @param onPushStarts callback to fire on push down
 * @param onPushFinishes callback to fire on push up
 * @param isntSemanticPushableElem adds button-like properties to different HTML Elements (if you wish to make divs or spans clickable for some reason like taming typescript in "button in button" cases)
 * @param isDisabled `isDisabled` boolean returned as an aditional property to button so you can add some additional JavaScript or CSS to handle such cases
 * @param isBubbling  bubbling is turned off by default because in most cases your interface doesn't have to detect actions from elements placed above the button itself
 * @param isSubmitting  change type to submit
 */
export type usePushType = {
	onPush?: (args?: eventsReturnType) => void;
	onDoublePush?: (args?: eventsReturnType) => void;
	onPushStarts?: (args?: eventsReturnType) => void;
	onPushFinishes?: (args?: eventsReturnType) => void;
	isntSemanticPushableElem?: boolean;
	isBubbling?: boolean;
};

export type pushPropListType = {
	onPointerDown: (ev: React.PointerEvent) => void;
	onPointerUp: (ev: React.PointerEvent) => void;
	onClick: (ev: eventsType) => void;
	onKeyDown: (ev: eventsType) => void;
	role?: "button";
	tabIndex?: number;
	style?: CSSProperties;
	type?: "submit";
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

	function push(ev: eventsType) {
		if (!isBubbling) ev?.stopPropagation();
		const args = formEventsArgs(ev);
		onDoublePush?.(args);
		onPush?.(args);
	}

	function handlePushStarts(ev: eventsType) {
		setIsPushed(true);
		onPushStarts?.(formEventsArgs(ev));
	}
	function handlePushFinishes(ev: eventsType) {
		setIsPushed(false);
		onPushFinishes?.(formEventsArgs(ev));
	}

	const { keyboardPropList } = useKeyboard({
		"": push,
		...(isntSemanticPushableElem && { Enter: push }),
	});

	const pushPropList = {
		onPointerDown: handlePushStarts,
		onPointerUp: handlePushFinishes,
		onClick: push,
		onDoubleClick: push,
		...keyboardPropList,
		...(isntSemanticPushableElem && {
			role: "button" as const,
			tabIndex: -1,
			style: { cursor: "pointer" },
		}),
	};
	return { isPushed, pushPropList };
};

export { usePush };
