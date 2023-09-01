import { createContext } from "react";
import { useFocus } from "../../../interactions/focus/hook/useFocus";
import { useHover } from "../../../interactions/hover/hook/useHover";
import { usePopover, usePopoverType } from "../../popover/hook/usePopover";

export type useTooltipType = usePopoverType;

export const TooltipContext = createContext({} as { onFocus: () => void });

const useTooltip = (props: useTooltipType) => {
  const { popoverPropList, triggerRef, show, hide, isShow } = usePopover(props);
  const { hoverPropList } = useHover({ onHover: show, onHoverLoose: hide });
  const { focusPropList } = useFocus({ onFocus: show, onFocusLoose: hide });
  const tooltipTriggerPropList = {
    ref: triggerRef,
    ...hoverPropList,
    ...focusPropList,
  };
  const tooltipPropList = {
    ...popoverPropList,
  };
  return {
    tooltipTriggerPropList,
    tooltipPropList,
    isShow,
  };
};

export { useTooltip };
