import { useFocusScope } from "./useFocusScope";
import { useKeyboard } from "../../keyboard/hook/useKeyboard";

export default function FocusScopeDemo() {
  const { focusNextElem, focusPrevElem, focusScopeRef } = useFocusScope();
  const { keyboardPropList } = useKeyboard({
    ArrowLeft: focusPrevElem,
    ArrowRight: focusNextElem,
  });
  return (
    <div {...keyboardPropList} className="flex justify-between demo_section">
      <div
        ref={focusScopeRef}
        style={{
          display: "flex",
          border: "none",
          justifyContent: "space-evenly",
          width: "100%",
        }}
      >
        <button className="border p-2 rounded-md">Something</button>
        <button className="border p-2 rounded-md">Is</button>
        <button className="border p-2 rounded-md">Blocked</button>
        <button className="border p-2 rounded-md">In</button>
        <button className="border p-2 rounded-md">Focus</button>
        <button className="border p-2 rounded-md">Scope</button>
        <button className="border p-2 rounded-md">Right</button>
        <button className="border p-2 rounded-md">Now</button>
        <button className="border p-2 rounded-md">😘</button>
      </div>
    </div>
  );
}
