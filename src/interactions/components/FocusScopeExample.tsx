import { useFocusScope } from "../hooks/useFocusScope/useFocusScope";
import { useKeyboard } from "../hooks/useKeyboard/useKeyboard";

export default function FocusScopeExample() {
  const { focusNextElem, focusPrevElem, focusScopeRef } = useFocusScope();
  const { keyboardPropList } = useKeyboard({
    ArrowLeft: focusPrevElem,
    ArrowRight: focusNextElem,
  });
  return (
    <div style={{ display: "flex" }} {...keyboardPropList}>
      <div
        ref={focusScopeRef}
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          width: "100%",
        }}
      >
        <button>Something</button>
        <button>Is</button>
        <button>Blocked</button>
        <button>In</button>
        <button>Focus</button>
        <button>Scope</button>
        <button>Right</button>
        <button>Now</button>
        <button>😘</button>
      </div>
    </div>
  );
}
