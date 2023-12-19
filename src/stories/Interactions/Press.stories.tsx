import { CursorClick } from "@phosphor-icons/react";
import { StoryObj } from "@storybook/react";
import { useState } from "react";
import { usePressType } from "../../../lib/interactions";
import { useHover, usePress } from "../../../lib/main";

const meta = {
	title: "Interactions/Press",
	tags: ["autodocs"],
};

export default meta;

export const Base: StoryObj<usePressType> = {
	args: {
		onPress: () => {
			alert("hey yo!");
		},
	},
	render: RenderPressDemo,
};

function RenderPressDemo(args) {
	const [clickCount, setClickCount] = useState(0);
	const { isPressed, pressPropList } = usePress({
		onPress: () => setClickCount((prev) => ++prev),
		isntSemanticElem: false,
	});
	const { isHovered, hoverPropList } = useHover();
	return (
		<div className="border p-2 rounded-md flex gap-10 items-center w-52">
			<button
				{...pressPropList}
				{...hoverPropList}
				className={`press_hover_focus cursor-pointer relative 
      		${isHovered && "!bg-primHovering"}
			${isPressed && "!bg-secondHovering !text-prim"}
			`}
			>
				<div>
					<CursorClick />
					Press
				</div>
				<p
					className={`absolute inset-2 !text-prim ${
						isPressed ? "opacity-100" : "opacity-0"
					}`}
				>
					[ed]
				</p>
			</button>
			<div className="text-center">
				<p className="text-xs text-gray-400">pressed</p>
				<p className="font-bold text-4xl">{clickCount}</p>
				<p className="text-xs text-gray-400">times</p>
			</div>
		</div>
	);
}
