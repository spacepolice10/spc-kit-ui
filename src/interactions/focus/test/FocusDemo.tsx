import { useFocus } from "../hook/useFocus";
import { useHover } from "../../hover/hook/useHover";

export default function FocusDemo() {
  const { isFocused, focusPropList } = useFocus();
  const { isHovered, hoverPropList } = useHover();
  return (
    <div
      {...focusPropList}
      {...hoverPropList}
      className={`font-bold font-italic flex justify-center items-center rounded-lg h-16 w-16 border p-4 duration-100 
      ${isFocused && isHovered && "bg-sky-500"}
      ${isFocused && "bg-sky-400"} 
      ${!isFocused && isHovered && "bg-slate-50"}
     `}
    >
      Focus
    </div>
  );
}
