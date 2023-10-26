import { ListMagnifyingGlass } from "@phosphor-icons/react";
import SearchCombobobxDemo from "../../lib/combobox/search_combobox/test/SearchComboboxDemo";
import Demo from "./Demo";

export default function ComboboxDemo() {
	return (
		<section>
			<h2>Combobox:</h2>
			<div className="grid sm:grid-cols-2 gap-2">
				<Demo
					name="SearchCombobox"
					desc=""
					Icon={ListMagnifyingGlass}
				>
					<SearchCombobobxDemo />
				</Demo>
			</div>
		</section>
	);
}
