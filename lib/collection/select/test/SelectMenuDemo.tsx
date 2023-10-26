import { Selection } from "@phosphor-icons/react";
import Demo from "../../../../src/demo/Demo";
import { SelectMenu } from "../components/SelectMenu";

function SelectMenuDemoElem() {
	return <SelectMenu></SelectMenu>;
}

export default function SelectMenuDemo() {
	return (
		<Demo name="SelectMenu" desc="" Icon={Selection}>
			<SelectMenuDemoElem />;
		</Demo>
	);
}
