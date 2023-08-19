import { useFocus } from "../hook/useFocus";
import { useHover } from "../../hover/hook/useHover";

export default function FocusDemo() {
  const { isFocused, focusPropList } = useFocus();
  const { isHovered, hoverPropList } = useHover();
  return (
    <div
      {...focusPropList}
      {...hoverPropList}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 9999,
        padding: 12,
        height: 40,
        width: 40,
        fontWeight: "bold",
        fontStyle: "italic",
        cursor: "pointer",
        backgroundColor: isFocused
          ? "orangered"
          : isHovered
          ? "rgba(100, 100, 100, 0.2)"
          : "",

        color: isFocused ? "white" : "",
        transitionDuration: "120ms",
      }}
    >
      Focus
    </div>
  );
}
