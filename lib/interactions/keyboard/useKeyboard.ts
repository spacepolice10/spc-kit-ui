export type useKeyboardType = {
	[index: string]: (ev: React.KeyboardEvent) => void;
};

export type keyboardPropListType = {
	tabIndex: number;
	onKeyDown: (ev: React.KeyboardEvent) => void;
};

export type useKeyboardReturnType = {
	keyboardPropList: keyboardPropListType;
};

const useKeyboard = (
	keys: useKeyboardType
): useKeyboardReturnType => {
	function keysHandle(ev: React.KeyboardEvent) {
		if (!keys[ev.key]) return;
		ev.preventDefault();
		ev.stopPropagation();
		keys[ev.key](ev);
	}
	const keyboardPropList = {
		tabIndex: 0,
		onKeyDown: keysHandle,
	};
	return { keyboardPropList };
};

export { useKeyboard };
