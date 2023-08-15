import { useHover } from "../hooks/useHover/useHover";
import { usePush } from "../hooks/usePush/usePush";

export default function PushExample() {
  const { pushPropList } = usePush({
    onPush: () => alert("Hi yo!"),
    isntSemanticPushableElem: true,
  });
  const { isHovered, hoverPropList } = useHover();
  return (
    <div
      {...pushPropList}
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
        backgroundColor: isHovered ? "rgba(100, 100, 100, 0.2)" : "",
      }}
    >
      Press
    </div>
  );
}
