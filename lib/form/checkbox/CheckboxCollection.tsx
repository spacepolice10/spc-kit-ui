import { Children, ReactNode } from "react";
import {
	CheckboxCollectionCtxt,
	useCheckboxCollection,
	useCheckboxCollectionType,
} from "./useCheckboxCollection";

type CheckboxCollectionType<T> =
	useCheckboxCollectionType<T> & {
		children: ReactNode;
		className?: string;
	};

const CheckboxCollection = <
	T extends { id: string; isToggle: boolean },
>(
	propList: CheckboxCollectionType<T>
) => {
	const { className, children, ...restPropList } = propList;
	const {
		checkboxCollectionPropList,
		...restCheckboxCollectionPropList
	} = useCheckboxCollection(restPropList);
	return (
		<CheckboxCollectionCtxt.Provider
			value={{
				checkboxCollectionPropList,
				...restCheckboxCollectionPropList,
			}}
		>
			<div
				{...checkboxCollectionPropList}
				className={className}
			>
				{Children.toArray(children).map((elem) => elem)}
			</div>
		</CheckboxCollectionCtxt.Provider>
	);
};
export { CheckboxCollection };
