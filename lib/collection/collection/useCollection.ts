import { Dispatch, SetStateAction, useState } from "react";
import {
	focusScopePropListType,
	useFocusScope,
} from "../../interactions/focus_scope/useFocusScope";
import {
	keyboardPropListType,
	useKeyboard,
} from "../../interactions/keyboard/useKeyboard";
import { mergeProps } from "../../util/mergeProps";

/**
 * Collection hook helps to control one-directional lists of data. It serves as a tool that provides ergonomic keyboard control with keyboard arrows and makes it possuble to select items from list without focusing on it
 * @param data list of any data in a form of object with id
 */
export type useCollectionType<T> = {
	data: T[];
	isControlled?: boolean;
	isHorizontal?: boolean;
	isInverted?: boolean;
};

export type collectionPropListType = keyboardPropListType &
	focusScopePropListType & {};

export type useCollectionReturnType<T> = {
	collectionPropList: collectionPropListType;
	data: T[];
	selectedId: string;
	changeSelectedId: Dispatch<SetStateAction<string>>;
	removeSelectedId: () => void;
};

const useCollection = <T extends { id: string }>(
	propList: useCollectionType<T>
): useCollectionReturnType<T> => {
	const { data, isControlled, isHorizontal, isInverted } =
		propList || {};
	const [selectedId, changeSelectedId] = useState("");

	const { focusNextElem, focusPrevElem, focusScopePropList } =
		useFocusScope();
	function removeSelectedId() {
		changeSelectedId("");
	}

	function changeSelectedIdToPrev(ev: React.KeyboardEvent) {
		if (isControlled) {
			if (!data?.length) return;
			if (!selectedId) {
				const id = data?.[data?.length - 1]?.id;
				changeSelectedId(`${id}`);
			}
			const index =
				data.findIndex((x) => x?.id == selectedId) - 1;
			if (index < 0) return;
			const id = data[index]?.id;
			changeSelectedId(`${id}`);
		} else {
			ev.preventDefault();
			focusPrevElem();
		}
	}
	function changeSelectedIdToNext(ev: React.KeyboardEvent) {
		if (isControlled) {
			if (!data?.length) return;
			if (!selectedId) {
				const id = data?.[0]?.id;
				changeSelectedId(`${id}`);
			}
			const index =
				data.findIndex((x) => x?.id == selectedId) + 1;
			if (index > data.length - 1) return;
			const id = data[index]?.id;
			changeSelectedId(`${id}`);
		} else {
			ev.preventDefault();
			focusNextElem();
		}
	}

	const { keyboardPropList } = useKeyboard({
		...(isHorizontal
			? {
					ArrowLeft: changeSelectedIdToPrev,
					ArrowRight: changeSelectedIdToNext,
			  }
			: {
					ArrowUp: changeSelectedIdToPrev,
					ArrowDown: changeSelectedIdToNext,
			  }),
	});
	const collectionPropList = mergeProps([
		keyboardPropList,
		focusScopePropList,
	]) as collectionPropListType;

	return {
		collectionPropList,
		data: isInverted ? data?.reverse() : data ?? [],
		selectedId,
		changeSelectedId,
		removeSelectedId,
	};
};

export { useCollection };
