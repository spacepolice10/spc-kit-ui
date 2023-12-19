import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { LongPushButton } from "../../../lib/button/long_push_button/LongPushButton";
import { Button } from "../../../lib/main";
import "../../index.css";

const meta = {
	title: "Button/LongPushButton",
	component: Button,
	tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LongPush: Story = {
	args: {
		title: "Button",
		label: "Button",
	},
	render: function Render(args) {
		const [holded, setHolded] = useState(false);
		return (
			<div className="flex gap-4 items-center">
				<LongPushButton
					title="Long push button"
					label="Long push button"
					className={({ isPressed }) =>
						`${
							isPressed && "scale-105"
						} button !bg-pastelPink hover:brightness-95`
					}
					onPressStarts={() => setHolded(true)}
					onPressFinishes={() => setHolded(false)}
					onPress={() => alert("that was long")}
					delay={800}
				>
					Push it longer
				</LongPushButton>
				<p>it is {holded ? "holded" : "released"}</p>
			</div>
		);
	},
};
