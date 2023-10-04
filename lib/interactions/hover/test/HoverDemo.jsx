import { useHover } from '../components/useHover.js'

export default function HoverDemo() {
  const { isHovered, hoverPropList } = useHover()
  return (
    <button
      {...hoverPropList}
      className={`press_hover_focus ${
        isHovered && '!bg-primHovering'
      }`}
    >
      Hover
    </button>
  )
}
