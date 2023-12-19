import { UserFocus } from "@phosphor-icons/react";
import { StoryObj } from "@storybook/react";
import { useFocusType } from "../../../lib/interactions";
import { useFocus, useHover } from "../../../lib/main";

const meta = {
	title: "Interactions/Focus",
	tags: ["autodocs"],
};

export default meta;

export const Base: StoryObj<useFocusType> = {
	args: {
		onFocus: () => {
			return;
		},
	},
	render: RenderFocusDemo,
};

function RenderFocusDemo(args) {
	const { isFocused, focusPropList } = useFocus();
	const { isHovered, hoverPropList } = useHover();
	return (
		<button
			{...focusPropList}
			{...hoverPropList}
			className={`
      press_hover_focus relative
      ${isFocused && isHovered && "!bg-primHovering"}
      ${isFocused && "!bg-secondHovering !text-prim"}
      ${!isFocused && isHovered && "!bg-primHovering"}
      `}
		>
			<div>
				<UserFocus />
				Focus
			</div>
			<p
				className={`absolute inset-2 !text-prim ${
					isFocused ? "opacity-100" : "opacity-0"
				}`}
			>
				[ed]
			</p>
		</button>
	);
}
