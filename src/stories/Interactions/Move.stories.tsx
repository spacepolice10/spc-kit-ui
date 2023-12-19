import { StoryObj } from "@storybook/react";
import { useMoveType } from "../../../lib/interactions";
import { useMove } from "../../../lib/main";

const meta = {
	title: "Interactions/Move",
	tags: ["autodocs"],
};

export default meta;
export const Base: StoryObj<useMoveType> = {
	args: {
		withClamping: false,
	},
	render: RenderMoveDemo,
};

function RenderMoveDemo(args) {
	const { coords, movePropList, isMoving } = useMove(args);
	return (
		<div>
			<div
				className={`h-52 p-2 border rounded-md relative flex flex-col justify-end items-end ${
					args.withClamping && "border-prim"
				}`}
			>
				<div className="text-textSecond font-bold opacity-20 uppercase">
					move that ball around
				</div>
				<button
					className={`bg-prim border border-transparent focus:border-pastelBlue rounded-full absolute w-10 h-10 opacity-80 scale-0.9 ${
						isMoving && "bg-pastelOrange"
					}`}
					{...movePropList}
					style={{
						left: coords.x ?? 0,
						top: coords.y ?? 0,
					}}
				></button>
			</div>
			<div className="w-96 my-2 border p-2">
				<p className="font-bold italic">coords:</p>
				<div className="flex gap-4">
					<p className="font-bold text-gray-400">
						X: {coords.x}
					</p>
					<p className="font-bold text-gray-400">
						Y: {coords.y}
					</p>
				</div>
			</div>
		</div>
	);
}
