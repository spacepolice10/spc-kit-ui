import { Hand } from "@phosphor-icons/react";
import { StoryObj } from "@storybook/react";
import { useHoverType } from "../../../lib/interactions";
import { useHover } from "../../../lib/main";

const meta = {
	title: "Interactions/Hover",
	tags: ["autodocs"],
};

export default meta;

export const Base: StoryObj<useHoverType> = {
	args: {
		onHover: () => {
			return;
		},
	},
	render: RenderHoverDemo,
};
function RenderHoverDemo(args) {
	const { isHovered, hoverPropList } = useHover();
	return (
		<button
			{...hoverPropList}
			className={`press_hover_focus relative ${
				isHovered && "!bg-primHovering"
			}`}
		>
			<Hand />
			Hover
			<p
				className={`absolute inset-2 !text-textPrim ${
					isHovered ? "opacity-100" : "opacity-0"
				}`}
			>
				[ed]
			</p>
		</button>
	);
}
