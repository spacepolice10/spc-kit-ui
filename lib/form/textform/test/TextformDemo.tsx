import { Textbox } from "@phosphor-icons/react";
import { useRef, useState } from "react";
import Demo from "../../../../src/demo/Demo";
import { Textarea } from "../components/Textarea";
import { Textform } from "../components/Textform";
import { useTextform } from "../components/useTextform";

function TextformDemoElem() {
	const [val, setVal] = useState("test");
	const textRef = useRef("");
	const [text, setText] = useState("");
	const { textformPropList, isFocused } = useTextform({
		label: "useTextform demo",
		value: text,
		onInput: setText,
	});
	return (
		<div className="flex flex-col gap-4 w-full">
			<div
				className={`textform border bg-white h-14 flex items-center duration-100 ${
					isFocused && "border-prim"
				}`}
			>
				<div
					className={`${
						isFocused || text.length
							? "-mt-8 text-[8px]"
							: "mt-0"
					} absolute duration-100 pointer-events-none text-pastelGray`}
				>
					useTextform demo with complex styles
				</div>
				<input {...textformPropList} className="w-full" />
			</div>
			<div className="w-full">
				<Textform
					label="Basic input"
					onInput={(data) => (textRef.current = data)}
					className={({ isFocused }) =>
						`${
							isFocused && "border-prim border"
						} border rounded-md p-2 font-sans font-light text-textPrim placeholder:text-base placeholder:text-pastelGray`
					}
					placeholdingText="Basic input"
					isFocusTrapsAfterMount={false}
				/>
			</div>
			<div className="w-full">
				<Textarea
					label="Textarea demo"
					className={({ isFocused }) =>
						`${
							isFocused && "border-prim border"
						} border rounded-md p-2 font-sans font-light text-textPrim placeholder:text-base placeholder:text-pastelGray`
					}
					onInput={setVal}
					onPaste={({ value }) => console.log(value)}
					placeholdingText="useTextform spreaded on native textarea"
					isFocusTrapsAfterMount={false}
				/>
			</div>
		</div>
	);
}

export default function TextformDemo() {
	return (
		<Demo
			name="useTextform, Textform"
			desc="It is a thin wrapper around native HTML-input that helps to interact with textform in a manner of spc-kit. It simplifies manipulating clipboard and hook make it much easier to build complexly styled inputs."
			Icon={Textbox}
		>
			<div className="flex gap-2">
				<TextformDemoElem />
			</div>
		</Demo>
	);
}
