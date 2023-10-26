import {
	useCollection,
	useCollectionType,
} from "../../collection/components/useCollection";

export type useTagsType<T> = useCollectionType<T> & {
	onChange: (args: T[]) => void;
};

const useTags = <T extends { id: string }>(
	propList: useTagsType<T>
) => {
	const { items, onChange, isHorizontal } = propList;
	const { collectionPropList } = useCollection({
		items,
		isHorizontal,
	});
	function removeTags(id: string) {
		const result = items.filter((item) => item.id != id);
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

export { useTags };
