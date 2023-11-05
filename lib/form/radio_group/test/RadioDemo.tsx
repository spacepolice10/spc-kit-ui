import {
	Check,
	CreditCard,
	Money,
} from "@phosphor-icons/react";
import { useState } from "react";
import { Radio } from "../Radio";
import { RadioGroup } from "../RadioGroup";

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
	const [chosenPayment, setChosenPayment] = useState("card");
	return (
		<div className="w-full flex justify-between">
			<div className="flex flex-col md:flex-row gap-2 justify-between w-full border">
				<div className="order-2 md:order-1">
					<div className="p-2 rounded-md">
						<p className="mb-2">What size?</p>
						<RadioGroup
							isHorizontal={true}
							items={
								sizes as { id: string; pixels: number }[]
							}
							selectedId={selected}
							isSelectOnFocusing={true}
							className="flex items-start gap-2"
							onChange={setSelected}
						>
							{sizes.map((x) => (
								<Radio
									role="checkbox"
									label="Size picking imitation"
									title={x.id}
									className={({ isToggle, isHovered }) =>
										`${
											isToggle
												? "bg-prim !text-white"
												: "bg-pastelGray/20"
										} 
						${isHovered && "!bg-primHovering !text-white"} 
						rounded-sm p-2 text-textPrim w-10 h-10 duration-100 focus:border-prim border`
									}
									key={x?.id}
									{...x}
								>
									<p className="uppercase">{x.id}</p>
								</Radio>
							))}
						</RadioGroup>
					</div>
					<div className="p-2 rounded-md">
						<p className="mb-2">What colour?</p>
						<RadioGroup
							isHorizontal={true}
							items={colors}
							selectedId={chosenColor}
							onChange={setChosenColor}
							className="flex items-start gap-2"
						>
							{colors.map((x) => (
								<Radio
									role="checkbox"
									label={x.id}
									title={x.id}
									className={({ isToggle, isHovered }) =>
										`${
											isToggle
												? "border-second"
												: "border-pastelGray/20"
										} 
						${isHovered && "!border-primHovering text-white"} 
						rounded-full border bg-pastelGray/20 p-2 text-textPrim w-10 h-10 duration-100 flex items-center justify-center focus:border-prim`
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
									role="checkbox"
									label="Payment method selecting imitation"
									title={x.text}
									className={({ isToggle, isHovered }) =>
										`${
											isToggle
												? "border-second"
												: "border-pastelGray/20"
										} 
						${isHovered && "!bg-pastelGray/60"} 
						rounded-sm border bg-pastelGray/20 p-2 text-textPrim w-full h-8 duration-100 flex items-center justify-center focus:border-prim`
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
				<div className="mx-auto w-40 order-1 pt-2 relative h-full">
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
		</div>
	);
}
