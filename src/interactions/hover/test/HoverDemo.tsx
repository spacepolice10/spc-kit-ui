import { useHover } from "../hook/useHover";

export default function HoverDemo() {
  const { isHovered, hoverPropList } = useHover();
  return (
    <div
      {...hoverPropList}
      className={`font-bold font-italic flex justify-center items-center rounded-lg h-16 w-16 border p-4 duration-100 ${
        isHovered && "bg-emerald-400 text-white"
      }`}
    >
      Hover
    </div>
  );
}
