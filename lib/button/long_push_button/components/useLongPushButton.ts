import { useFocus } from "../../../interactions/focus/useFocus.ts";
import { useHover } from "../../../interactions/hover/useHover.ts";
import { useLongPush } from "../../../interactions/long_push/components/useLongPush.ts";
import { useElement } from "../../../util/useElement.ts";

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
const useLongPushButton = (propList) => {
	const { elemPropList } = useElement(propList);
	const { isPushed, pushPropList } = useLongPush(propList);
	const { isHovered, hoverPropList } = useHover();
	const { isFocused, focusPropList } = useFocus();
	const longPushButtonPropList = {
		...elemPropList,
		...pushPropList,
		...hoverPropList,
		...focusPropList,
	};
	return {
		isPushed,
		isFocused,
		isHovered,
		longPushButtonPropList,
	};
};

export { useLongPushButton };
