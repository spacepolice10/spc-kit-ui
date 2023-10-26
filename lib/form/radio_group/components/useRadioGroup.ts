import { createContext, useContext, useState } from "react";
import {
	collectionPropListType,
	useCollection,
	useCollectionType,
} from "../../../collection/collection/components/useCollection";

/**
 * context helps to throw handled data to related hooks and components without utilizing props. It simplifies the process of building Radio groups
 */
const RadioGroupCtxt = createContext(
	{} as useRadioGroupReturnType
);
const useRadioGroupCtxt = () => useContext(RadioGroupCtxt);

export type useRadioGroupType<T> = useCollectionType<T> & {
	items: T[];
	onChange: (args: string) => void;
	selectedId?: string;
	isSelectOnFocusing?: boolean;
};

/** generic type is omitted here because context would never accept generic and it is not really important to infer types inside hooks as of devs would handle types outside of the component itself */
type useRadioGroupReturnType = useRadioGroupType<{
	id: string;
}> & {
	radioGroupPropList: collectionPropListType;
};

const useRadioGroup = <T extends { id: string }>(
	props: useRadioGroupType<T>
): useRadioGroupReturnType => {
	const { items, isHorizontal } = props;
	const { collectionPropList } = useCollection({
		items,
		isHorizontal,
	});

	const [controlledSelectedId, setControlledSelectedId] =
		useState(props.selectedId ?? "");
	function onChange(id: string) {
		props?.onChange(id);
		setControlledSelectedId(id);
	}

	return {
		items,
		radioGroupPropList: collectionPropList,
		selectedId: props.selectedId ?? controlledSelectedId,
		onChange,
	};
};

export { RadioGroupCtxt, useRadioGroup, useRadioGroupCtxt };
