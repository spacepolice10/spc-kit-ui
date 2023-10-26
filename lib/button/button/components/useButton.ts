import {
	focusPropListType,
	useFocus,
	useFocusType,
} from "../../../interactions/focus/components/useFocus.ts";
import {
	hoverPropListType,
	useHover,
	useHoverType,
} from "../../../interactions/hover/components/useHover.ts";
import {
	pushPropListType,
	usePush,
	usePushType,
} from "../../../interactions/push/components/usePush.ts";
import {
	elemPropListType,
	useElem,
	useElemType,
} from "../../../util/useSubmitElem.ts";

export type useButtonType = {
	title: string;
	type?: "submit" | "button";
} & useElemType &
	usePushType &
	useHoverType &
	useFocusType;

type buttonPropListType = elemPropListType &
	pushPropListType &
	hoverPropListType &
	focusPropListType;

type useButtonReturnType = {
	isPushed: boolean;
	isHovered: boolean;
	isFocused: boolean;
	isDisabled: boolean;
	buttonPropList: buttonPropListType;
};

const useButton = (
	propList: useButtonType
): useButtonReturnType => {
	const { type = "button", title } = propList;
	const { elemPropList, isDisabled } = useElem(propList);
	const { isPushed, pushPropList } = usePush(propList);
	const { isHovered, hoverPropList } = useHover({
		...propList,
	});
	const { isFocused, focusPropList } = useFocus({
		...propList,
	});
	const buttonPropList = {
		...elemPropList,
		...pushPropList,
		...hoverPropList,
		...focusPropList,
		type,
		title,
	};
	return {
		isPushed,
		isHovered,
		isFocused,
		isDisabled,
		buttonPropList,
	};
};

export { useButton };