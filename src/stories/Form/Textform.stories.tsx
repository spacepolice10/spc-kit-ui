import type { Meta, StoryObj } from "@storybook/react";
import { useRef, useState } from "react";
import { Textform } from "../../../lib/form/textform";
import { Button } from "../../../lib/main";
import "../../index.css";

const meta = {
	title: "Form/Textform",
	component: Textform,
	tags: ["autodocs"],
} satisfies Meta<typeof Textform>;

export default meta;

export const Base: StoryObj<typeof Textform> = {
	args: {},
	render: function Render() {
		const textRef = useRef("");
		const [text, setText] = useState("");
		return (
			<>
				<Textform
					label="Basic input"
					onInput={(data) => (textRef.current = data)}
					className={({ isFocused }) =>
						`${
							isFocused && "border-prim border"
						} border rounded-md p-2 font-sans font-light text-textPrim placeholder:text-base placeholder:text-pastelGray`
					}
					placeholder="Basic input"
					focusOnMount={false}
					isDisabled={false}
				/>
				<div className="py-4 flex gap-4">
					<Button
						title="Show text"
						label="Show text"
						className="button second"
						onPress={() => setText(textRef.current)}
					>
						Show text
					</Button>
					<p className="font-bold py-2">{text}</p>
				</div>
			</>
		);
	},
};
export const Controlled: StoryObj<typeof Textform> = {
	args: {},
	render: function Render() {
		const [text, setText] = useState("");
		return (
			<>
				<Textform
					label="Controlled input"
					value={text}
					onInput={setText}
					className={({ isFocused }) =>
						`${
							isFocused && "border-prim border"
						} border rounded-md p-2 font-sans font-light text-textPrim placeholder:text-base placeholder:text-pastelGray`
					}
					placeholder="Controlled input"
					focusOnMount={true}
					isDisabled={false}
				/>
				<div className="py-4 h-20 flex w-fit mx-auto uppercase gap-4">
					<p className="font-bold py-2">{text}</p>
				</div>
				<Textform
					label="Controlled input"
					value={text}
					onInput={setText}
					className={({ isFocused }) =>
						`${
							isFocused && "border-prim border"
						} border rounded-md p-2 font-sans font-light text-textPrim placeholder:text-base placeholder:text-pastelGray`
					}
					placeholder="Controlled input"
					focusOnMount={true}
					isDisabled={false}
				/>
			</>
		);
	},
};
