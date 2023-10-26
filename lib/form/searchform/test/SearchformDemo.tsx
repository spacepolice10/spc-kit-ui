import { MagnifyingGlass } from "@phosphor-icons/react";
import { Searchform } from "..";
import Demo from "../../../../src/demo/Demo";

function SearchformDemoElem() {
	return (
		<Searchform
			className={"textform"}
			label="Searchform demo"
			onSubmit={(text: string) => alert(text)}
		/>
	);
}

export default function SearchformDemo() {
	return (
		<Demo
			name="useSearchform, Searchform"
			desc="It is a thin wrapper around native HTML-input with type=search. It is manually handles some actions like cancelling and submitting so it easier to interact with the data stored inside React."
			Icon={MagnifyingGlass}
		>
			<div className="flex gap-2">
				<SearchformDemoElem />
			</div>
		</Demo>
	);
}
