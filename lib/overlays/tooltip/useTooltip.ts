import {
	CSSProperties,
	MutableRefObject,
	useRef,
} from "react";
import {
	focusPropListType,
	useFocus,
} from "../../interactions/focus/useFocus.ts";
import {
	hoverPropListType,
	useHover,
} from "../../interactions/hover/useHover.ts";
import {
	popoverPropListType,
	usePopover,
	usePopoverType,
} from "../popover/usePopover.ts";

export type useTooltipType = usePopoverType & {
	label?: string;
	delay?: number;
};

type tooltipTriggerPropListType = {
	style: CSSProperties;
	"aria-describedby": string;
	role: string;
	ref: MutableRefObject<HTMLElement>;
} & hoverPropListType &
	focusPropListType;
type tooltipPropListType = popoverPropListType & {
	style: CSSProperties;
};

export type useTooltipReturnType = {
	tooltipPropList: tooltipPropListType;
	tooltipTriggerPropList: tooltipTriggerPropListType;
	isShow: boolean;
};

const useTooltip = (
	propList: useTooltipType
): useTooltipReturnType => {
	const { popoverPropList, triggerRef, show, hide, isShow } =
		usePopover({ ...propList, isIgnoreFocusingOnHide: true });
	const timerRef = useRef<ReturnType<typeof setTimeout>>(0);

	function hold() {
		timerRef.current = setTimeout(() => {
			show();
		}, propList.delay ?? 0);
	}
	function release() {
		hide();
		clearTimeout(timerRef.current);
	}

	const { hoverPropList } = useHover({
		onHover: hold,
		onHoverLoose: release,
	});
	const { focusPropList } = useFocus({
		onFocus: hold,
		onFocusLoose: release,
	});
	const tooltipTriggerPropList = {
		style: { width: "fit-content" },
		"aria-describedby": propList?.label,
		role: "tooltip",
		ref: triggerRef,
		...hoverPropList,
		...focusPropList,
	} as tooltipTriggerPropListType;
	const tooltipPropList = {
		...popoverPropList,
		style: { width: "max-content" },
	} as tooltipPropListType;
	return {
		tooltipTriggerPropList,
		tooltipPropList,
		isShow,
	};
};

export { useTooltip };
