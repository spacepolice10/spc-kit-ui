import { Rows } from "@phosphor-icons/react";
import Demo from "../../../../src/demo/Demo";
import { Menu } from "../Menu";

function MenuItem({
	id,
	hide,
}: {
	id: string;
	hide?: () => void;
}) {
	return (
		<button
			className="py-2 px-4 border-b hover:bg-pastelGray/20 focus-visible:bg-pastelGray/40"
			onClick={hide}
		>
			{id}
		</button>
	);
}

function MenuDemoElem() {
	return (
		<>
			<Menu items={[{ id: "fuck that" }, { id: "fuck IT!" }]}>
				<Menu.Button
					role="button"
					label="Menu button demo"
					title="Menu button demo"
				>
					TEST
				</Menu.Button>
				<Menu.Body className="flex flex-col bg-white rounded-md shadow-sm">
					<MenuItem id="fuck that" />
					<MenuItem id="fuck IT!" />
					{/* <FuncTest /> */}
				</Menu.Body>
			</Menu>
		</>
	);
}

export default function MenuDemo() {
	return (
		<Demo name="useMenu, Menu" desc="" Icon={Rows}>
			<MenuDemoElem />
		</Demo>
	);
}
