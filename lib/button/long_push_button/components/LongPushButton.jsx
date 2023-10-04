import { useLongPushButton } from './useLongPushButton'

/**
 *
 * @typedef LongPushButtonType
 * @property {ButtonType}
 * @property {useLongPushType}
 * @returns
 */

/**
 *
 * @param {LongPushButtonType} props
 * @returns
 */
const LongPushButton = (props) => {
  const { className, children, ...restPropList } = props
  const { isLongPushed, isFocused, isHovered, longPushButtonPropList } =
    useLongPushButton(restPropList)
  return (
    <button
      className={
        typeof className != 'function'
          ? className
          : className?.({ isPushed: isLongPushed, isHovered, isFocused })
      }
      {...longPushButtonPropList}
    >
      {typeof children != 'function'
        ? children
        : children?.({ isPushed: isLongPushed, isHovered, isFocused })}
    </button>
  )
}

export { LongPushButton }
