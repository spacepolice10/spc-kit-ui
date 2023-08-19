import { useHover } from "../hook/useHover";

export default function HoverDemo() {
  const { isHovered, hoverPropList } = useHover();
  return (
    <div
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
        backgroundColor: isHovered ? "orangered" : "",
        color: isHovered ? "white" : "",
        transitionDuration: "120ms",
      }}
    >
      Hover
    </div>
  );
}
