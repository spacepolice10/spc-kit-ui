import { Children, ReactNode } from "react";
import {
	RadioGroupCtxt,
	useRadioGroup,
	useRadioGroupType,
} from "./useRadioGroup";

type RadioGroupType<T> = useRadioGroupType<T> & {
	children: ReactNode;
	className?: string;
};

const RadioGroup = <T extends { id: string }>(
	propList: RadioGroupType<T>
) => {
	const { className, children, ...restPropList } = propList;
	const { radioGroupPropList, ...restRadioGroupPropList } =
		useRadioGroup(restPropList);
	return (
		<RadioGroupCtxt.Provider
			value={{
				radioGroupPropList,
				...restRadioGroupPropList,
			}}
		>
			<div {...radioGroupPropList} className={className}>
				{Children.toArray(children).map((elem) => elem)}
			</div>
		</RadioGroupCtxt.Provider>
	);
};
export { RadioGroup };
