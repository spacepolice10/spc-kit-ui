import {
	Eye,
	Info,
	LockLaminated,
} from "@phosphor-icons/react";
import { Button } from "../../../button/button/Button";
import { Tooltip } from "../Tooltip";

export default function TooltipsDemo() {
	return (
		<div className="flex gap-4">
			<Tooltip delay={400}>
				<Tooltip.Trigger className="button !p-0 tertiary !w-auto">
					<Button
						role="button"
						label="Button to use with tootip demo"
						title="Tooltip trigger"
						className="button !p-0 tertiary !w-auto"
						onPush={() => alert("hey")}
					>
						<Info size={28} className="text-textPrim" />
					</Button>
				</Tooltip.Trigger>
				<div className="bg-white border shadow-md rounded-md w-auto p-2">
					👁️‍🗨️ here're your tips
				</div>
			</Tooltip>
			<Tooltip>
				<Tooltip.Trigger className="button !p-0 tertiary !w-auto">
					<Button
						role="button"
						label="Button to use with tootip demo"
						title="tooltipTrigger"
						className="button !p-0 tertiary !w-auto"
						onPush={() => alert("hey")}
					>
						<LockLaminated
							size={28}
							className="text-textPrim"
						/>
					</Button>
				</Tooltip.Trigger>
				<div className="bg-white border shadow-md rounded-md w-auto p-2">
					🔒 something disabled
				</div>
			</Tooltip>
			<Tooltip>
				<Tooltip.Trigger className="button !p-0 tertiary !w-auto">
					<Button
						role="button"
						label="Button to use with tootip demo"
						title="Tooltip Trigger"
						className="button !p-0 tertiary !w-auto"
						onPush={() => alert("hey")}
					>
						<Eye size={28} className="text-textPrim" />
					</Button>
				</Tooltip.Trigger>
				<div className="bg-black text-white border shadow-md rounded-md w-auto p-2">
					👁️ darker
				</div>
			</Tooltip>
		</div>
	);
}
