import { DotsThree } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react";
import { Menu } from "../../../lib/main";
import "../../index.css";

const meta = {
	title: "Collection/Menu",
	component: Menu,
	tags: ["autodocs"],
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {
		data: [{ id: "yo!" }, { id: "tell me!" }],
		isControlled: false,
		children: [<></>],
	},
	render: function Render(args) {
		return (
			<>
				<Menu {...args} className="w-fit h-fit relative">
					<Menu.Button
						title="Open menu"
						label="Open menu"
						className="hover:bg-gray-100 rounded-full p-2"
					>
						<DotsThree />
					</Menu.Button>
					<Menu.Body className="absolute">
						{args.data.map((item) => (
							<button className="button my-2 ">
								{item?.id}
							</button>
						))}
					</Menu.Body>
				</Menu>
			</>
		);
	},
};
export const WithElemBehind: Story = {
	args: {
		data: [{ id: "yo!" }, { id: "tell me!" }],
		isControlled: false,
		children: [<></>],
	},
	render: function Render(args) {
		return (
			<>
				<div className="flex gap-4 border bg-white p-2">
					<Menu {...args} className="w-fit h-fit relative">
						<Menu.Button
							title="Open menu"
							label="Open menu"
							className="hover:bg-gray-100 rounded-full p-2"
						>
							<DotsThree />
						</Menu.Button>
						<Menu.Body className="absolute bg-white p-2 rounded-lg shadow-lg">
							{args.data.map((item) => (
								<button className="button my-2 ">
									{item?.id}
								</button>
							))}
						</Menu.Body>
					</Menu>
					<div>
						<p className="text-xs text-gray-400 border p-2 rounded-md">
							"Sed ut perspiciatis unde omnis iste natus error
							sit voluptatem accusantium doloremque
							laudantium, totam rem aperiam, eaque ipsa quae
							ab illo inventore veritatis et quasi architecto
							beatae vitae dicta sunt explicabo. Nemo enim
							ipsam voluptatem quia voluptas sit aspernatur
							aut odit aut fugit, sed quia consequuntur magni
							dolores eos qui ratione voluptatem sequi
							nesciunt."
						</p>
						<button className="button second text-xs font-bold uppercase my-2 self-end">
							button that does nothing
						</button>
					</div>
				</div>
			</>
		);
	},
};
