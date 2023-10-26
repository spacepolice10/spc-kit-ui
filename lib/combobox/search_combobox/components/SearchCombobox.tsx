import { Children, ReactNode } from "react";
import {
	useSearchCombobox,
	useSearchComboboxType,
} from "./useSearchCombobox";

type SearchComboboxType<T> = useSearchComboboxType<T> & {
	className: string;
	children: ReactNode[];
};

const SearchCombobox = <T extends { id: string }>(
	propList: SearchComboboxType<T>
) => {
	const { className, children, ...restPropList } = propList;
	const {
		searchComboboxFormPropList,
		searchComboboxResultPropList,
		selectedId,
		isShow,
	} = useSearchCombobox<{
		id: string;
	}>(restPropList);
	const [textform, result] = Children.toArray(children);
	return (
		<div className="relative">
			<input
				className="textform"
				{...searchComboboxFormPropList}
			/>
			{isShow && !!items.length && (
				<div
					{...searchComboboxResultPropList}
					className="bg-white p-2 z-10 border"
				>
					{items?.map((x) => (
						<button
							className={selectedId == x?.id && "bg-red-400"}
						>
							{x.id}
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export { SearchCombobox };
