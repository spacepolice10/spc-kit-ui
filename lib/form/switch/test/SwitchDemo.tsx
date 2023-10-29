import { Switch, SwitchBody } from "../components/Switch";

export default function SwitchDemo() {
	return (
		<>
			<div className="flex gap-4 items-center bg-pastelGray/20 rounded-md w-full p-4">
				<Switch
					role="checkbox"
					label="Switch demo"
					title="Switcher"
					className={({ isToggle }) =>
						`${
							isToggle && "bg-prim"
						} w-12 h-6 flex items-center rounded-full bg-pastelGray duration-100`
					}
				>
					<SwitchBody className="rounded-full shadow-sm w-6 h-6 bg-white duration-100 " />
				</Switch>
				<p className="uppercase font-bold">
					turn on dark mode
				</p>
			</div>
			<div className="flex gap-4 items-center bg-pastelGray/20 rounded-md w-full p-4">
				<Switch
					role="checkbox"
					label="Switch demo"
					title="Switcher"
					className={({ isToggle }) =>
						`${
							isToggle && "bg-prim"
						} w-12 h-6 flex items-center rounded-full bg-pastelGray duration-100`
					}
				>
					<SwitchBody className="rounded-full shadow-sm w-6 h-6 bg-white duration-100 " />
				</Switch>
				<p className="uppercase font-bold">turn on ????</p>
			</div>
		</>
	);
}
