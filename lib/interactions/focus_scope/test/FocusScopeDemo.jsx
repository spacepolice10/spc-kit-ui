import { useFocusScope } from '../components/useFocusScope'
import { useKeyboard } from '../../keyboard/components/useKeyboard'

export default function FocusScopeDemo() {
  const { focusNextElem, focusPrevElem, focusScopeRef } =
    useFocusScope()
  const { keyboardPropList } = useKeyboard({
    ArrowLeft: focusPrevElem,
    ArrowRight: focusNextElem,
  })
  return (
    <div
      className="flex flex-wrap w-full gap-2"
      {...keyboardPropList}
      ref={focusScopeRef}
    >
      <button className="focus_scope_items">Something</button>
      <button className="focus_scope_items">Is</button>
      <button className="focus_scope_items">Blocked</button>
      <button className="focus_scope_items">In</button>
      <button className="focus_scope_items">Focus</button>
      <button className="focus_scope_items">Scope</button>
      <button className="focus_scope_items">Right</button>
      <button className="focus_scope_items">Now</button>
      <button className="focus_scope_items">😘</button>
    </div>
  )
}
