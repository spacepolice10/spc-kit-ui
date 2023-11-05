import { useCollectionType } from "../../../collection/collection/useCollection";
import { useCollection } from "../../../main";

export type useSelectType<T> = useCollectionType<T> & {
	onChange?: (args: T[]) => void;
};

const useSelect = <
	T extends { id: string; isSelected: boolean },
>(
	propList: useSelectType<T>
) => {
	const { items, onChange } = propList;
	const selectedItemList = items.filter(
		(item) => item.isSelected
	);
	const select = (id: string) => {
		onChange?.(
			items?.map((item) =>
				item?.id == id
					? { ...item, isSelected: !item?.isSelected }
					: item
			)
		);
	};
	const detectIfSelected = (id: string) =>
		!!selectedItemList.find((item) => item.id == id);

	const { collectionPropList } = useCollection({
		items,
	});
	const selectPropList = {
		...collectionPropList,
	};
	return {
		selectPropList,
		selectedItemList,
		select,
		detectIfSelected,
	};
};

export { useSelect };
