import { useTextform, useTextformType } from "./useTextform";

type TextformType = useTextformType & {
	className?: string | {};
	placeholder?: string;
};

export const Textform = (propList: TextformType) => {
	const { className, placeholder } = propList;
	const { textformPropList, ...restTextformPropList } =
		useTextform(propList);
	return (
		<input
			{...textformPropList}
			placeholder={placeholder}
			className={
				typeof className != "function"
					? className
					: className?.(restTextformPropList)
			}
			style={{
				width: "100%",
				outline: "none",
			}}
		/>
	);
};
