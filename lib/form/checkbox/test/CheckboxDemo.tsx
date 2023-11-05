import { Check } from "@phosphor-icons/react";
import { Checkbox } from "../Checkbox";

export default function CheckboxDemo() {
	return (
		<div className="p-2 bg-pastelGray/20 rounded-md">
			<h2 className="my-0 mb-1">🍪 Cookies</h2>
			<p className="!text-textPrim !text-xs">
				We are collecting a lot of information about you and
				would like to force you to agree with that fact in
				case you really need to use our website
			</p>
			<Checkbox
				id="0"
				label="Checkbox imitating cookie acception"
				title="Checkbox"
				className="flex gap-2 items-center hover:bg-pastelGray/20 w-fit rounded-md p-1 mt-3"
			>
				{({ isToggle }) => (
					<>
						<div
							className={`${
								isToggle && "text-pastelGray bg-white"
							} w-5 h-5 flex items-center justify-center rounded-md border border-pastelGray duration-75`}
						>
							{isToggle && (
								<Check
									weight="bold"
									className="animate-show"
								/>
							)}
						</div>
						<p>Okay, no choices anyway</p>
					</>
				)}
			</Checkbox>
		</div>
	);
}
