import { Children, useContext } from 'react'
import { TooltipContext, useTooltip } from './useTooltip'

/**
 * Combination of usePopover hook type and children passed to component
 * @typedef TooltipType
 * @property {import('./useTooltip').useTooltipType}
 * @property {ReactNode[]} children
 */

/**
 *
 * @param {TooltipType} props
 * @returns
 */
const Tooltip = (props) => {
  const { children, ...restPropList } = props
  const { tooltipPropList, tooltipTriggerPropList, isShow } =
    useTooltip(restPropList)

  const [button, body] = Children.toArray(children)
  return (
    <div style={{ position: 'relative' }}>
      <TooltipContext.Provider value={tooltipTriggerPropList}>
        {button}
        <div {...tooltipPropList}>{isShow && body}</div>
      </TooltipContext.Provider>
    </div>
  )
}

/**
 *
 * @param {import('../../../button/button/components/Button').ButtonType
 * &
 * {children: ((isShow: boolean) => ReactNode) | ReactNode}} props
 * @returns
 */
const TooltipTrigger = (props) => {
  /**
   * Consume properties necessary to interact with PopoverTrigger through context
   * @type {{
   * show: () => void,
   * isShow: boolean,
   * triggerRef: import('react').RefObject
   * }}
   */
  const tooltipTriggerPropList = useContext(TooltipContext)
  return (
    <div {...tooltipTriggerPropList}>{props.children}</div>
    // <Button {...props} ref={ref} onHover={show}>
    //   {typeof props.children == 'function'
    //     ? props?.children(isShow ?? false)
    //     : props?.children}
    // </Button>
  )
}

export { Tooltip, TooltipTrigger }
