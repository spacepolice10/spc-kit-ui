import { FormEvent } from "react";

export type eventsType =
	| React.PointerEvent
	| PointerEvent
	| React.MouseEvent
	| MouseEvent
	| React.FormEvent
	| FormEvent
	| React.KeyboardEvent
	| KeyboardEvent;

export type eventsReturnType = {
	ev: eventsType;
	keys: "meta" | "ctrl" | "option";
};

export default function formEventsArgs(
	ev: eventsType
): eventsReturnType {
	function checkTypes(key: string) {
		return Object.prototype.hasOwnProperty.call(ev, key);
	}
	const args = {
		ev,
		...(checkTypes("metaKey") && { keys: "meta" as const }),
		...(checkTypes("ctrlKey") && { keys: "ctrl" as const }),
		...(checkTypes("altKey") && { keys: "option" as const }),
	};
	return { ...args };
}
