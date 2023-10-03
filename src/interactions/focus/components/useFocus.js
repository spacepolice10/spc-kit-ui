import { useState } from 'react'

/**
 * @typedef useFocusReturnType
 */

/**
 *
 * @typedef useFocusType
 * @property {() => void} [onFocus]
 * @property {() => void} [onFocusLoose]
 * @returns
 */

/**
 * @param {useFocusType} [props]
 */
const useFocus = (props) => {
  const { onFocus, onFocusLoose } = props ?? {}
  const [isFocused, setIsFocused] = useState(false)
  const focusPropList = {
    tabIndex: 0,
    onFocus: () => {
      setIsFocused(true)
      onFocus?.()
    },
    onBlur: () => {
      setIsFocused(false)
      onFocusLoose?.()
    },
  }
  return {
    isFocused,
    focusPropList,
  }
}

export { useFocus }
