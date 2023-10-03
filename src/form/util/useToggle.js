import { useState } from 'react'

/**
 *
 * @typedef useToggleType
 * @property {boolean} [isToggle]
 * @property {boolean} [isInitToggle]
 * @property {(isToggle: boolean) => void} onChange
 * @returns
 */

/**
 *
 * @param {useToggleType} props
 * @returns
 */
const useToggle = (props) => {
  const { isInitToggle, onChange } = props
  const [controlledIsToggle, setControlledIsToggle] = useState(isInitToggle)
  const isToggle = props?.isToggle ?? controlledIsToggle
  function toggle() {
    onChange?.(!isToggle)
    setControlledIsToggle((state) => !state)
  }

  return { isToggle: props?.isToggle ?? isToggle, toggle }
}

export { useToggle }
