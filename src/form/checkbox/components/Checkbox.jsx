import { useRef } from 'react'
import { useCheckbox } from './useCheckbox'

/**
 * @typedef CheckboxType
 * @type {import("./useCheckbox").useCheckboxType &
 * {children: (isToggle: boolean) => ReactNode}}
 */

/**
 *
 * @param {CheckboxType} props
 * @returns
 */
const Checkbox = (props) => {
  const checkboxRef = useRef(null)
  const { children, id, className, onChange } = props
  const { isHovered, isFocused, isToggle, checkboxPropList } =
    useCheckbox({
      id,
      onChange,
    })
  return (
    <>
      <button
        {...checkboxPropList}
        className={
          typeof className != 'function'
            ? className
            : className?.({
                isToggle,
                isHovered,
                isFocused,
              })
        }
      >
        {children?.(isToggle)}
      </button>
      <input
        ref={checkboxRef}
        type="checkbox"
        style={{ display: 'none' }}
      />
    </>
  )
}
export { Checkbox }
