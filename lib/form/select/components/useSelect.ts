import { useCollectionType } from "../../../collection/collection/components/useCollection";
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
	function select(id: string) {
		onChange?.(
			items?.map((item) =>
				item?.id == id
					? { ...item, isSelected: !item?.isSelected }
					: item
			)
		);
	}
	function detectIfSelected(id: string) {
		return !!selectedItemList.find((item) => item.id == id)
			? true
			: false;
	}

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
