import {
	Children,
	ReactElement,
	ReactNode,
	cloneElement,
	createContext,
	useContext,
} from "react";
import { useTextformType } from "../../form/textform/useTextform";
import {
	useTagsCombobox,
	useTagsComboboxReturnType,
	useTagsComboboxType,
} from "./useTagsCombobox";

const TagsComboboxCtxt = createContext(
	{} as useTagsComboboxReturnType<{ id: string }>
);

type TagsComboboxType<T> = useTagsComboboxType<T> & {
	children: ReactNode;
};

const TagsCombobox = <T extends { id: string }>(
	propList: TagsComboboxType<T>
) => {
	const { children } = propList;
	const tagsComboboxPropList = useTagsCombobox(propList);
	const [T1, T2] = Children.toArray(children);
	return (
		<TagsComboboxCtxt.Provider value={tagsComboboxPropList}>
			{T1}
			{T2}
		</TagsComboboxCtxt.Provider>
	);
};

type TagsTextformType = useTextformType & {
	className?: string;
};
function TagsTextform(propList: TagsTextformType) {
	const { className } = propList;
	const { tagsComboboxFormPropList } = useContext(
		TagsComboboxCtxt
	);
	return (
		<input
			{...tagsComboboxFormPropList}
			className={className}
		/>
	);
}

type TagsBodyType = {
	children: ReactNode | ReactNode[];
	className?: string;
};
function TagsBody(propList: TagsBodyType) {
	const { children, className } = propList;
	const { tagsComboboxPropList, removeTags } = useContext(
		TagsComboboxCtxt
	);
	return (
		<div {...tagsComboboxPropList} className={className}>
			{Children.toArray(children).map((item) => {
				const elem = item as ReactElement;
				return cloneElement(elem, { removeTags });
			})}
		</div>
	);
}

const TagsComboboxComponents = Object.assign(TagsCombobox, {
	Textform: TagsTextform,
	Tags: TagsBody,
});

export { TagsComboboxComponents as TagsCombobox };
