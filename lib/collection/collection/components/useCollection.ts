import { Dispatch, SetStateAction, useState } from "react";
import {
	focusScopePropListType,
	useFocusScope,
} from "../../../interactions/focus_scope/components/useFocusScope";
import {
	keyboardPropListType,
	useKeyboard,
} from "../../../interactions/keyboard/components/useKeyboard";

/**
 * Collection hook helps to control one-directional lists of data. It serves as a tool that provides ergonomic keyboard control with keyboard arrows and makes it possuble to select items from list without focusing on it
 * @param items list of any data in a form of object with id
 */
export type useCollectionType<T> = {
	items: T[];
	isControlled?: boolean;
	isHorizontal?: boolean;
	isInverted?: boolean;
};

export type collectionPropListType = keyboardPropListType &
	focusScopePropListType & {};

export type useCollectionReturnType<T> = {
	collectionPropList: collectionPropListType;
	items: T[];
	selectedId: string;
	setSelectedId: Dispatch<SetStateAction<string>>;
	removeSelectedId: () => void;
};

const useCollection = <T extends { id: string }>(
	props: useCollectionType<T>
): useCollectionReturnType<T> => {
	const { items, isControlled, isHorizontal, isInverted } =
		props || {};
	const [selectedId, setSelectedId] = useState("");

	const { focusNextElem, focusPrevElem, focusScopePropList } =
		useFocusScope();
	function removeSelectedId() {
		setSelectedId("");
	}

	function setSelectedIdPrev(ev: React.KeyboardEvent) {
		if (isControlled) {
			if (!items?.length) return;
			if (!selectedId) {
				const id = items?.[items?.length - 1]?.id;
				setSelectedId(`${id}`);
			}
			const index =
				items.findIndex((x) => x?.id == selectedId) - 1;
			if (index < 0) return;
			const id = items[index]?.id;
			setSelectedId(`${id}`);
		} else {
			ev.preventDefault();
			focusPrevElem();
		}
	}
	function setSelectedIdNext(ev: React.KeyboardEvent) {
		if (isControlled) {
			if (!items?.length) return;
			if (!selectedId) {
				const id = items?.[0]?.id;
				setSelectedId(`${id}`);
			}
			const index =
				items.findIndex((x) => x?.id == selectedId) + 1;
			if (index > items.length - 1) return;
			const id = items[index]?.id;
			setSelectedId(`${id}`);
		} else {
			ev.preventDefault();
			focusNextElem();
		}
	}

	const { keyboardPropList } = useKeyboard({
		...(isHorizontal
			? {
					ArrowLeft: setSelectedIdPrev,
					ArrowRight: setSelectedIdNext,
			  }
			: {
					ArrowUp: setSelectedIdPrev,
					ArrowDown: setSelectedIdNext,
			  }),
	});
	const collectionPropList = {
		...keyboardPropList,
		...focusScopePropList,
	};

	return {
		collectionPropList,
		items: isInverted ? items?.reverse() : items ?? [],
		selectedId,
		setSelectedId,
		removeSelectedId,
	};
};

export { useCollection };
