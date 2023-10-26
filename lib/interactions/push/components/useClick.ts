import { CSSProperties, useState } from "react";

import { useKeyboard } from "../../keyboard/components/useKeyboard";
import formEventsArgs, {
	eventsReturnType,
	eventsType,
} from "../../util/formMouseEventArgs";

/**
 * @param onClick callback to fire on push (click and touch)
 * @param onDoubleClick  callback to fire on double push (click and touch)
 * @param onClickStarts callback to fire on push down
 * @param onClickFinishes callback to fire on push up
 * @param isntSemanticClickableElem adds button-like properties to different HTML Elements (if you wish to make divs or spans clickable for some reason like taming typescript in "button in button" cases)
 * @param isDisabled `isDisabled` boolean returned as an aditional property to button so you can add some additional JavaScript or CSS to handle such cases
 * @param isBubbling  bubbling is turned off by default because in most cases your interface doesn't have to detect actions from elements placed above the button itself
 * @param isSubmitting  change type to submit
 */
export type useClickType = {
	onClick?: (args: eventsReturnType) => void;
	onDoubleClick?: (args: eventsReturnType) => void;
	onClickStarts?: (args: eventsReturnType) => void;
	onClickFinishes?: (args: eventsReturnType) => void;
	isntSemanticClickableElem?: boolean;
	isBubbling?: boolean;
};

type pushPropListType = {
	onPointerDown: (ev: React.PointerEvent) => void;
	onPointerUp: (ev: React.PointerEvent) => void;
	onClick: (ev: React.MouseEvent) => void;
	onDoubleClick: (ev: React.MouseEvent) => void;
	onKeyDown: (ev: React.KeyboardEvent) => void;
	role?: "button";
	tabIndex?: number;
	style?: CSSProperties;
	type?: "submit";
};

export type useClickReturnType = {
	isClicked: boolean;
	pushPropList: pushPropListType;
};

const useClick = (
	props: useClickType
): useClickReturnType => {
	const {
		onClick,
		onDoubleClick,
		onClickStarts,
		onClickFinishes,
		isntSemanticClickableElem,
		isBubbling,
	} = props;
	const [isClicked, setIsClicked] = useState(false);

	function push(ev: eventsType) {
		if (!isBubbling) ev?.stopPropagation();
		const args = formEventsArgs(ev);
		onDoubleClick?.(args);
		onClick?.(args);
	}

	function handlePushStarts(ev: eventsType) {
		setIsClicked(true);
		onClickStarts?.(formEventsArgs(ev));
	}
	function handlePushFinishes(ev: eventsType) {
		setIsClicked(false);
		onClickFinishes?.(formEventsArgs(ev));
	}

	const { keyboardPropList } = useKeyboard({
		"": push,
		...(isntSemanticClickableElem && { Enter: push }),
	});

	const pushPropList = {
		onPointerDown: handlePushStarts,
		onPointerUp: handlePushFinishes,
		onClick: push,
		onDoubleClick: push,
		...keyboardPropList,
		...(isntSemanticClickableElem && {
			role: "button" as const,
			tabIndex: -1,
			style: { cursor: "pointer" },
		}),
	};
	return { isClicked, pushPropList };
};

export { useClick };
