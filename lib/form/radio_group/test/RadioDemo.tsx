import { useState } from "react";
import { RadioGroup } from "../components/RadioGroup";
import { Radio } from "../components/Radio";
import {
	Check,
	CreditCard,
	Dress,
	Money,
	Sneaker,
	SneakerMove,
} from "@phosphor-icons/react";

export default function RadioDemo() {
	const sizes = [
		{ id: "xs", pixels: 30 },
		{ id: "m", pixels: 38 },
		{ id: "xl", pixels: 44 },
		{ id: "2xl", pixels: 50 },
	];
	const colors = [
		{ id: "black", color: "#163300" },
		{ id: "blue", color: "#A0E1E1" },
		{ id: "orange", color: "#FFC091" },
		{ id: "neon", color: "#9FE870" },
	];
	const payment = [
		{ id: "card", text: "with card", icon: <CreditCard /> },
		{ id: "cash", text: "with cash", icon: <Money /> },
	];
	const [selected, setSelected] = useState("xs");
	const [chosenColor, setChosenColor] = useState("black");
	const [chosenPayment, setChosenPayment] = useState("");
	return (
		<div>
			<div className="flex pl-4 gap-4 mb-4 w-52 h-16 border rounded-lg items-center">
				<SneakerMove
					style={{
						color: colors.find(
							(color) => color.id == chosenColor
						).color,
					}}
					size={
						sizes.find((size) => size.id == selected).pixels
					}
					className="text-pastelGray duration-100"
				/>
				<Sneaker
					style={{
						color: colors.find(
							(color) => color.id == chosenColor
						).color,
					}}
					size={
						sizes.find((size) => size.id == selected).pixels
					}
					className="text-pastelGray duration-100"
				/>
			</div>
			<div className="p-2 rounded-md">
				<p className="mb-2">What size?</p>
				<RadioGroup
					items={sizes as { id: string; pixels: number }[]}
					selectedId={selected}
					isSelectOnFocusing={true}
					className="flex items-start gap-2"
					onChange={setSelected}
				>
					{sizes.map((x) => (
						<Radio
							hoverTitle={x.id}
							className={({ isToggle, isHovered }) =>
								`${
									isToggle
										? "bg-prim !text-white"
										: "bg-pastelGray/20"
								} 
              ${isHovered && "!bg-primHovering !text-white"} 
              rounded-md p-2 text-textPrim w-10 h-10 duration-100`
							}
							key={x?.id}
							{...x}
						>
							<p>{x.id}</p>
						</Radio>
					))}
				</RadioGroup>
			</div>
			<div className="p-2 rounded-md">
				<p className="mb-2">What colour?</p>
				<RadioGroup
					items={colors}
					selectedId={chosenColor}
					onChange={setChosenColor}
					className="flex items-start gap-2"
				>
					{colors.map((x) => (
						<Radio
							hoverTitle={x.id}
							className={({ isToggle, isHovered }) =>
								`${
									isToggle
										? "border-second"
										: "border-pastelGray/20"
								} 
              ${
								isHovered && "!border-primHovering text-white"
							} 
              rounded-full border bg-pastelGray/20 p-2 text-textPrim w-10 h-10 duration-100 flex items-center justify-center`
							}
							key={x?.id}
							{...x}
						>
							{({ isToggle }) =>
								isToggle && (
									<span
										style={{ backgroundColor: x.color }}
										className="w-8 h-8 flex-shrink-0 rounded-full block"
									></span>
								)
							}
						</Radio>
					))}
				</RadioGroup>
			</div>
			<div className="p-2 rounded-md">
				<p className="mb-2">Cash or card?</p>
				<RadioGroup
					items={payment}
					selectedId={chosenPayment}
					onChange={setChosenPayment}
					className="flex flex-col items-start gap-2"
				>
					{payment.map((x) => (
						<Radio
							hoverTitle={x.text}
							className={({ isToggle, isHovered }) =>
								`${
									isToggle
										? "border-second"
										: "border-pastelGray/20"
								} 
              ${isHovered && "!bg-pastelGray/60"} 
              rounded-sm border bg-pastelGray/20 p-2 text-textPrim w-full h-8 duration-100 flex items-center justify-center`
							}
							key={x?.id}
							{...x}
						>
							{({ isToggle }) => (
								<div className="w-full flex items-center gap-4 p-2">
									<div className="h-5 w-5">
										{isToggle && <Check />}
									</div>
									{x.icon}
									<p>{x.text}</p>
								</div>
							)}
						</Radio>
					))}
				</RadioGroup>
			</div>
		</div>
	);
}
