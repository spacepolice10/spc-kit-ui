import type { Meta, StoryObj } from "@storybook/react";

import { Eye, Info } from "@phosphor-icons/react";
import { Button, Tooltip } from "../../../lib/main";
import "../../index.css";

const meta = {
	title: "Overlays/Tooltips",
	component: Tooltip,
	tags: ["autodocs"],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {},
	render: function Render() {
		return (
			<Tooltip delay={40}>
				<Tooltip.Trigger className="button !p-0 tertiary !w-fit">
					<Button
						role="button"
						label="Button to use with tootip demo"
						title="Tooltip trigger"
						className="button !p-0 tertiary !w-auto"
						onPress={() => {
							return;
						}}
					>
						<Info size={28} className="text-textPrim" />
					</Button>
				</Tooltip.Trigger>
				<div className="bg-white border shadow-md rounded-md w-auto p-2">
					👁️‍🗨️ here're your tips
				</div>
			</Tooltip>
		);
	},
};
export const Slower: Story = {
	args: {
		axisX: "L",
		isOverflowed: true,
		children: [<></>],
	},
	render: function Render() {
		return (
			<Tooltip delay={600}>
				<Tooltip.Trigger className="button !p-0 tertiary !w-fit">
					<Button
						role="button"
						label="Button to use with tootip demo"
						title="Tooltip Trigger"
						className="button !p-0 tertiary !w-auto"
						onPress={() => alert("hey")}
					>
						<Eye size={28} className="text-textPrim" />
					</Button>
				</Tooltip.Trigger>
				<div className="bg-black text-white border shadow-md rounded-md w-auto p-2">
					👁️ darker
				</div>
			</Tooltip>
		);
	},
};
