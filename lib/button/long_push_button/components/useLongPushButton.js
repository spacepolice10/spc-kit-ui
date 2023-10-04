import { useFocus } from '../../../interactions/focus/components/useFocus.js'
import { useHover } from '../../../interactions/hover/components/useHover.js'
import {
  useLongPush,
} from '../../../interactions/long_push/components/useLongPush.js'

/**
 * 
 * @param {import('../../../interactions/long_push/components/useLongPush.js').useLongPushType} props 
 * @returns 
 */
const useLongPushButton = (props) => {
  const { isLongPushed, longPushPropList } = useLongPush(props)
  const { isHovered, hoverPropList } = useHover()
  const { isFocused, focusPropList } = useFocus()
  const longPushButtonPropList = {
    ...longPushPropList,
    ...hoverPropList,
    ...focusPropList,
  }
  return {
    isLongPushed,
    isFocused,
    isHovered,
    longPushButtonPropList,
  }
}

export { useLongPushButton }
