import { useEffect, useMemo, useRef } from 'react'
import { useHover } from '../../../interactions/hover/components/useHover.js'
import { useFocus } from '../../../interactions/focus/components/useFocus.js'

/**
 * @typedef useTextformType
 * @property {string} [value]
 * @property {string} [defVal]
 * @property {string} [regexp]
 * @property {string} [placeholdingText]
 * @property {boolean} [isFocusTrapsAfterMount]
 * @property {(args: string) => void} [onInput]
 * @property {(args: string) => void} [onHover]
 * @property {(args: string) => void} [onFocus]
 * @property {(args: string) => void} [onFocusLoose]
 * @property {(args: { value: string; files?: File }) => void} [onPaste]
 *
 */

/**
 *
 * @param {useTextformType} props
 * @returns
 */
const useTextform = (props) => {
  const {
    value,
    defVal,
    regexp,
    placeholdingText,
    focusTrapsAfterMount,
    onInput,
    onPaste,
    onHover,
    onFocus,
    onFocusLoose,
  } = props

  const uncontrolledText = useRef('')
  const inputRef = useRef < HTMLInputElement > null

  function changeText(ev) {
    const target = ev.currentTarget
    const val = target?.value
    uncontrolledText.current = val
    onInput?.(val)
  }

  /**
   * gets files and value from clipboard & returns it
   * @param {ClipboardEvent} ev
   * @returns {{value: text, files: FileList}}
   */
  function handlePasting(ev) {
    const value = ev.clipboardData?.getData('text') ?? ''
    const files = ev.clipboardData?.files?.[0]
    uncontrolledText.current = value
    onPaste?.({ value, files })
  }

  useEffect(() => {
    if (!defVal) return
    uncontrolledText.current = defVal
    const form = inputRef.current
    if (!form) return
    form.value = defVal
    onInput?.(defVal)
  }, [defVal])
  useEffect(() => {
    if (!focusTrapsAfterMount) return
    inputRef.current?.focus({ preventScroll: true })
  }, [focusTrapsAfterMount])

  const { hoverPropList, isHovered } = useHover({
    onHover: () => onHover?.(),
  })
  const { focusPropList, isFocused } = useFocus({
    onFocus: () => onFocus?.(value ?? uncontrolledText.current),
    onFocusLoose: () =>
      onFocusLoose?.(value ?? uncontrolledText.current),
  })

  const isValid = useMemo(() => {
    if (!regexp || !value) return
    const rg = new RegExp(regexp)
    const val = value ?? uncontrolledText
    return rg.test(val)
  }, [regexp, value, uncontrolledText])
  const textformPropList = {
    ref: inputRef,
    autoComplete: 'off',
    type: 'text',
    pattern: regexp,
    placeholder: placeholdingText,
    onInput: changeText,
    onPaste: handlePasting,
    ...focusPropList,
    ...hoverPropList,
  }

  return {
    value: value ?? uncontrolledText.current,
    textformPropList,
    isHovered,
    isFocused,
    isValid,
  }
}

export { useTextform }
