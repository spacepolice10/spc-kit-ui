import { Rows } from "@phosphor-icons/react";
import Demo from "../../../../src/demo/Demo";
import {
	Menu,
	MenuBody,
	MenuButton,
} from "../components/Menu";

function MenuDemoElem() {
	return (
		<>
			<Menu>
				<MenuButton>TEST</MenuButton>
				<MenuBody className="flex flex-col bg-white">
					<button>fuck that</button>
					<button>fuck IT!</button>
					{/* <FuncTest /> */}
				</MenuBody>
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
