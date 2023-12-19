import { X } from "@phosphor-icons/react";
import { Meta, StoryObj } from "@storybook/react";
import { useRef, useState } from "react";
import { Button, Overlay } from "../../../../lib/main";

const meta = {
	title: "Overlays/Overlays",
	component: Overlay,
	tags: ["autodocs"],
} satisfies Meta<typeof Overlay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {
		children: [<></>],
	},
	render: function Render(args) {
		return (
			<Overlay
				{...args}
				className="bg-black/40 fixed inset-0 w-full h-screen flex justify-center items-center"
			>
				<Overlay.Trigger
					title="Overlay"
					label="Overlay"
					className="button"
				>
					Open uncontrolled
				</Overlay.Trigger>
				<Overlay.Content className="bg-white w-96 h-40 rounded-md flex flex-col items-start p-4 gap-4">
					{({ hide }) => (
						<>
							<Button
								title="Button"
								label="Button"
								onPress={hide}
								className="h-5 w-5 rounded-full hover:bg-pastelGray/40 flex items-center justify-center focus:!outline"
							>
								<X />
							</Button>

							<p className="text-textPrim text-xs">
								That is a primitive dialog window with basic
								functionality. But this one is pretty :*
							</p>
							<div className="text-4xl flex items-center justify-center h-full mt-2">
								😘
							</div>
						</>
					)}
				</Overlay.Content>
			</Overlay>
		);
	},
};
export const Controlled: Story = {
	args: {
		hideOnBackdropPush: true,
		isScrollBlocking: false,
		children: [<></>],
	},
	render: function Render(args) {
		const [isOpen, setIsOpen] = useState(false);
		const outerBtnRef = useRef(null);
		const innerBtnRef = useRef(null);
		return (
			<>
				<Button
					ref={outerBtnRef}
					onPress={() => setIsOpen(!isOpen)}
					className="button second"
					title={""}
					label={""}
				>
					Open controlled
				</Button>
				<Overlay
					{...args}
					focusingElemOnShow={innerBtnRef}
					focusingElemOnHide={outerBtnRef}
					onHide={() => setIsOpen(false)}
					isShow={isOpen}
					className="bg-black/40 fixed inset-0 w-full h-screen flex justify-center items-center"
				>
					<Overlay.Content>
						<div className="bg-white w-96 h-80 rounded-md flex flex-col items-start p-4 gap-4">
							<div>
								<Button
									ref={innerBtnRef}
									onPress={() => {
										setIsOpen(false);
										outerBtnRef.current?.focus({
											preventScroll: true,
										});
									}}
									className="h-5 w-5 rounded-full hover:bg-pastelGray/40 flex items-center justify-center focus-within:!outline focus:!outline"
									title={""}
									label={""}
								>
									<X />
								</Button>
							</div>
							<p className="text-textPrim text-xs">
								This dialog window is controlled outside of
								itself. Basically it depends on parent's
								state. Also there's focus controll setup
							</p>
							<div className="text-4xl flex items-center justify-center h-full mt-2">
								🤔
							</div>
							<input className="textform" />
							<Button
								className="button"
								title={""}
								label={""}
							>
								Agree with me
							</Button>
						</div>
					</Overlay.Content>
				</Overlay>
			</>
		);
	},
};
