import { createContext } from 'react'
import { useFocus } from '../../../interactions/focus/components/useFocus.js'
import { useHover } from '../../../interactions/hover/components/useHover.js'
import {
  usePopover,
} from '../../popover/components/usePopover.js'


export const TooltipContext = createContext({})

/**
 *
 * @typedef useTooltipType
 * @property {import('../../popover/components/usePopover.js').usePopoverType}
 * @returns
 */

/**
 * 
 * @param {useTooltipType} props 
 * @returns 
 */
const useTooltip = (props) => {
  const { popoverPropList, triggerRef, show, hide, isShow } = usePopover({ ...props, ignoreFocusingOnHide: true })
  const { hoverPropList } = useHover({ onHover: show, onHoverLoose: hide })
  const { focusPropList } = useFocus({ onFocus: show, onFocusLoose: hide })
  const tooltipTriggerPropList = {
    ref: triggerRef,
    ...hoverPropList,
    ...focusPropList,
  }
  const tooltipPropList = {
    ...popoverPropList,
  }
  return {
    tooltipTriggerPropList,
    tooltipPropList,
    isShow,
  }
}

export { useTooltip }
