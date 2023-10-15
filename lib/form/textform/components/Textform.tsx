import { useTextform, useTextformType } from "./useTextform";

type TextformType = useTextformType & {
	className?: string | {};
};

const Textform = (propList: TextformType) => {
	const { className } = propList;
	const { textformPropList, isFocused, isHovered, isValid } =
		useTextform(propList);
	return (
		<input
			{...textformPropList}
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

export { Textform };
