import {
	AppWindow,
	Cards,
	Info,
} from "@phosphor-icons/react";
import OverlaysDemo from "../../lib/overlays/overlay/test/OverlaysDemo";
import PopoverDemo from "../../lib/overlays/popover/test/PopoverDemo";
import Demo from "./Demo";
import TooltipsDemo from "../../lib/overlays/tooltip/test/TooltipsDemo";

export default function OverlaysListDemo() {
	return (
		<section>
			<h2>Overlays:</h2>
			<div className="grid sm:grid-cols-2 gap-2">
				<Demo
					name="usePopover, Popover:"
					desc="Popovers break the DOM flow and appear near the anchor-element to show content that is usually hidden. The best examples of such components are: selection lists and tooltips."
					Icon={Cards}>
					<PopoverDemo />
				</Demo>
				<Demo
					name="useOverlay, Overlay:"
					desc="Overlays help to build modals and dialogs. The component and hook are flexible enough to minimizing all the hustle related to creation of accessible and useful overlay components."
					Icon={AppWindow}>
					<OverlaysDemo />
				</Demo>
			</div>
			<div className="grid sm:grid-cols-2 gap-2">
				<Demo
					name="useTooltip, Tooltip:"
					desc="Tooltips are small overlay-components that show useful information when user hovers pointer element over it. In pure HTML you would use title but it is not so powerful as useTooltip or Tooltip components"
					Icon={Info}>
					<TooltipsDemo />
				</Demo>
			</div>
		</section>
	);
}
