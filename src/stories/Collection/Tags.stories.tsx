import { useArgs } from "@storybook/preview-api";

import { Plus, X } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tags } from "../../../lib/main";
import "../../index.css";

const meta = {
	title: "Collection/Tags",
	component: Tags,
	tags: ["autodocs"],
} satisfies Meta<typeof Tags>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {
		data: [
			{ id: "Sample chip" },
			{ id: "Cake" },
			{ id: "Chip with ????" },
			{ id: "Fish & chip" },
		],
		children: () => <></>,
	},
	render: function Render(args) {
		const [, changeArgs] = useArgs();
		return (
			<>
				<Tags
					data={args.data}
					onChange={(data) => changeArgs({ data })}
					className="flex border rounded-lg p-2 flex-wrap gap-2 items-start justify-start h-32 overflow-scroll"
				>
					{(item) => (
						<Tags.Chip
							title="Chip"
							label="Chip"
							className="button !rounded-md !bg-pastelGray/20 justify-between hover:!bg-pastelGray/40 !w-fit"
							{...item}
						>
							{({ remove }) => (
								<div className="flex gap-2">
									<p>{item.id}</p>
									<button
										onClick={remove}
										className="rounded-full p-[4px] hover:bg-gray-400"
									>
										<X />
									</button>
								</div>
							)}
						</Tags.Chip>
					)}
				</Tags>
				<div className="mt-4">
					<button
						className="button !text-white"
						onClick={() =>
							changeArgs({
								data: args.data.concat({
									id: window.crypto
										.randomUUID()
										.slice(-4)
										.toString(),
								}),
							})
						}
					>
						<Plus />
						Add tag
					</button>
				</div>
			</>
		);
	},
};
