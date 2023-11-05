import { useKeyboardReturnType } from "../../../interactions";
import { useKeyboard } from "../../../main";
import {
	useTextform,
	useTextformReturnType,
	useTextformType,
} from "../../textform/useTextform";

export type useSearchformType = useTextformType & {
	onSubmit: (args: string) => void;
	onCancel?: (args: string) => void;
};
export type searchFormPropListType = {
	role: string;
	type: string;
} & useTextformReturnType &
	useKeyboardReturnType;
export type useSearchformReturnType = {
	searchformPropList: searchFormPropListType;
	cancel: () => void;
	submit: () => void;
};

const useSearchform = (propList: useSearchformType) => {
	const {
		onSubmit,
		onCancel,
		onInput,
		value,
		...restPropList
	} = propList;

	const { textformPropList, ...restTextFormPropList } =
		useTextform({
			value,
			onInput,
			...restPropList,
		});
	const { keyboardPropList } = useKeyboard({
		Escape: cancel,
		Enter: submit,
	});

	function cancel() {
		onCancel?.(value);
		const target = searchFormPropList.ref.current;
		if (!target) return;
		target.value = "";
	}
	function submit() {
		onSubmit?.(
			value ?? searchFormPropList.ref.current?.value
		);
		onInput?.("");
		const target = searchFormPropList.ref.current;
		target.value = "";
	}

	const searchFormPropList = {
		role: "search",
		type: "search",
		...textformPropList,
		...keyboardPropList,
	};
	return {
		searchFormPropList,
		...restTextFormPropList,
		cancel,
		submit,
	};
};

export { useSearchform };
