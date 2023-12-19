import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "../../../lib/main";
import "../../index.css";

const meta = {
	title: "Button/Button",
	component: Button,
	tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {
		title: "Button",
		label: "Button",
	},
	render: function Render(args) {
		const [clickCount, setClickCount] = useState(0);
		return (
			<div className="flex gap-4 items-center">
				<Button
					{...args}
					className={({ isPressed }) =>
						`${
							isPressed &&
							"!bg-white/100 hover:bg-white !text-black"
						} button second !rounded-none !w-fit`
					}
					onPress={() => setClickCount((prev) => ++prev)}
				>
					Click!
				</Button>
				<p>click count: {clickCount}</p>
			</div>
		);
	},
};
