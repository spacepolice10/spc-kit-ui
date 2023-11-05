import {
	Children,
	ReactElement,
	ReactNode,
	cloneElement,
} from "react";
import { useTags, useTagsType } from "./useTags";

type TagsType<T> = useTagsType<T> & {
	children: ReactNode | ReactNode[];
	className?: string;
};
/**
 * Tags — is unstyled wrap-component that serves as tags-storage. It accepts tags and renders them with additional properties. So, if developer styles `Tags` only wrapper would be styled.
 * - It renders `children` (that could be any component's array representing tags in a form or `ReactElement`)
 * - Clones it and passes callback `removeTags` that can be used inside any single tag to remove it from tags-list passed to `Tags`.
 */
const Tags = <T extends { id: string }>(
	propList: TagsType<T>
) => {
	const { children, className } = propList;
	const { tagsPropList, removeTags } = useTags(propList);
	return (
		<>
			<div {...tagsPropList} className={className}>
				{Children.toArray(children).map((item) => {
					const elem = item as ReactElement;
					return cloneElement(elem, { removeTags });
				})}
			</div>
		</>
	);
};

export { Tags };
