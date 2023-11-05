import { CursorClick } from "@phosphor-icons/react";
import { useHover } from "../../hover/useHover.ts";
import { usePush } from "../usePush.ts";

export default function PushDemo() {
	const { pushPropList } = usePush({
		onPush: () => alert("Hi yo!"),
		isntSemanticPushableElem: false,
	});
	const { isHovered, hoverPropList } = useHover();
	return (
		<button
			{...pushPropList}
			{...hoverPropList}
			className={`press_hover_focus 
      ${isHovered && "!bg-primHovering"}`}
		>
			<CursorClick />
			Press
		</button>
	);
}
