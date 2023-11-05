import { DotsThreeCircle } from "@phosphor-icons/react";
import { Button } from "../../../main";
import { Popover } from "../Popover";

export default function PopoverDemo() {
	return (
		<div className="flex justify-between w-full">
			<Popover offset={10} isOverflow={false}>
				<Popover.Trigger
					role="select"
					label="Popover opener"
					title="Popover trigger"
					className={({ isShow }) =>
						`button !p-0 tertiary !w-auto ${
							isShow && "!font-bold"
						}`
					}
				>
					<>
						<div
							className={
								"flex items-center justify-center w-full gap-4"
							}
						>
							<DotsThreeCircle
								size={28}
								className="text-textPrim"
							/>
						</div>
					</>
				</Popover.Trigger>
				<Popover.Content className="bg-white border shadow-md rounded-md w-80 md:w-96 p-2">
					<h4>is it popover? yes:</h4>
					<p className="text-textPrim font-mono text-xs">
						This popover shows custom content that focused by
						default at the moment it appears on screen. The
						actual body of popover may consist of any
						ReactNode. For example list of emojis...
					</p>
					<ul className="text-4xl gap-4 flex items-center justify-center h-full mt-2 [&>li]:text-lg">
						<li>🥯</li>
						<li>🍲</li>
						<li>🍺</li>
						<li>🥙</li>
					</ul>
					<Button
						role="button"
						label="Button inside popover demo"
						title="Button with name `Say hi`"
						className="button second mx-auto mt-4"
					>
						Say hi! 👋
					</Button>
				</Popover.Content>
			</Popover>
			<Popover offset={10} isOverflow={false}>
				<Popover.Trigger
					role="select"
					label="Popover opener"
					title="Popover trigger"
					className={({ isShow }) =>
						`button !p-0 tertiary !w-auto ${
							isShow && "!font-bold"
						}`
					}
				>
					<>
						<div
							className={
								"flex items-center justify-center w-full gap-4"
							}
						>
							<DotsThreeCircle
								size={28}
								className="text-textPrim"
							/>
						</div>
					</>
				</Popover.Trigger>
				<Popover.Content className="bg-white border shadow-md rounded-md w-80 md:w-96 p-2">
					<h4>is it popover? yes:</h4>
					<p className="text-textPrim font-mono text-xs">
						This popover shows custom content that focused by
						default at the moment it appears on screen. The
						actual body of popover may consist of any
						ReactNode. For example list of emojis...
					</p>
					<ul className="text-4xl gap-4 flex items-center justify-center h-full mt-2 [&>li]:text-lg">
						<li>🥯</li>
						<li>🍲</li>
						<li>🍺</li>
						<li>🥙</li>
					</ul>
					<Button
						role="button"
						label="Button inside popover demo"
						title="Button with name `Say hi`"
						className="button second mx-auto mt-4"
					>
						Say hi! 👋
					</Button>
				</Popover.Content>
			</Popover>
		</div>
	);
}
