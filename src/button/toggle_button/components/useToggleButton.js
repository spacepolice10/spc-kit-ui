import { useToggle } from '../../../form/util/useToggle'
import { useButton } from '../../button/components/useButton'

/**
 * @typedef useToggleButtonType
 * @type {import('../../../form/util/useToggle').useToggleType &
 * import('../../button/components/useButton').useButtonType}
 */

/**
 *
 * @param {useToggleButtonType} props
 * @returns
 */
const useToggleButton = (props) => {
  const { toggle, isToggle } = useToggle(props)
  const { isHovered, isFocused, isPushed, buttonPropList } = useButton({
    ...props,
    onPush: toggle,
  })
  return {
    isHovered,
    isFocused,
    isPushed,
    isToggle,
    buttonPropList,
  }
}

export { useToggleButton }
