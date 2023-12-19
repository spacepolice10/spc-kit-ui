import { useEffect, useState } from "react";
import { useKeyboardReturnType } from "../../interactions";
import { useKeyboard } from "../../main";
import {
	useTextform,
	useTextformReturnType,
	useTextformType,
} from "../textform/useTextform";
import useDebounce from "../util/useDebounce";

export type useSearchformType = useTextformType & {
	onSubmit?: (args: string) => void;
	onSubmitAsync?: (args: string) => Promise<unknown>;
	onCancel?: (args: string) => void;
	onInProgressChange?: (args: boolean) => void;
	debounce?: number;
	submitOnChange?: boolean;
	removeOnSubmit?: boolean;
};

export type searchFormPropListType = {
	role: string;
	type: string;
} & useTextformReturnType &
	useKeyboardReturnType;

export type useSearchformReturnType = {
	searchformPropList: searchFormPropListType;
	isInProgress: boolean;
	cancel: () => void;
	submit: () => void;
};

const useSearchform = (propList: useSearchformType) => {
	const {
		onSubmit,
		onSubmitAsync,
		onCancel,
		onInput,
		onInProgressChange,
		submitOnChange,
		removeOnSubmit = false,
		debounce,
		value,
	} = propList;

	const { textformPropList, ...restTextFormPropList } =
		useTextform(propList);
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

	const debounceData = useDebounce(
		debounce
			? value ?? textformPropList.ref.current?.value
			: "",
		debounce
	);
	useEffect(() => {
		if (submitOnChange) {
			if (debounce && debounceData) {
				changeIsInProgress?.(true);
				onInProgressChange?.(true);
				onSubmitAsync?.(debounceData).finally(() => {
					changeIsInProgress?.(false);
					onInProgressChange?.(false);
				});
			}
		}
	}, [submitOnChange, debounceData]);

	const [isInProgress, changeIsInProgress] = useState(false);
	function submit() {
		const val = debounce
			? debounceData
			: value ?? searchFormPropList.ref.current?.value;
		onSubmit?.(val);
		if (onSubmitAsync) {
			changeIsInProgress?.(true);
			onInProgressChange?.(true);
			onSubmitAsync?.(val).finally(() => {
				changeIsInProgress?.(false);
				onInProgressChange?.(false);
			});
		}
		if (!removeOnSubmit) return;
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
		isInProgress,
	};
};

export { useSearchform };
