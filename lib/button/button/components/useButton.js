import { useFocus } from '../../../interactions/focus/components/useFocus.js'
import { useHover } from '../../../interactions/hover/components/useHover.js'
import { usePush } from '../../../interactions/push/components/usePush.js'

/**
 * @typedef useButtonType
 * @type {import('../../../interactions/push/components/usePush.js').usePushType &
 * import('../../../interactions/hover/components/useHover.js').useHoverType &
 * import('../../../interactions/focus/components/useFocus.js').useFocusType &
 * {title: string, hoverTitle: string}}
 */

/**
 *
 * @param {useButtonType} props
 * @returns
 */
const useButton = (props) => {
  const { title, hoverTitle } = props
  const { isPushed, pushPropList } = usePush(props)
  const { isHovered, hoverPropList } = useHover({
    onHover: props?.onHover,
    onHoverLoose: props?.onHoverLoose,
  })
  const { isFocused, focusPropList } = useFocus({
    onFocus: props?.onFocus,
    onFocusLoose: props?.onFocusLoose,
  })
  const buttonPropList = {
    title,
    hoverTitle,
    ...pushPropList,
    ...hoverPropList,
    ...focusPropList,
  }
  return {
    isPushed,
    isFocused,
    isHovered,
    buttonPropList,
  }
}

export { useButton }
