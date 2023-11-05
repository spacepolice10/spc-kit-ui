import {
	useTextform,
	useTextformType,
} from "../textform/useTextform";

type TextformType = useTextformType & {
	className?: string | {};
	placeholder?: string;
};

const Textarea = (propList: TextformType) => {
	const { className, label } = propList;
	const { textformPropList, isFocused, isHovered, isErrMsg } =
		useTextform(propList);
	return (
		<label>
			<textarea
				{...textformPropList}
				className={
					typeof className != "function"
						? className
						: className?.({ isHovered, isFocused, isErrMsg })
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
