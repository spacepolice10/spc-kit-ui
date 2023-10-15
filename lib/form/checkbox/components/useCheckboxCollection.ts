import { createContext, useContext, useMemo } from "react";
import {
	collectionPropListType,
	useCollection,
} from "../../../collection/collection/components/useCollection";

/**
 * context helps to throw handled data to related hooks and components without utilizing props. It simplifies the process of building Radio groups
 */
const CheckboxCollectionCtxt = createContext(
	{} as useCheckboxCollectionReturnType
);
const useCheckboxCollectionCtxt = () =>
	useContext(CheckboxCollectionCtxt);

export type useCheckboxCollectionType<T> = {
	items: T[];
	onChange: (args: T[]) => void;
};

/** generic type is omitted here because context would never accept generic and it is not really important to infer types inside hooks as of devs would handle types outside of the component itself */
type useCheckboxCollectionReturnType =
	useCheckboxCollectionType<{
		id: string;
		isToggle: boolean;
	}> & {
		checkboxCollectionPropList: collectionPropListType;
	};

const useCheckboxCollection = <
	T extends { id: string; isToggle: boolean },
>(
	propList: useCheckboxCollectionType<T>
): useCheckboxCollectionReturnType => {
	const { collectionPropList } = useCollection({
		items: propList?.items,
	});
	return {
		checkboxCollectionPropList: collectionPropList,
		...propList,
	};
};

export {
	useCheckboxCollection,
	CheckboxCollectionCtxt,
	useCheckboxCollectionCtxt,
};
