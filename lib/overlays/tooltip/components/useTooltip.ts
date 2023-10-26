import { createContext, useRef } from "react";
import { useFocus } from "../../../interactions/focus/components/useFocus.ts";
import { useHover } from "../../../interactions/hover/components/useHover.ts";
import {
	usePopover,
	usePopoverType,
} from "../../popover/components/usePopover.ts";

export const TooltipContext = createContext({});

export type useTooltipType = usePopoverType & {
	delay?: number;
};

const useTooltip = (props: useTooltipType) => {
	const { popoverPropList, triggerRef, show, hide, isShow } =
		usePopover({ ...props, isIgnoreFocusingOnHide: true });
	const timerRef = useRef<ReturnType<typeof setTimeout>>(0);

	function hold() {
		timerRef.current = setTimeout(() => {
			show();
		}, props.delay ?? 0);
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
		"aria-describedby": "Tooltip",
		role: "tooltip",
		ref: triggerRef,
		...hoverPropList,
		...focusPropList,
		style: { width: "fit-content" },
	};
	const tooltipPropList = {
		...popoverPropList,
		style: { width: "max-content" },
	};
	return {
		tooltipTriggerPropList,
		tooltipPropList,
		isShow,
	};
};

export { useTooltip };
