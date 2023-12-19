import {
	ArrowDown,
	ArrowLeft,
	ArrowRight,
	ArrowUp,
} from "@phosphor-icons/react";
import { StoryObj } from "@storybook/react";
import { useState } from "react";
import { useKeyboardType } from "../../../lib/interactions";
import { useKeyboard } from "../../../lib/main";

const meta = {
	title: "Interactions/Keyboard",
	tags: ["autodocs"],
};

export default meta;
export const Base: StoryObj<useKeyboardType> = {
	args: {},
	render: RenderKeyboardDemo,
};
function RenderKeyboardDemo(args) {
	const [key, setKey] = useState([]);
	const { keyboardPropList } = useKeyboard({
		Backspace: () => setKey((prev) => prev.slice(0, -1)),
		ArrowRight: () =>
			changeLetter(
				<ArrowRight
					size={20}
					weight="bold"
					className="font-bold text-prim"
				/>
			),
		ArrowLeft: () =>
			changeLetter(
				<ArrowLeft
					size={20}
					weight="bold"
					className="font-bold text-prim"
				/>
			),
		ArrowDown: (ev) => {
			ev.preventDefault();
			changeLetter(
				<ArrowDown
					size={20}
					weight="bold"
					className="font-bold text-prim"
				/>
			);
		},
		ArrowUp: (ev) => {
			ev.preventDefault();
			changeLetter(
				<ArrowUp
					size={20}
					weight="bold"
					className="font-bold text-prim"
				/>
			);
		},
	});
	function changeLetter(letter) {
		if (key.length < 24) {
			setKey((state) => state.concat(letter));
		} else {
			setKey((state) => state.slice(1).concat(letter));
		}
	}
	return (
		<div {...keyboardPropList} className="overflow-hidden">
			<div
				tabIndex={0}
				className="relative w-fit items-end justify-center flex flex-col h-20 p-2 border rounded-md outline-none focus:border-prim focus-within:border-prim"
			>
				<div className="flex gap-2 h-8 overflow-scroll">
					{key.map((letter, i) => (
						<span className="animate-appear" key={i}>
							{letter}
						</span>
					))}
				</div>
				<div className="text-textSecond font-bold opacity-20">
					FOCUS ON ME AND PUSH SOME ARROWS
				</div>
			</div>
		</div>
	);
}
