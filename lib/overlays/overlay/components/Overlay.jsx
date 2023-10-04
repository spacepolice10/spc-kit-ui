import { Children, useContext } from 'react'
import { OverlayContext, useOverlay } from './useOverlay'
import { createPortal } from 'react-dom'
import { Button } from '../../../button/button/components/Button'

/**
 * Combination of useOverlay hook type and children passed to component
 * @typedef OverlayType
 * @type {import("./useOverlay").useOverlayType & {children: ReactNode}}
 */

/**
 *
 * @param {OverlayType} props
 * @returns
 */
const Overlay = (props) => {
  const { children, className, ...restPropList } = props
  const { overlayBackgroundPropList, ...rest } = useOverlay(restPropList)
  const [button, body] = Children.toArray(children)
  return (
    <OverlayContext.Provider value={rest}>
      {props?.isShow == undefined && button}
      {rest.isShow && typeof document == 'object' ? (
        createPortal(
          <div className={className} {...overlayBackgroundPropList}>
            {body ?? button}
          </div>,
          document.body
        )
      ) : (
        <></>
      )}
    </OverlayContext.Provider>
  )
}

/**
 *
 * @param {import('../../../button/button/components/Button').ButtonType
 * &
 * {children: ((isShow: boolean) => ReactNode) | ReactNode}} props
 * @returns
 */
function OverlayTrigger(props) {
  /**
   * Consume properties necessary to interact with PopoverTrigger through context
   * @type {{
   * show: () => void,
   * triggerRef: import('react').RefObject
   * }}
   */
  const { show, triggerRef } = useContext(OverlayContext)
  return (
    <Button {...props} ref={triggerRef} onPush={show}>
      {props?.children}
    </Button>
  )
}

/**
 *
 * @param {object} props
 * @param {((hide: () => void) => ReactNode)} props.children
 * @param {string} props.className
 * @returns
 */
function OverlayContent(props) {
  const { className, children } = props
  /**
   * Consume properties necessary to interact with OverlayContent through context
   * @type {{hide: () => void,
   * popoverPropList: import('./usePopover').popoverPropListType}}
   */
  const { hide, overlayRef } = useContext(OverlayContext)
  return (
    <div className={className} ref={overlayRef} tabIndex={-1}>
      {typeof children == 'function' ? children(hide) : children}
    </div>
  )
}

export { Overlay, OverlayTrigger, OverlayContent }
