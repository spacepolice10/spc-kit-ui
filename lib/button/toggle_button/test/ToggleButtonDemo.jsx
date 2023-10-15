import { PushPinSimple } from "@phosphor-icons/react";
import { ToggleButton } from "../components/ToggleButton";

const ToggleButtonDemo = () => {
	return (
		<ToggleButton className="button">
			{({ isToggle }) => (
				<>
					<span>Toggle</span>
					<PushPinSimple
						className="rotate-12"
						weight={isToggle ? "fill" : "regular"}
					/>
				</>
			)}
		</ToggleButton>
	);
};
export { ToggleButtonDemo };
