import { useArgs } from "@storybook/preview-api";

import type { Meta, StoryObj } from "@storybook/react";
import { CheckboxCollectionType } from "../../../lib/form/checkbox";
import { Checkbox } from "../../../lib/main";
import "../../index.css";

const meta = {
	title: "Form/CheckboxCollection",
	component: Checkbox,
	tags: ["autodocs"],
} satisfies Meta<typeof Checkbox>;

export default meta;

export const Base: StoryObj<CheckboxCollectionType<any>> = {
	args: {
		data: [
			{
				id: "potatoes",
				emoji: "🍟",
				name: "French fries (+10)",
				isToggle: true,
			},
			{
				id: "pepper",
				emoji: "🌶️",
				name: "Pepper (+14)",
				isToggle: false,
			},
			{
				id: "box",
				emoji: "🥡",
				name: "Takeout box (+40)",
				isToggle: false,
			},
			{
				id: "water",
				emoji: "💧",
				name: "Drinks (+36)",
				isToggle: false,
			},
		],
		isControlled: false,
		children: () => <></>,
	},
	render: function Render(args) {
		{
			const [, changeArgs] = useArgs();
			return (
				<>
					<div className="flex gap-2">
						<div>
							<p className="mb-2 px-2 italic font-bold">
								Don't forget to take...
							</p>
							<Checkbox.Collection
								data={args.data}
								onChange={(data) =>
									changeArgs({
										data,
									})
								}
								className="flex flex-col gap-2"
							>
								{(item) => (
									<Checkbox
										title=""
										label=""
										{...item}
										className={({ isToggle }) =>
											`${
												isToggle
													? "bg-prim !text-white"
													: "bg-pastelGray/20"
											} 
						rounded-md p-2 text-textPrim duration-100 focus:border-prim border`
										}
									>
										{item.id}
										{item?.emoji}
									</Checkbox>
								)}
							</Checkbox.Collection>
						</div>
					</div>
				</>
			);
		}
	},
};
