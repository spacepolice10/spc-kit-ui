import { useFocus } from '../components/useFocus.js'
import { useHover } from '../../hover/components/useHover.js'
import { UserFocus } from '@phosphor-icons/react'

export default function FocusDemo() {
  const { isFocused, focusPropList } = useFocus()
  const { isHovered, hoverPropList } = useHover()
  return (
    <button
      {...focusPropList}
      {...hoverPropList}
      className={`
      press_hover_focus relative
      ${isFocused && isHovered && '!bg-primHovering'}
      ${isFocused && '!bg-secondHovering !text-prim'}
      ${!isFocused && isHovered && '!bg-primHovering'}
      `}
    >
      <div>
        <UserFocus />
        Focus
      </div>
      <p
        className={`absolute inset-2 !text-prim ${
          isFocused ? 'opacity-100' : 'opacity-0'
        }`}
      >
        [ed]
      </p>
    </button>
  )
}
