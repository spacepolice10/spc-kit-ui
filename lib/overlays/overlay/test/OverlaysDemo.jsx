import { X } from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { Button, useFocusScope } from "../../../main";
import { Overlay } from "../Overlay";

export default function OverlaysDemo() {
	const [isOpen, setIsOpen] = useState(false);
	const outerBtnRef = useRef(null);
	const innerBtnRef = useRef(null);
	const { focusScopePropList } = useFocusScope();
	return (
		<>
			<Overlay
				hideOnBackdropPush={true}
				className="bg-black/40 fixed inset-0 w-full h-screen flex justify-center items-center"
			>
				<Overlay.Trigger className="button">
					Open uncontrolled
				</Overlay.Trigger>
				<Overlay.Content className="bg-white w-96 h-40 rounded-md flex flex-col items-start p-4 gap-4">
					{(hide) => (
						<>
							<div>
								<Button
									onPush={hide}
									className="h-5 w-5 rounded-full hover:bg-pastelGray/40 flex items-center justify-center focus:!outline"
								>
									<X />
								</Button>
							</div>
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
			<Button
				ref={outerBtnRef}
				onPush={() => setIsOpen(!isOpen)}
				className="button second"
			>
				Open controlled
			</Button>
			<Overlay
				focusingElemOnShow={innerBtnRef}
				focusingElemOnHide={outerBtnRef}
				hideOnBackdropPush={true}
				isScrollBlocking={true}
				onHide={() => setIsOpen(false)}
				isShow={isOpen}
				className="bg-black/40 fixed inset-0 w-full h-screen flex justify-center items-center"
			>
				<div className="bg-white w-96 h-60 rounded-md flex flex-col items-start p-4 gap-4">
					<div>
						<Button
							ref={innerBtnRef}
							onPush={() => {
								setIsOpen(false);
								outerBtnRef.current?.focus({
									preventScroll: true,
								});
							}}
							className="h-5 w-5 rounded-full hover:bg-pastelGray/40 flex items-center justify-center focus-within:!outline focus:!outline"
						>
							<X />
						</Button>
					</div>
					<p className="text-textPrim text-xs">
						This dialog window is controlled outside of
						itself. Basically it depends on parent's state.
						Also there's focus controll setup
					</p>
					<div className="text-4xl flex items-center justify-center h-full mt-2">
						🤔
					</div>
					<input className="textform" />
					<Button className="button">Agree with me</Button>
				</div>
			</Overlay>
		</>
	);
}
