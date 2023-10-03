import { useToggleButton } from './useToggleButton'

/**
 * @typedef ToggleButtonType
 * @type {import('./useToggleButton').useToggleButtonType}
 */

/**
 * @param {ToggleButtonType} props
 * @returns
 */
export function ToggleButton(props) {
  const { children, className, ...restPropList } = props

  const { isToggle, isFocused, isHovered, isPushed, buttonPropList } =
    useToggleButton(restPropList)

  return (
    <button
      className={
        typeof className != 'function'
          ? className
          : className?.({ isPushed, isToggle, isHovered, isFocused })
      }
      {...buttonPropList}
    >
      {typeof children != 'function'
        ? children
        : children?.({ isPushed, isToggle, isHovered, isFocused })}
    </button>
  )
}
