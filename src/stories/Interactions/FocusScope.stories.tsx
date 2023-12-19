import { StoryObj } from "@storybook/react";
import { useFocusScopeType } from "../../../lib/interactions";
import {
	useFocusScope,
	useKeyboard,
} from "../../../lib/main";

const meta = {
	title: "Interactions/FocusScope",
	tags: ["autodocs"],
};

export default meta;

export const Base: StoryObj<useFocusScopeType> = {
	args: {
		isTabbingTrapped: false,
	},
	render: RenderFocusScopeDemo,
};

function RenderFocusScopeDemo(args) {
	const { focusNextElem, focusPrevElem, focusScopePropList } =
		useFocusScope(args);
	const { keyboardPropList } = useKeyboard({
		ArrowLeft: focusPrevElem,
		ArrowRight: focusNextElem,
	});

	return (
		<div
			className="flex flex-wrap w-full gap-2"
			{...keyboardPropList}
			{...focusScopePropList}
		>
			<button className="focus_scope_items">Something</button>
			<button className="focus_scope_items">Is</button>
			<button className="focus_scope_items">Blocked</button>
			<button className="focus_scope_items">In</button>
			<button className="focus_scope_items">Focus</button>
			<button className="focus_scope_items">Scope</button>
			<button className="focus_scope_items">Right</button>
			<button className="focus_scope_items">Now</button>
			<button className="focus_scope_items">😘</button>
		</div>
	);
}
