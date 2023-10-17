import { useState } from "react";
import { Checkbox } from "../components/Checkbox";
import { CheckboxCollection } from "../components/CheckboxCollection";
import { Check } from "@phosphor-icons/react";

export default function CheckboxCollectionDemo() {
	const [foodList, setFoodList] = useState([
		{
			id: "potatoes",
			emoji: "🍟",
			name: "French fries (+10)",
			isToggle: false,
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
	]);
	return (
		<>
			<div className="flex gap-2">
				<div>
					<p className="mb-2 px-2 italic font-bold">
						Don't forget to take...
					</p>
					<CheckboxCollection
						items={foodList}
						onChange={setFoodList}
						className="flex flex-col gap-2"
					>
						{foodList.map((food) => (
							<Checkbox
								{...food}
								hoverTitle={food.name}
								className="flex gap-2 items-center hover:bg-pastelGray/20 p-2 focus:border-prim border border-transparent"
							>
								{({ isToggle }) => (
									<>
										<div
											className={`${
												isToggle && "text-prim bg-white"
											} w-5 h-5 flex items-center justify-center rounded-sm border border-pastelGray duration-75`}
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
			</div>
		</>
	);
}
