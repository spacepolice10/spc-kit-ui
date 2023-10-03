/**
 *
 * @param {{[index: string]: (ev: KeyboardEvent) => void}} keys — keybinds to handle
 * @returns
 */
const useKeyboard = (keys) => {
  function keysHandle(ev) {
    if (!keys[ev.key]) return
    ev.preventDefault()
    ev.stopPropagation()
    keys[ev.key](ev)
  }
  const keyboardPropList = {
    tabIndex: -1,
    onKeyDown: keysHandle,
  }
  return { keyboardPropList }
}

export { useKeyboard }
