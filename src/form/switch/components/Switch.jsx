import { cloneElement } from 'react'
import { useSwitch } from './useSwitch'

/**
 * @typedef SwitchType
 * @type {import("./useSwitch").useSwitchType &
 * {children: ReactNode}}
 */

/**
 *
 * @param {SwitchType} props
 * @returns
 */
const Switch = (props) => {
  const { children, className } = props
  const {
    isToggle,
    isHovered,
    isFocused,
    switchWrapPropList,
    switchPropList,
  } = useSwitch(props)
  return (
    <>
      <button
        {...switchWrapPropList}
        style={{ position: 'relative' }}
        className={
          typeof className != 'function'
            ? className
            : className?.({ isToggle, isHovered, isFocused })
        }
      >
        {cloneElement(children, { ...switchPropList })}
      </button>
    </>
  )
}

export { Switch }
