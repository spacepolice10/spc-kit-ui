import { useCollectionType } from "../../../collection/collection/components/useCollection";
import {
	useSearchform,
	useSearchformType,
} from "../../../form/searchform/components/useSearchform";
import { textformPropListType } from "../../../form/textform/components/useTextform";
import { useCollection, usePopover } from "../../../main";
import {
	popoverPropListType,
	triggerPropListType,
} from "../../../overlays/popover/components/usePopover";
import { mergeProps } from "../../../util/mergeProps";

export type useSearchComboboxType<T> = useSearchformType &
	useCollectionType<T>;

type searchComboboxFormPropListType = triggerPropListType &
	textformPropListType;

type searchComboboxResultPropListType = popoverPropListType;

export type useSearchComboboxReturnType<T> = {
	searchComboboxFormPropList: searchComboboxFormPropListType;
	searchComboboxResultPropList: searchComboboxResultPropListType;
	result: T[];
	selectedId: string;
};

const useSearchCombobox = <T extends { id: string }>(
	propList: useSearchComboboxType<T>
) => {
	const { items, onInput, ...restPropList } = propList;

	function input(text: string) {
		onInput(text);
		!text.length ? hide() : show();
	}
	function focus() {
		if (!items.length) return;
		show();
	}
	function focusLoose() {
		removeSelectedId();
	}
	function cancel() {
		removeSelectedId();
		hide();
	}
	function submit() {
		if (!selectedId) return;
		alert(selectedId);
		hide();
		onInput("");
	}

	const { searchFormPropList } = useSearchform({
		...restPropList,
		onInput: input,
		onFocus: focus,
		onFocusLoose: focusLoose,
		onCancel: cancel,
		onSubmit: submit,
	});
	const { collectionPropList, selectedId, removeSelectedId } =
		useCollection({
			items,
			isControlled: true,
		});
	const {
		popoverPropList,
		triggerPropList,
		show,
		hide,
		isShow,
		isInverted,
	} = usePopover();

	const searchComboboxFormPropList = {
		...mergeProps<HTMLInputElement | HTMLButtonElement>([
			searchFormPropList,
			triggerPropList,
			{ onKeyDown: collectionPropList.onKeyDown },
		]),
	};
	const searchComboboxResultPropList = {
		...popoverPropList,
	};
	return {
		searchComboboxFormPropList,
		searchComboboxResultPropList,
		selectedId,
		isShow,
		isInverted,
	};
};

export { useSearchCombobox };
