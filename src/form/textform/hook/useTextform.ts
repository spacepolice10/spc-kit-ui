import { useEffect, useMemo, useRef } from "react";
import { useHover } from "../../../interactions/hover/hook/useHover";
import { useFocus } from "../../../interactions/focus/hook/useFocus";

export type useTextformType = {
  value?: string;
  defVal?: string;
  regexp?: string;
  placeholdingText?: string;
  focusTrapsAfterMount?: boolean;
  onInput?: (args: string) => void;
  onPaste?: (args: { value: string; files?: File }) => void;
  onHover?: () => void;
  onFocus?: (args: string) => void;
  onFocusLoose?: (args: string) => void;
};

const useTextform = (props: useTextformType) => {
  const {
    value,
    defVal,
    regexp,
    placeholdingText,
    focusTrapsAfterMount,
    onInput,
    onPaste,
    onHover,
    onFocus,
    onFocusLoose,
  } = props;

  const uncontrolledText = useRef("");
  const inputRef = useRef<HTMLInputElement>(null);

  function changeText(ev: React.FormEvent) {
    const target = ev.currentTarget as HTMLInputElement;
    const val = target?.value;
    uncontrolledText.current = val;
    onInput?.(val);
  }
  function handlePasting(ev: React.ClipboardEvent) {
    const value = ev.clipboardData?.getData("text") ?? "";
    const files = ev.clipboardData?.files?.[0];
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
    if (!focusTrapsAfterMount) return;
    inputRef.current?.focus();
  }, [focusTrapsAfterMount]);

  const { hoverPropList, isHovered } = useHover({
    onHover: () => onHover?.(),
  });
  const { focusPropList, isFocused } = useFocus({
    onFocus: () => onFocus?.(value ?? uncontrolledText.current),
    onFocusLoose: () => onFocusLoose?.(value ?? uncontrolledText.current),
  });

  const isValid = useMemo(() => {
    if (!regexp || !value) return;
    const rg = new RegExp(regexp);
    const val = value ?? uncontrolledText;
    return rg.test(val);
  }, [regexp, value, uncontrolledText]);
  const textformPropList = {
    ref: inputRef,
    autoComplete: "off",
    type: "text",
    pattern: regexp,
    placeholder: placeholdingText,
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
