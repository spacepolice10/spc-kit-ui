import {
	useTags,
	useTagsReturnType,
	useTagsType,
} from "../../collection/tags";
import { useSearchform } from "../../form/searchform";
import { searchFormPropListType } from "../../form/searchform/useSearchform";

export type useTagsComboboxType<T> = useTagsType<T> & {};
export type useTagsComboboxReturnType<T> = {
	tagsComboboxPropList: useTagsReturnType<T>;
	tagsComboboxFormPropList: searchFormPropListType;
	removeTags: (args: string) => void;
};

const useTagsCombobox = <T extends { id: string }>(
	propList: useTagsComboboxType<T>
) => {
	const { data, onChange } = propList;
	const { tagsPropList, removeTags } = useTags(propList);
	const { searchFormPropList } = useSearchform({
		label: "Tags combobox",
		onSubmit: (text: string) =>
			onChange(data.concat({ id: text })),
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
