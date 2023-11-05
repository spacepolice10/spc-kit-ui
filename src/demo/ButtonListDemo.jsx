import {
	CursorClick,
	PushPin,
	Timer,
} from "@phosphor-icons/react";
import { SingleButtonDemo } from "../../lib/button/button/test/SingleButtonDemo";
import { ToggleButtonDemo } from "../../lib/button/toggle_button/test/ToggleButtonDemo";
import Demo from "./Demo";

export default function ButtonListDemo() {
	return (
		<section>
			<h2>Button:</h2>
			<div className="grid sm:grid-cols-2 gap-2">
				<Demo name="useButton, Button:" Icon={CursorClick}>
					<SingleButtonDemo />
				</Demo>
				<Demo name="LongPushButton:" Icon={Timer}>
					{/* <LongPushButtonDemo /> */}
				</Demo>
				<Demo name="ToggleButton:" Icon={PushPin}>
					<ToggleButtonDemo />
				</Demo>
			</div>
		</section>
	);
}
