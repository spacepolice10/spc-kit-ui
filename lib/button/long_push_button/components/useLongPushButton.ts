import { useFocus } from "../../../interactions/focus/components/useFocus.ts";
import { useHover } from "../../../interactions/hover/components/useHover.ts";
import { useLongPush } from "../../../main.ts";

/**
 * @typedef {import('../../../interactions/long_push/components/useLongPush.js').useLongPushType} useLongPushType
 * @typedef {import('../../button/components/useButton.js').useButtonType} useButtonType
 * @typedef useLongPushButtonType
 * @type {useLongPushType & useButtonType}
 */

/**
 *
 * @param {useLongPushButtonType} props
 * @returns
 */
const useLongPushButton = (props) => {
	const { isLongPushed, longPushPropList } =
		useLongPush(props);
	const { isHovered, hoverPropList } = useHover();
	const { isFocused, focusPropList } = useFocus();
	const longPushButtonPropList = {
		...longPushPropList,
		...hoverPropList,
		...focusPropList,
	};
	return {
		isLongPushed,
		isFocused,
		isHovered,
		longPushButtonPropList,
	};
};

export { useLongPushButton };
