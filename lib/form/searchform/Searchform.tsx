import {
	useSearchform,
	useSearchformType,
} from "./useSearchform";

export type SearchformType = useSearchformType & {
	className?: string | {};
	placeholder?: string;
};

export const Searchform = (propList: SearchformType) => {
	const { className, placeholder } = propList;
	const { searchFormPropList, isFocused, isHovered } =
		useSearchform(propList);
	return (
		<input
			{...searchFormPropList}
			placeholder={placeholder}
			className={
				typeof className != "function"
					? className
					: className?.({ isHovered, isFocused })
			}
			style={{
				width: "100%",
				outline: "none",
			}}
		/>
	);
};
