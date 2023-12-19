import {
	Children,
	ReactNode,
	createContext,
	useContext,
} from "react";
import { MenuBodyType } from "../../collection/menu/Menu";
import { useMenuType } from "../../collection/menu/useMenu";
import { useSearchformType } from "../../form/searchform/useSearchform";
import { useSearchCombobox } from "./useSearchCombobox";

type SearchComboboxType = useSearchformType &
	useMenuType<T> & {
		children: ReactNode[];
		className?: string;
	};

const SearchComboboxCtxt = createContext({});
const useSearchComboboxCtxt = () =>
	useContext(SearchComboboxCtxt);

const SearchCombobox = <T extends { id: string }>(
	propList: SearchComboboxType
) => {
	const { children, className, ...restPropList } = propList;

	const { searchFormPropList, menuPropList, isShow } =
		useSearchCombobox(restPropList);
	console.log(isShow);
	const [button, body] = Children.toArray(children);
	return (
		<SearchComboboxCtxt.Provider
			value={{
				searchFormPropList,
				menuPropList,
			}}
		>
			{button}
			{isShow && body}
		</SearchComboboxCtxt.Provider>
	);
};

const Searchform = (propList) => {
	const { className, placeholder } = propList;
	const { searchFormPropList } = useSearchComboboxCtxt();
	return (
		<input
			{...searchFormPropList}
			placeholder={placeholder}
			className={
				typeof className != "function"
					? className
					: className?.()
			}
			style={{
				width: "100%",
				outline: "none",
			}}
		/>
	);
};

const Result = (propList: MenuBodyType) => {
	const { children, className } = propList;
	const { menuPropList, hide } = useSearchComboboxCtxt();
	return (
		<div className={className} {...menuPropList}>
			{typeof children == "function"
				? children({ hide })
				: children}
		</div>
	);
};

const SearchComboboxExport = Object.assign(SearchCombobox, {
	Searchform,
	Result,
});

export { SearchComboboxExport as SearchCombobox };
