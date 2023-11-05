import { ReactNode } from "react";
import {
	useGridCollection,
	useGridCollectionType,
} from "./useGridCollection";

export type GridCollectionType<T> =
	useGridCollectionType<T> & {
		children: ReactNode | ReactNode[];
		className?: string;
	};
const GridCollection = <T extends { id: string }>(
	propList: GridCollectionType<T>
) => {
	const { className, children, ...restPropList } = propList;
	const { gridCollectionPropList } =
		useGridCollection(restPropList);
	return (
		<div className={className} {...gridCollectionPropList}>
			{children}
		</div>
	);
};

export { GridCollection };
