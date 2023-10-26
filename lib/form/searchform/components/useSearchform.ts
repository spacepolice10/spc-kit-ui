import { useKeyboard, useTextform } from "../../../main";
import { useTextformType } from "../../textform/components/useTextform";

export type useSearchformType = useTextformType & {
	onSubmit: (args: string) => void;
	onCancel?: (args: string) => void;
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
		onInput("");
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
