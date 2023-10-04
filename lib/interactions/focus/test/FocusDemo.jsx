import { useFocus } from '../components/useFocus.js'
import { useHover } from '../../hover/components/useHover.js'

export default function FocusDemo() {
  const { isFocused, focusPropList } = useFocus()
  const { isHovered, hoverPropList } = useHover()
  return (
    <button
      {...focusPropList}
      {...hoverPropList}
      className={`
      press_hover_focus 
      ${isFocused && isHovered && '!bg-primHovering'}
      ${isFocused && '!bg-secondHovering !text-prim'}
      ${!isFocused && isHovered && '!bg-primHovering'}
      `}
    >
      Focus
    </button>
  )
}
