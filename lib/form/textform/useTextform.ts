import { RefObject, useEffect, useMemo, useRef } from "react";
import {
	focusPropListType,
	useFocus,
} from "../../interactions/focus/useFocus.ts";
import {
	hoverPropListType,
	useHover,
} from "../../interactions/hover/useHover.ts";
import { useElementType } from "../../util/useElement.ts";

/**
 * @param value text data passed to textform (it is usually controlled via `useRef` or `useState` in parent element)
 * @param label special text data that describes textform's purpose
 * @param name HTML name property (usually necessary when working with native HTML forms)
 * @regexp regexp pattern that is converted into string inside `useTextform` hook. It change pseudo-class `:valid` using `pattern` property and also provides return property called `isValid` if you wish to validate forms using regexp on submit.
 * @param isFocusTrapsAfterMount boolean property that defaults to `false` and determines wheter the textform should be focused right after it is rendered
 * @param onInput callback that fires every time user writes anything inside textform. Instead of `event` it accepts string as an argument so it is possible to pass `useState` setter as a prop without additional target and value handling
 * @param onPaste thin wrapper around basic `onPaste` event that scrapes clipboard's text and file-list, so you can use them immediately
 * @param onFocus fires when user focuses on textform
 * @param onFocusLoose fires when user looses focus on textform
 * @param onHover fires when user hovers on textform
 * @param onFocusLoose fires when user looses hover on textform
 */
export type useTextformType = useElementType & {
	regexp?: string;
	isFocusTrapsAfterMount?: boolean;
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

export type textformPropListType = {
	ref: RefObject<HTMLInputElement>;
	pattern: string;
	onInput: (ev: React.FormEvent) => void;
	onPaste: (ev: React.ClipboardEvent) => void;
} & focusPropListType &
	hoverPropListType;

export type useTextformReturnType = {
	textformPropList: textformPropListType;
	isErrMsg: boolean;
	isFocused: boolean;
	isHovered: boolean;
};

const useTextform = (
	propList: useTextformType
): useTextformReturnType => {
	const {
		value,
		name,
		label,
		regexp,
		isFocusTrapsAfterMount,
		isDisabled,
		isErrMsg,
		onInput,
		onPaste,
		onHover,
		onHoverLoose,
		onFocus,
		onFocusLoose,
	} = propList;

	function input(ev: React.FormEvent) {
		const target = ev.currentTarget as HTMLInputElement;
		const val = target?.value;
		onInput?.(val);
	}

	function paste(ev: React.ClipboardEvent) {
		const value = ev.clipboardData?.getData("text") ?? "";
		const files = ev.clipboardData?.files;
		onPaste?.({ value, files });
	}

	const { hoverPropList, isHovered } = useHover({
		onHover,
		onHoverLoose,
	});
	const { focusPropList, isFocused } = useFocus({
		onFocus: () => onFocus?.(value),
		onFocusLoose: () => onFocusLoose?.(value),
	});

	const inputRef = useRef(null);
	useEffect(() => {
		if (!isFocusTrapsAfterMount) return;
		inputRef.current?.focus({ preventScroll: true });
	}, [isFocusTrapsAfterMount]);

	const isValid = useMemo(() => {
		if (!regexp || !value) return;
		const rg = new RegExp(regexp);
		const val = value;
		return rg.test(val);
	}, [value]);

	const textformPropList = {
		name,
		value,
		ref: inputRef,
		label,
		"aria-labelledby": label,
		pattern: regexp,
		disabled: isDisabled,
		invalid: !isValid || isErrMsg,
		onInput: input,
		onPaste: paste,
		...focusPropList,
		...hoverPropList,
	};

	return {
		textformPropList,
		isHovered,
		isFocused,
		isErrMsg: !isValid || isErrMsg,
	};
};

export { useTextform };
