import {
	useTags,
	useTagsReturnType,
	useTagsType,
} from "../../collection/tags";
import { useSearchform } from "../../form/searchform";
import { searchFormPropListType } from "../../form/searchform/components/useSearchform";

export type useTagsComboboxType<T> = useTagsType<T> & {};
export type useTagsComboboxReturnType<T> = {
	tagsComboboxPropList: useTagsReturnType<T>;
	tagsComboboxFormPropList: searchFormPropListType;
	removeTags: (args: string) => void;
};

const useTagsCombobox = <T extends { id: string }>(
	propList: useTagsComboboxType<T>
) => {
	const { items, onChange } = propList;
	const { tagsPropList, removeTags } = useTags(propList);
	const { searchFormPropList } = useSearchform({
		label: "Tags combobox",
		onSubmit: (text: string) =>
			onChange(items.concat({ id: text })),
	});
	const tagsComboboxPropList = tagsPropList;
	const tagsComboboxFormPropList = searchFormPropList;

	return {
		tagsComboboxPropList,
		tagsComboboxFormPropList,
		removeTags,
	};
};

export { useTagsCombobox };
