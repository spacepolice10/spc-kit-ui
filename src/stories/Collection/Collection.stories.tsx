import type { Meta, StoryObj } from "@storybook/react";
import { Collection } from "../../../lib/main";
import "../../index.css";

const meta = {
	title: "Collection/Collection",
	component: Collection,
	tags: ["autodocs"],
} satisfies Meta<typeof Collection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {
		data: [{ id: "yo!" }, { id: "tell me!" }],
		isControlled: false,
		children: <></>,
	},
	render: function Render(args) {
		return (
			<>
				<Collection {...args}>
					{args.data.map((item) => (
						<button className="button my-2">
							{item?.id}
						</button>
					))}
				</Collection>
			</>
		);
	},
};
