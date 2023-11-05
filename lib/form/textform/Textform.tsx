import { useTextform, useTextformType } from "./useTextform";

type TextformType = useTextformType & {
	className?: string | {};
	placeholder?: string;
};

const Textform = (propList: TextformType) => {
	const { className } = propList;
	const { textformPropList, ...restTextformPropList } =
		useTextform(propList);
	return (
		<input
			{...textformPropList}
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

export { Textform };
