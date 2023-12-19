import { ReactNode } from "react";
import { ButtonType } from "../../button/button/Button";
import { useButton } from "../../main";
import { useTags, useTagsType } from "./useTags";

type TagsType<T> = useTagsType<T> & {
	children: (args: ChipType<T>) => ReactNode;
	className?: string;
};
type ChipType<T> = T & { removeTags: (id: string) => void };

/**
 * Tags — is unstyled wrap-component that serves as tags-storage. It accepts tags and renders them with additional properties. So, if developer styles `Tags` only wrapper would be styled.
 * - It renders `children` (that could be any component's array representing tags in a form or `ReactElement`)
 * - Clones it and passes callback `removeTags` that can be used inside any single tag to remove it from tags-list passed to `Tags`.
 */
const Tags = <T extends { id: string }>(
	propList: TagsType<T>
) => {
	const { children, className, data } = propList;
	const { tagsPropList, removeTags } = useTags(propList);
	return (
		<>
			<div {...tagsPropList} className={className}>
				{data.map(
					(item) =>
						typeof children == "function" &&
						children({
							removeTags,
							...item,
						})
				)}
			</div>
		</>
	);
};

const Chip = <T extends { id: string }>(
	propList: ChipType<T> &
		ButtonType & {
			children:
				| ReactNode
				| ((args: { remove: () => void }) => ReactNode);
		}
) => {
	const { children, id, removeTags } = propList;
	const { buttonPropList } = useButton(propList);

	return (
		<div>
			<button
				{...buttonPropList}
				className="button !rounded-md !bg-pastelGray/20 justify-between hover:!bg-pastelGray/40 !w-fit"
				title="Chip"
			>
				{typeof children == "function"
					? children({ remove: () => removeTags(id) })
					: children}
			</button>
		</div>
	);
};

const TagsExport = Object.assign(Tags, {
	Chip,
});

export { TagsExport as Tags };
