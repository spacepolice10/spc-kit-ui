import { PushPin } from "@phosphor-icons/react";
import { useArgs } from "@storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react";
import { ToggleButton } from "../../../lib/button/toggle_button/ToggleButton";
import "../../index.css";

const meta = {
	title: "Button/ToggleButton",
	component: ToggleButton,
	tags: ["autodocs"],
} satisfies Meta<typeof ToggleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {
		title: "Button",
		label: "Button",
		isToggle: false,
		className: "button",
	},
	render: function Render(args) {
		const [, changeArgs] = useArgs();
		return (
			<>
				<ToggleButton
					{...args}
					onChange={(isToggle) => changeArgs({ isToggle })}
				>
					<div className="flex w-full justify-between items-center">
						<PushPin
							weight={args.isToggle ? "fill" : "regular"}
						/>
						<p>Toggle</p>
					</div>
				</ToggleButton>
			</>
		);
	},
};
