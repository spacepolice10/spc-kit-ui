export type useElemType = {
	name?: string;
	role: string;
	value?: string;
	label: string;
	isDisabled?: boolean;
	isErrMsg?: boolean;
};

export type elemPropListType = {
	name?: string;
	role: string;
	value?: string;
	label: string;
	disabled: boolean;
	invalid: boolean;
};
export type useElemReturnType = {
	elemPropList: elemPropListType;
	isDisabled: boolean;
	isErrMsg: boolean;
};

const useElem = (
	propList: useElemType
): useElemReturnType => {
	const { isDisabled, isErrMsg } = propList;
	const elemPropList = {
		disabled: isDisabled,
		invalid: isErrMsg,
		...propList,
	};
	return {
		isDisabled,
		isErrMsg,
		elemPropList,
	};
};

export { useElem };
