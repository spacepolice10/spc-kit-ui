import { useTextform, useTextformType } from "./useTextform";

type TextformType = useTextformType & {
	className?: string | {};
};

const Textarea = (propList: TextformType) => {
	const { className, label } = propList;
	const { textformPropList, isFocused, isHovered, isValid } =
		useTextform(propList);
	return (
		<label>
			<textarea
				{...textformPropList}
				className={
					typeof className != "function"
						? className
						: className?.({ isHovered, isFocused, isValid })
				}
				style={{
					width: "100%",
					outline: "none",
					resize: "none",
				}}
			></textarea>
		</label>
	);
};

export { Textarea };
