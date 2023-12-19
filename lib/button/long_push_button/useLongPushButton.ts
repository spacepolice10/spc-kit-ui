import { useFocus } from "../../interactions/focus/useFocus.ts";
import { useHover } from "../../interactions/hover/useHover.ts";
import {
	useLongPush,
	useLongPushType,
} from "../../interactions/long_push/components/useLongPush.ts";
import { useElement } from "../../util/useElement.ts";
import { useButtonType } from "../button/index.ts";

export type useLongPushButtonType = useLongPushType &
	useButtonType;

const useLongPushButton = (
	propList: useLongPushButtonType
) => {
	const { elemPropList } = useElement(propList);
	const { isPressed, pressPropList } = useLongPush(propList);
	const { isHovered, hoverPropList } = useHover();
	const { isFocused, focusPropList } = useFocus();
	const longPushButtonPropList = {
		...elemPropList,
		...pressPropList,
		...hoverPropList,
		...focusPropList,
	};
	return {
		isPressed,
		isFocused,
		isHovered,
		longPushButtonPropList,
	};
};

export { useLongPushButton };
