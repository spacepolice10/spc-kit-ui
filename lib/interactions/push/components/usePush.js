import { useState } from 'react'

import formEventsArgs from '../../util/formEventsArgs'
import { useKeyboard } from '../../keyboard/components/useKeyboard'

/**
 *
 * @typedef usePushType
 * @property {function} props.onPush callback to fire on push (click and touch)
 * @property {function} [props.onDoublePush]  callback to fire on double push (click and touch)
 * @property {function} [props.onPushStarts] callback to fire on push down
 * @property {function} [props.onPushFinishes] callback to fire on push up
 * @property {boolean} [props.isntSemanticPushableElem] used when button made up from DIV, IMG, etc...
 * @property {boolean} [props.isDisabled]
 * @property {boolean} [props.isBubble]  turn on events bubbling
 * @property {boolean} [props.isSubmit]  change typ to submit
 * @returns
 */

/**
 *
 * @param {usePushType} props
 * @returns
 */
const usePush = (props) => {
  const {
    onPush,
    onDoublePush,
    onPushStarts,
    onPushFinishes,
    isntSemanticPushableElem,
    isDisabled,
    isBubble,
    isSubmit,
  } = props
  const [isPushed, setIsPushed] = useState(false)

  function push(ev) {
    if (!isBubble) ev.stopPropagation()
    const args = formEventsArgs(ev)
    onDoublePush?.(args)
    onPush?.(args)
  }

  function handlePushStarts(ev) {
    setIsPushed(true)
    onPushStarts?.(formEventsArgs(ev))
  }
  function handlePushFinishes(ev) {
    setIsPushed(false)
    onPushFinishes?.(formEventsArgs(ev))
  }

  const { keyboardPropList } = useKeyboard({
    ' ': push,
    ...(isntSemanticPushableElem && { Enter: push }),
  })

  const pushPropList = {
    disabled: isDisabled,
    onPointerDown: handlePushStarts,
    onPointerUp: handlePushFinishes,
    onClick: push,
    onDoubleClick: push,
    ...keyboardPropList,
    ...(isntSemanticPushableElem && {
      role: 'button',
      tabIndex: -1,
      style: { cursor: 'pointer' },
    }),
    ...(isSubmit && { type: 'submit' }),
  }
  return { isPushed, pushPropList }
}

export { usePush }
