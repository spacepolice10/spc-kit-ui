import { forwardRef } from 'react'
import { useButton } from './useButton.js'

/**
 * @typedef ButtonType
 * @type {React.FC<
 * import('../../../interactions/push/components/usePush.js').usePushType &
 * import('../../../interactions/hover/components/useHover.js').useHoverType &
 * import('../../../interactions/focus/components/useFocus.js').useFocusType> &
 * {children: ReactNode | () => ReactNode, className: string}}
 * @returns
 */

/**
 * @type {ButtonType}
 */
const Button = forwardRef(function Button(props, ref) {
  const { children, className, ...restPropList } = props
  const { isHovered, isFocused, isPushed, buttonPropList } = useButton({
    ...restPropList,
  })
  return (
    <button
      className={
        typeof className != 'function'
          ? className
          : className?.({ isPushed, isHovered, isFocused })
      }
      {...buttonPropList}
      ref={ref}
    >
      {typeof children != 'function'
        ? children
        : children?.({ isPushed, isHovered, isFocused })}
    </button>
  )
})
export { Button }
