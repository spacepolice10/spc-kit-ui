import { useState } from "react";
import {
	useCollection,
	useCollectionType,
} from "../../collection/collection/useCollection";
import { mergeProps } from "../../util/mergeProps";

export type useRadioGroupType<T> = useCollectionType<T> & {
	selectedId?: string;
	onChange: (id: string) => void;
};

export const useRadioGroup = <T extends { id: string }>(
	propList: useRadioGroupType<T>
) => {
	const { data, isHorizontal } = propList;
	const [
		uncontrolledSelectedId,
		changeUncontrolledSelectedId,
	] = useState(data?.[0]?.id ?? "");
	const SELECTED_ID =
		propList?.selectedId ?? uncontrolledSelectedId;
	function onChange(id: string) {
		propList?.onChange?.(id);
		if (!propList?.selectedId) {
			changeUncontrolledSelectedId(id);
		}
	}
	function detectIfSelected(id: string) {
		return id == SELECTED_ID;
	}
	const { collectionPropList } = useCollection({
		data,
		isHorizontal,
	});

	const radioGroupPropList = mergeProps<HTMLDivElement>([
		collectionPropList,
	]);
	return {
		radioGroupPropList,
		detectIfSelected,
		onChange,
	};
};
