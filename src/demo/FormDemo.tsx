import {
	CheckSquare,
	Checks,
	RadioButton,
	Sliders,
	ToggleLeft,
} from "@phosphor-icons/react";
import CheckboxCollectionDemo from "../../lib/form/checkbox/test/CheckboxCollectionDemo";
import CheckboxDemo from "../../lib/form/checkbox/test/CheckboxDemo";
import RadioDemo from "../../lib/form/radio_group/test/RadioDemo";
import SearchformDemo from "../../lib/form/searchform/test/SearchformDemo";
import SelectDemo from "../../lib/form/select/test/SelectDemo";
import SliderDemo from "../../lib/form/slider/test/SliderDemo";
import SwitchDemo from "../../lib/form/switch/test/SwitchDemo";
import TextformDemo from "../../lib/form/textform/test/TextformDemo";
import Demo from "./Demo";

export default function FormDemo() {
	return (
		<section>
			<h2>Form:</h2>
			<div className="grid sm:grid-cols-2 gap-2">
				<Demo
					name="useSlider, Slider"
					desc="Sliders are often used to show degree of some property or certain amount of progress. It might be achieved using default `html` form but such elements harder to customize and style."
					Icon={Sliders}
				>
					<div className="flex gap-2">
						<SliderDemo />
					</div>
				</Demo>
				<Demo
					name="useRadioGroup, RadioGroup"
					desc="Radio groups help to pick one variant from many options making user select specific element. It is important to understand that radios don't work by themselves."
					Icon={RadioButton}
				>
					<div className="flex gap-2">
						<RadioDemo />
					</div>
				</Demo>
			</div>
			<div className="grid sm:grid-cols-2 gap-2">
				<Demo
					name="useCheckbox, Checkbox"
					desc="Checkbox helps to switch between boolean states. It is often used as a tool to get a consent from a viewer before it could proceed any further in an application (cookies, conditions, etc.)"
					Icon={CheckSquare}
				>
					<CheckboxDemo />
				</Demo>
				<Demo
					name="useSwitch, Switch"
					desc="Switch helps to 'switch' between boolean states. Actually it is not so different from Checkbox, but this one is determined to provide immediate result and is stylistically resembles tumblers"
					Icon={ToggleLeft}
				>
					<SwitchDemo />
				</Demo>
			</div>
			<div className="grid sm:grid-cols-2 gap-2">
				<Demo
					name="CheckboxCollection"
					desc="Checkboxes allow user to select multiple options from the list. They might appear in food delivery applications in registrations forms, etc.."
					Icon={Checks}
				>
					<div className="flex gap-2">
						<CheckboxCollectionDemo />
					</div>
				</Demo>
				<TextformDemo />
			</div>
			<div className="grid sm:grid-cols-2 gap-2">
				<SelectDemo />
				<SearchformDemo />
			</div>
		</section>
	);
}
