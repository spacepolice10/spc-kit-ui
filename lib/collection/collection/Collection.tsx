import { ReactNode } from "react";
import {
	useCollection,
	useCollectionType,
} from "./useCollection";

type Collection<T> = useCollectionType<T> & {
	children: ReactNode | ReactNode[];
	className?: string;
};

const Collection = <T extends { id: string }>(
	propList: Collection<T>
) => {
	const { className, children, ...restPropList } = propList;
	const { collectionPropList } = useCollection(restPropList);
	return (
		<div className={className} {...collectionPropList}>
			{children}
		</div>
	);
};

export { Collection };
