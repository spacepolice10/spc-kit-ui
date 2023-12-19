import {
	focusPropListType,
	hoverPropListType,
	pressPropListType,
	useFocus,
	useFocusType,
	useHover,
	useHoverType,
	usePress,
	usePressType,
} from "../../interactions";

import {
	elementChildrenType,
	elementPropListType,
	useElement,
	useElementType,
} from "../../util/useElement.ts";

export type useButtonType = {
	title: string;
	type?: "submit" | "button";
} & useElementType &
	usePressType &
	useHoverType &
	useFocusType;

type buttonPropListType = elementPropListType &
	pressPropListType &
	hoverPropListType &
	focusPropListType;

type useButtonReturnType = elementChildrenType & {
	buttonPropList: buttonPropListType;
};

const useButton = (
	propList: useButtonType
): useButtonReturnType => {
	const { type = "button", title } = propList;
	const { elemPropList } = useElement(propList);
	const { isPressed, pressPropList } = usePress(propList);
	const { isHovered, hoverPropList } = useHover({
		...propList,
	});
	const { isFocused, focusPropList } = useFocus({
		...propList,
	});
	const buttonPropList = {
		...elemPropList,
		...pressPropList,
		...hoverPropList,
		...focusPropList,
		type,
		title,
	};
	return {
		isPressed,
		isHovered,
		isFocused,
		buttonPropList,
	};
};

export { useButton };
