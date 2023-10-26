import {
	useSearchform,
	useSearchformType,
} from "./useSearchform";

type TextformType = useSearchformType & {
	className?: string | {};
};

const Searchform = (propList: TextformType) => {
	const { className } = propList;
	const {
		searchFormPropList,
		isFocused,
		isHovered,
		isValid,
	} = useSearchform(propList);
	return (
		<input
			{...searchFormPropList}
			className={
				typeof className != "function"
					? className
					: className?.({ isHovered, isFocused, isValid })
			}
			style={{
				width: "100%",
				outline: "none",
			}}
		/>
	);
};

export { Searchform };
