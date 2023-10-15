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

export type useButtonType = {
	title?: string;
	hoverTitle: string;
	isDisabled?: boolean;
} & usePushType &
	useHoverType &
	useFocusType;

type buttonPropListType = {
	value: string;
	title: string;
	disabled: boolean;
} & pushPropListType &
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
	props: useButtonType
): useButtonReturnType => {
	const { title, hoverTitle, isDisabled } = props;
	const { isPushed, pushPropList } = usePush(props);
	const { isHovered, hoverPropList } = useHover({
		onHover: props?.onHover,
		onHoverLoose: props?.onHoverLoose,
	});
	const { isFocused, focusPropList } = useFocus({
		onFocus: props?.onFocus,
		onFocusLoose: props?.onFocusLoose,
	});
	const buttonPropList = {
		value: title,
		title: hoverTitle,
		disabled: isDisabled,
		...pushPropList,
		...hoverPropList,
		...focusPropList,
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
