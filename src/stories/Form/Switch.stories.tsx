import { useArgs } from "@storybook/preview-api";

import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "../../../lib/main";
import "../../index.css";

const meta = {
	title: "Form/Switch",
	component: Switch,
	tags: ["autodocs"],
} satisfies Meta<typeof Switch>;

export default meta;

export const Base: StoryObj<typeof Switch> = {
	args: {
		isToggle: false,
	},
	render: function Render(args) {
		const [, changeArgs] = useArgs();
		return (
			<>
				<Switch
					title="Switch"
					label="Switch"
					isVertical={false}
					onChange={(isToggle) => changeArgs({ isToggle })}
					className={({ isToggle }) =>
						`${
							isToggle ? "bg-prim" : "bg-gray-200"
						} w-12 h-6 items-center rounded-full duration-150 shadow-md flex p-2`
					}
				>
					<Switch.Children className="w-6 h-6 bg-white rounded-full duration-150"></Switch.Children>
				</Switch>
			</>
		);
	},
};
