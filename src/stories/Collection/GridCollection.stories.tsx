import type { Meta, StoryObj } from "@storybook/react";
import { GridCollection } from "../../../lib/collection/grid_collection";
import "../../index.css";

const meta = {
	title: "Collection/GridCollection",
	component: GridCollection,
	tags: ["autodocs"],
} satisfies Meta<typeof GridCollection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {
		data: [
			{ id: "🫀" },
			{ id: "😅" },
			{ id: "👻" },
			{ id: "😺" },
			{ id: "🇰🇬" },
			{ id: "🪝" },
			{ id: "🌇" },
		],
		columnNumber: 4,
		isControlled: false,
		children: <></>,
	},
	render: function Render(args) {
		return (
			<>
				<GridCollection {...args} className="w-60">
					{args.data.map((item) => (
						<button className="button !bg-white !w-fit my-2">
							{item?.id}
						</button>
					))}
				</GridCollection>
			</>
		);
	},
};
