import { FormEvent, useEffect, useMemo, useRef } from "react";
import { useHover } from "../../../interactions/hover/components/useHover.ts";
import { useFocus } from "../../../interactions/focus/components/useFocus.ts";

export type useTextformType = {
	value?: string;
	defVal?: string;
	regexp?: string;
	placeholdingText?: string;
	isFocusTrapsAfterMount?: boolean;
	isntSemanticTextformElem?: boolean;
	onInput?: (args: string) => void;
	onPaste?: (args: {
		value: string;
		files?: FileList;
	}) => void;
	onFocus?: (args: string) => void;
	onFocusLoose?: (args: string) => void;
	onHover?: () => void;
	onHoverLoose?: () => void;
};

const useTextform = (propList: useTextformType) => {
	const {
		value,
		defVal,
		regexp,
		placeholdingText,
		isFocusTrapsAfterMount,
		isntSemanticTextformElem,
		onInput,
		onPaste,
		onHover,
		onFocus,
		onFocusLoose,
	} = propList;

	const uncontrolledText = useRef("");
	const inputRef = useRef(null);

	function changeText(ev: React.FormEvent) {
		const target = ev.currentTarget as HTMLInputElement;
		const val = target?.value;
		uncontrolledText.current = val;
		onInput?.(val);
	}

	function handlePasting(ev: React.ClipboardEvent) {
		const value = ev.clipboardData?.getData("text") ?? "";
		const files = ev.clipboardData?.files;
		uncontrolledText.current = value;
		onPaste?.({ value, files });
	}

	useEffect(() => {
		if (!defVal) return;
		uncontrolledText.current = defVal;
		const form = inputRef.current;
		if (!form) return;
		form.value = defVal;
		onInput?.(defVal);
	}, [defVal]);
	useEffect(() => {
		if (!isFocusTrapsAfterMount) return;
		inputRef.current?.focus({ preventScroll: true });
	}, [isFocusTrapsAfterMount]);

	const { hoverPropList, isHovered } = useHover({
		onHover,
	});
	const { focusPropList, isFocused } = useFocus({
		onFocus: () =>
			onFocus?.(value ?? uncontrolledText.current),
		onFocusLoose: () =>
			onFocusLoose?.(value ?? uncontrolledText.current),
	});

	const isValid = useMemo(() => {
		if (!regexp || !value) return;
		const rg = new RegExp(regexp);
		const val = value ?? uncontrolledText.current;
		return rg.test(val);
	}, [value, uncontrolledText]);

	const textformPropList = {
		ref: inputRef,
		autoComplete: "off",
		type: "text",
		pattern: regexp,
		placeholder: placeholdingText,
		...(isntSemanticTextformElem && {
			contenteditable: true,
		}),
		onInput: changeText,
		onPaste: handlePasting,
		...focusPropList,
		...hoverPropList,
	};

	return {
		value: value ?? uncontrolledText.current,
		textformPropList,
		isHovered,
		isFocused,
		isValid,
	};
};

export { useTextform };
