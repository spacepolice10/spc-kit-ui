import { Check, List } from "@phosphor-icons/react";
import { useState } from "react";
import Demo from "../../../../src/demo/Demo";
import { Select } from "../components/Select";

function SelectDemoElem() {
	const [itemList, setItemList] = useState([
		{
			id: "Catch me if you can!",
			isSelected: false,
			link: "/movies/catch-me-if-you-can.png",
		},
		{
			id: "Inception",
			isSelected: false,
			link: "/movies/inception.png",
		},
		{
			id: "Titanic",
			isSelected: false,
			link: "/movies/titanic.png",
		},
		{
			id: "Shutter Island",
			isSelected: false,
			link: "/movies/shutter-island.png",
		},
		{
			id: "The Wolf of Wall Street",
			isSelected: false,
			link: "/movies/the-wolf-of-wall-street.png",
		},
		{
			id: "The Great Gatsby",
			isSelected: false,
			link: "/movies/the-great-gatsby.png",
		},
	]);
	return (
		<Select
			items={itemList}
			onChange={setItemList}
			className="flex flex-col overflow-y-scroll border rounded-md shadow-inner h-60"
		>
			{itemList.map((item) => (
				<Select.Item
					label="Movie picker"
					title={item.id}
					role="option"
					key={item.id}
					id={item.id}
					className="flex gap-2 items-center justify-between border-t rounded-md hover:bg-pastelGray/20 w-full p-2 focus-visible:!bg-prim/20"
				>
					{(isSelected) => (
						<>
							<div className="flex gap-2 items-center">
								<div className="w-6">
									{isSelected ? <Check /> : <></>}
								</div>
								<img
									src={item.link}
									className="w-8 h-10 rounded-md overflow-hidden"
								/>
								{item.id}
							</div>
						</>
					)}
				</Select.Item>
			))}
		</Select>
	);
}
export default function SelectDemo() {
	return (
		<Demo
			name="useSelect, Select"
			desc="Select behaves mostly like Checkbox Collection but has different a bit quirkier but much more flexible apis, so devs have no hedges while implementing lists of selectable items."
			Icon={List}
		>
			<SelectDemoElem />
		</Demo>
	);
}
