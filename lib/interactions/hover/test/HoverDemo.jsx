import { Hand } from "@phosphor-icons/react";
import { useHover } from "../components/useHover.ts";

export default function HoverDemo() {
	const { isHovered, hoverPropList } = useHover();
	return (
		<button
			{...hoverPropList}
			className={`press_hover_focus relative ${
				isHovered && "!bg-primHovering"
			}`}>
			<Hand />
			Hover
			<p
				className={`absolute inset-2 !text-textPrim ${
					isHovered ? "opacity-100" : "opacity-0"
				}`}>
				[ed]
			</p>
		</button>
	);
}
