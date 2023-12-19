import { useState } from "react";
import {
	useCollection,
	useCollectionType,
} from "../../collection/collection/useCollection";
import { mergeProps } from "../../util/mergeProps";

export type useCheckboxCollectionType<T> =
	useCollectionType<T> & {
		onChange?: (data: T[]) => void;
	};

export const useCheckboxCollection = <
	T extends { id: string; isToggle: boolean },
>(
	propList: useCheckboxCollectionType<T>
) => {
	const { data, isHorizontal } = propList;
	const [uncontrolledData, changeUncontrolledData] =
		useState(data);
	const DATA = propList?.data ?? uncontrolledData;
	function onChange({
		id,
		isToggle,
	}: {
		id: string;
		isToggle: boolean;
	}) {
		const updateData = data?.map((item) =>
			item?.id == id ? { ...item, isToggle } : item
		);
		propList?.onChange(updateData);
		if (!propList?.data) {
			changeUncontrolledData(updateData);
		}
	}
	function detectIfSelected(id: string) {
		return DATA.find((item) => item?.id == id)?.isToggle;
	}

	const { collectionPropList } = useCollection({
		data,
		isHorizontal,
	});

	const checkboxCollectionPropList =
		mergeProps<HTMLDivElement>([collectionPropList]);
	return {
		checkboxCollectionPropList,
		detectIfSelected,
		onChange,
	};
};
