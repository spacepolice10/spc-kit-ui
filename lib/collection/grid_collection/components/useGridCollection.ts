import { useFocusScope } from "../../../interactions/focus_scope/useFocusScope";
import { useKeyboard } from "../../../interactions/keyboard/useKeyboard";
import { useCollectionType } from "../../collection/useCollection";

export type useGridCollectionType<T> =
	useCollectionType<T> & {
		columnNumber: number;
		isInverted?: boolean;
	};
const useGridCollection = <T extends { id: string }>(
	propList: useGridCollectionType<T>
) => {
	const { columnNumber } = propList;
	const {
		focusScopePropList,
		focusPrevElem,
		focusNextElem,
		focusNextElemGrid,
		focusPrevElemGrid,
	} = useFocusScope();

	const { keyboardPropList } = useKeyboard({
		ArrowLeft: focusPrevElem,
		ArrowUp: () => focusPrevElemGrid(columnNumber),
		ArrowRight: focusNextElem,
		ArrowDown: () => focusNextElemGrid(columnNumber),
	});

	const gridCollectionPropList = {
		...keyboardPropList,
		...focusScopePropList,
		style: {
			display: "grid",
			gridTemplateColumns: `repeat(${columnNumber}, minmax(0, 1fr))`,
		},
	};
	return {
		gridCollectionPropList,
	};
};

export { useGridCollection };
