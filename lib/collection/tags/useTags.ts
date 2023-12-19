import {
	useCollection,
	useCollectionReturnType,
	useCollectionType,
} from "../collection/useCollection";

export type useTagsType<T> = useCollectionType<T> & {
	onChange: (args: T[]) => void;
};
export type useTagsReturnType<T> = {
	tagsPropList: useCollectionReturnType<T>;
	removeTags: (args: string) => void;
};

export const useTags = <T extends { id: string }>(
	propList: useTagsType<T>
) => {
	const { data, onChange, isHorizontal } = propList;
	const { collectionPropList } = useCollection({
		data,
		isHorizontal,
	});
	function removeTags(id: string) {
		const result = data.filter((item) => item.id != id);
		onChange(result);
	}
	const tagsPropList = {
		...collectionPropList,
	};
	return {
		tagsPropList,
		removeTags,
	};
};
