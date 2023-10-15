import { useState } from "react";
import { Checkbox } from "../components/Checkbox";
import { CheckboxCollection } from "../components/CheckboxCollection";
import { Check } from "@phosphor-icons/react";

export default function CheckboxDemo() {
	const [foodList, setFoodList] = useState([
		{
			id: "potatoes",
			emoji: "🍟",
			name: "French fries",
			isToggle: false,
		},
		{
			id: "pepper",
			emoji: "🌶️",
			name: "Pepper",
			isToggle: false,
		},
		{
			id: "box",
			emoji: "🥡",
			name: "Takeout box",
			isToggle: false,
		},
		{
			id: "water",
			emoji: "💧",
			name: "Drinks",
			isToggle: false,
		},
	]);
	return (
		<>
			<div className="">
				<div className="text-2xl flex items-center gap-4 mb-2 w-fit">
					🍟 🌶️ 🥡 💧
				</div>
				<p className="mb-4">Don't forget to take...</p>
				<CheckboxCollection
					items={foodList}
					onChange={setFoodList}
					className="flex flex-col gap-2"
				>
					{foodList.map((food) => (
						<Checkbox
							{...food}
							hoverTitle={food.name}
							className="flex gap-2 items-center"
						>
							{({ isToggle }) => (
								<>
									<div
										className={`${
											isToggle && "text-prim bg-white"
										} w-5 h-5 flex items-center justify-center border border-pastelGray duration-75`}
									>
										{isToggle && (
											<Check
												weight="bold"
												className="animate-show"
											/>
										)}
									</div>
									<p>{food.name}</p>
								</>
							)}
						</Checkbox>
					))}
				</CheckboxCollection>
			</div>
		</>
	);
}
