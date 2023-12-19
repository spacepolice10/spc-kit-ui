import { DotsThreeCircle, X } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react";
import {
	Button,
	Overlay,
	Popover,
} from "../../../../lib/main";
import "../../../index.css";

const meta = {
	title: "Overlays/Popovers",
	component: Popover,
	tags: ["autodocs"],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {
		axisX: "L",
		isOverflowed: true,
		children: [<></>],
	},
	render: function Render(args) {
		return (
			<Popover
				axisX={args.axisX}
				isOverflowed={args.isOverflowed}
				className="w-fit h-fit relative"
			>
				<Popover.Trigger
					role="select"
					label="Popover opener"
					title="Popover trigger"
				>
					<>
						<div
							className={
								"flex items-center justify-center w-full"
							}
						>
							<DotsThreeCircle
								size={28}
								className="text-textPrim"
							/>
						</div>
					</>
				</Popover.Trigger>
				<Popover.Content className="bg-white border shadow-md rounded-md w-80 md:w-96 fixed p-2">
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
		);
	},
};
export const NoSpacesOnRights: Story = {
	args: {
		axisY: "T",
		isOverflowed: false,
		children: [<></>],
	},
	render: function Render(args) {
		return (
			<div className="h-screen w-full flex justify-end">
				<Popover
					axisX={args.axisX}
					isOverflowed={args.isOverflowed}
					className="w-fit h-fit relative"
				>
					<Popover.Trigger
						role="select"
						label="Popover opener"
						title="Popover trigger"
					>
						<>
							<div
								className={
									"flex items-center justify-center w-full"
								}
							>
								<DotsThreeCircle
									size={28}
									className="text-textPrim"
								/>
							</div>
						</>
					</Popover.Trigger>
					<Popover.Content className="bg-white border shadow-md rounded-md w-80 md:w-96 absolute p-2">
						<h4>is it popover? yes:</h4>
						<p className="text-textPrim font-mono text-xs">
							This popover shows custom content that focused
							by default at the moment it appears on screen.
							The actual body of popover may consist of any
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
	},
};
export const NoSpacesOnBottom: Story = {
	args: {
		isOverflowed: false,
		children: [<></>],
	},
	render: function Render(args) {
		return (
			<div className="h-screen flex flex-col justify-end">
				<Popover
					axisX={args.axisX}
					isOverflowed={args.isOverflowed}
					className="w-fit h-fit relative"
				>
					<Popover.Trigger
						role="select"
						label="Popover opener"
						title="Popover trigger"
					>
						<>
							<div
								className={
									"flex items-center justify-center w-full"
								}
							>
								<DotsThreeCircle
									size={28}
									className="text-textPrim"
								/>
							</div>
						</>
					</Popover.Trigger>
					<Popover.Content className="bg-white border shadow-md rounded-md w-80 md:w-96 absolute p-2">
						<h4>is it popover? yes:</h4>
						<p className="text-textPrim font-mono text-xs">
							This popover shows custom content that focused
							by default at the moment it appears on screen.
							The actual body of popover may consist of any
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
	},
};
export const WithDialogInside: Story = {
	args: {
		isOverflowed: false,
		children: [<></>],
	},
	render: function Render(args) {
		return (
			<div className="">
				<Popover
					isOverflowed={true}
					className="relative w-fit h-fit"
				>
					<Popover.Trigger
						role="select"
						label="Popover opener"
						title="Popover trigger"
						className="focus-visible:bg-red-400"
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
					<Popover.Content className="bg-white mb-4 mt-2 border shadow-md rounded-md w-80 md:w-96 p-2 fixed z-[9999]">
						<h4>is it popover? yes:</h4>
						<p className="text-textPrim font-mono text-xs">
							This popover shows custom content that focused
							by default at the moment it appears on screen.
							The actual body of popover may consist of any
							ReactNode. For example list of emojis...
						</p>
						<ul className="text-4xl gap-4 flex items-center justify-center h-full mt-2 [&>li]:text-lg">
							<li>🥯</li>
							<li>🍲</li>
							<li>🍺</li>
							<li>🥙</li>
						</ul>
						<Overlay
							hideOnBackdropPush={true}
							className="bg-black/40 z-[9999] fixed inset-0 w-full h-screen flex justify-center items-center"
						>
							<Overlay.Trigger
								title="Popover"
								label="Popover"
								className="button"
							>
								Open uncontrolled
							</Overlay.Trigger>
							<Overlay.Content className="bg-white w-96 h-40 rounded-md flex flex-col items-start p-4 z-[9999] gap-4">
								{({ hide }) => (
									<>
										<button
											onPointerDown={(ev) =>
												ev.stopPropagation()
											}
											onClick={(ev) => {
												ev.stopPropagation();
												hide();
											}}
											className="h-5 w-5 rounded-full hover:bg-pastelGray/40 flex items-center justify-center focus:!outline"
										>
											<X />
										</button>

										<p className="text-textPrim text-xs">
											That is a primitive dialog window with
											basic functionality. But this one is
											pretty :*
										</p>
										<div className="text-4xl flex items-center justify-center h-full mt-2">
											😘
										</div>
										<Button
											className="button"
											title={""}
											label={""}
										>
											Agree with me
										</Button>
									</>
								)}
							</Overlay.Content>
						</Overlay>
						{/* <Button
						role="button"
						label="Button inside popover demo"
						title="Button with name `Say hi`"
						className="button second mx-auto mt-4"
					></Button> */}
					</Popover.Content>
				</Popover>
			</div>
		);
	},
};
