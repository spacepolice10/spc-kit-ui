import { useRadio } from './useRadio'

/**
 * @typedef RadioType
 * @type {import("./useRadio").useRadioType &
 * {children: (isSelected: boolean) => ReactNode}}
 */

/**
 *
 * @param {RadioType} props
 * @returns
 */
const Radio = (props) => {
  const { children, className } = props
  const { isToggle, isHovered, isFocused, radioPropList } =
    useRadio(props)
  return (
    <button
      className={
        typeof className != 'function'
          ? className
          : className?.({ isHovered, isFocused, isToggle })
      }
      {...radioPropList}
    >
      {children?.(isToggle)}
    </button>
  )
}

export { Radio }
