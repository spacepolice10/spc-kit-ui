import { forwardRef } from 'react'
import { useButton } from './useButton.js'

/**
 * @typedef ButtonType
 * @type {React.FC<import('./useButton.js').useButtonType & {children: ReactNode | () => ReactNode, className: string}}
 * @returns
 */

/**
 * @type {ButtonType}
 */
const Button = forwardRef(function Button(props, ref) {
  const { children, className, ...restPropList } = props
  const { buttonPropList, ...restButtonPropList } = useButton({
    ...restPropList,
  })
  return (
    <button
      className={
        typeof className != 'function'
          ? className
          : className?.(restButtonPropList)
      }
      {...buttonPropList}
      ref={ref}
    >
      {typeof children != 'function'
        ? children
        : children?.(restButtonPropList)}
    </button>
  )
})
export { Button }
