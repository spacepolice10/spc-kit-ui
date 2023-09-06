import { useHover } from "../../hover/hook/useHover";
import { usePush } from "../hook/usePush";

export default function PushDemo() {
  const { pushPropList } = usePush({
    onPush: () => alert("Hi yo!"),
    isntSemanticPushableElem: true,
  });
  const { isHovered, hoverPropList } = useHover();
  return (
    <div
      {...pushPropList}
      {...hoverPropList}
      className={`font-bold font-italic flex justify-center items-center rounded-lg h-16 w-16 border p-4 duration-100 ${
        isHovered && "bg-slate-50"
      }`}
    >
      Press
    </div>
  );
}
