import { useArgs } from "@storybook/preview-api";

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { RadioGroupType } from "../../../lib/form/radio_group";
import { Radio } from "../../../lib/main";
import "../../index.css";

const meta = {
	title: "Form/RadioGroup",
	component: Radio,
	tags: ["autodocs"],
} satisfies Meta<typeof Radio>;

export default meta;

export const Base: StoryObj<RadioGroupType<any>> = {
	args: {
		selectedId: "2",
		data: [
			{ id: "1", pixels: 30 },
			{ id: "2", pixels: 38 },
			{ id: "3", pixels: 44 },
			{ id: "4", pixels: 50 },
		],
		isControlled: false,
		children: () => <></>,
	},
	render: function Render(args) {
		const [, changeArgs] = useArgs();

		return (
			<>
				<p className="border w-fit p-2 mb-4 rounded-md text-xs">
					{args.selectedId}
				</p>
				<Radio.Group
					isHorizontal={true}
					data={args.data as { id: string; pixels: number }[]}
					// selectedId={selected}
					// isSelectOnFocusing={true}
					onChange={(selectedId) =>
						changeArgs({ selectedId })
					}
					className="flex items-start gap-2"
				>
					{(item) => (
						<Radio
							title=""
							label=""
							{...item}
							className={({ isToggle }) =>
								`${
									isToggle
										? "bg-prim !text-white"
										: "bg-pastelGray/20"
								} 

						rounded-full p-2 font-bold italic text-textPrim w-10 h-10 duration-100 focus:border-prim border`
							}
						>
							{item.id}
						</Radio>
					)}
				</Radio.Group>
			</>
		);
	},
};
export const Shirts: StoryObj<RadioGroupType<any>> = {
	args: {
		selectedId: "m",
		data: [
			{ id: "xs", pixels: 30 },
			{ id: "m", pixels: 38 },
			{ id: "xl", pixels: 44 },
			{ id: "2xl", pixels: 50 },
		],
		isControlled: false,
		children: () => <></>,
	},
	render: function Render(args) {
		const [, changeArgs] = useArgs();
		const [chosenColor, setChosenColor] = useState("black");

		const colors = [
			{ id: "black", color: "#163300" },
			{ id: "blue", color: "#A0E1E1" },
			{ id: "orange", color: "#FFC091" },
			{ id: "neon", color: "#9FE870" },
		];
		return (
			<div className="rounded-lg flex flex-col gap-4 bg-pastelGray/20 p-8">
				<Radio.Group
					isHorizontal={true}
					data={args.data as { id: string; pixels: number }[]}
					// selectedId={selected}
					// isSelectOnFocusing={true}
					onChange={(selectedId) =>
						changeArgs({ selectedId })
					}
					className="flex items-start gap-2"
				>
					{(item) => (
						<Radio
							title=""
							label=""
							{...item}
							className={({ isToggle }) =>
								`
								text-[${item.pixels}px]
								${isToggle ? "bg-prim !text-white" : "bg-textPrim text-prim"} 

						rounded-md p-2 font-bold italic w-10 h-10 duration-100 focus:border-prim focus:text-pastelOrange border`
							}
						>
							{item.id}
						</Radio>
					)}
				</Radio.Group>
				<Radio.Group
					isHorizontal={true}
					data={colors}
					selectedId={chosenColor}
					onChange={setChosenColor}
					className="flex items-start gap-2"
				>
					{(color) => (
						<Radio
							role="checkbox"
							label={color.id}
							title={color.id}
							className={({ isToggle }) =>
								`${
									isToggle
										? "border-second"
										: "border-pastelGray/20"
								} 
						rounded-full border bg-pastelGray/20 p-2 text-textPrim w-10 h-10 duration-100 flex items-center justify-center focus:border-prim`
							}
							key={color?.id}
							{...color}
						>
							{({ isToggle }) =>
								isToggle && (
									<span
										style={{
											backgroundColor: color.color,
										}}
										className="w-8 h-8 flex-shrink-0 rounded-full block"
									></span>
								)
							}
						</Radio>
					)}
				</Radio.Group>
				<div className="pt-8 w-40 order-1 relative h-full">
					<div className="border-white h-[208px] overflow-hidden">
						<img
							src="/pullover.png"
							alt="Photo of `a sneaker` by Erik Mclean"
							className="w-40 h-52 object-cover "
						/>
					</div>
					<p className="text-xs mt-4 px-2 text-right">
						Photo by{" "}
						<a
							className="text-prim hover:underline"
							href="https://unsplash.com/@ryanhoffman007?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
						>
							Ryan Hoffman
						</a>{" "}
						on{" "}
						<a
							className="text-prim hover:underline"
							href="https://unsplash.com/photos/czLSitCJ3Dw?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
						>
							Unsplash
						</a>
					</p>
				</div>
			</div>
		);
	},
};
