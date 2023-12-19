import {
	ArrowsOutCardinal,
	CubeFocus,
	HandGrabbing,
	HandPointing,
	Keyboard,
} from "@phosphor-icons/react";
import DragDemo from "../../lib/interactions/drag/test/DragDemo";
import DropDemo from "../../lib/interactions/drop/test/DropDemo";
import FocusDemo from "../../lib/interactions/focus/test/FocusDemo";
import FocusScopeDemo from "../../lib/interactions/focus_scope/test/FocusScopeDemo";
import HoverDemo from "../../lib/interactions/hover/test/HoverDemo";
import KeyboardDemo from "../../lib/interactions/keyboard/test/KeyboardDemo";
import MoveExample from "../../lib/interactions/move/test/MoveDemo";
import PressDemo from "../../lib/interactions/press/test/PressDemo";
import Demo from "./Demo";

export default function InteractionsDemo() {
	return (
		<section>
			<h2>Interactions:</h2>
			<div className="grid sm:grid-cols-2 gap-2">
				<Demo
					name="usePress, useHover, useFocus"
					desc="Mostly these three actions will be the main way to
            interact with interface elements. Push handles any
            pointer events like clicking and touching when hover and
            focus help to react on intermediate state changes."
					Icon={HandPointing}
				>
					<div className="flex gap-2">
						<PressDemo />
						<HoverDemo />
						<FocusDemo />
					</div>
				</Demo>
				<Demo
					name="useKeyboard:"
					desc="It is extremely important to provide great keyboard
            control experience no matter what kind of application
            you create. useKeyboard eases handling keyboard events
            and helps to build keyboard-friendly interfaces"
					Icon={Keyboard}
				>
					<KeyboardDemo />
				</Demo>
			</div>
			<div className="grid sm:grid-cols-2 gap-2">
				<Demo
					name="useDrag, useDrop:"
					desc="Native browser drag & drop pattern can be quite useful
            if implemented right. These hooks simplify the process
            of implementing functionality dependant on moving
            elements using mouse or pointer withour complex APIs."
					Icon={HandGrabbing}
				>
					<div className="flex gap-2 h-20">
						<div className="grid gap-2 w-40 items-center justify-items-center">
							<DragDemo colour={"#9FE870"} />
							<DragDemo colour={"#CDD0CD"} />
							<DragDemo colour={"#A0E1E1"} />
						</div>
						<DropDemo />
					</div>
				</Demo>
				<Demo
					name="useMove:"
					desc=" Sometimes it is impossible to deal with native drag &
            drop only. Interfaces with rich animations and web-games
            are impossible withour much more complex dragging and
            moving objects logic."
					Icon={ArrowsOutCardinal}
				>
					<MoveExample />
				</Demo>
			</div>
			<div className="grid sm:grid-cols-2 gap-2">
				<Demo
					name="useFocusScope:"
					desc="Focus control — one of the main reason developers
            struggle to implement logical, structural and useful
            key-navigation systems in web apps. Scoping of focus
            zones helps to avoid hacking and concenrate on features"
					Icon={CubeFocus}
				>
					<FocusScopeDemo />
				</Demo>

				<div></div>
			</div>
		</section>
	);
}
