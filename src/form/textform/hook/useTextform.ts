import { useEffect, useMemo, useRef } from "react";
import { useHover } from "../../../interactions/hover/hook/useHover";
import { useFocus } from "../../../interactions/focus/hook/useFocus";

export type useTextformType = {
  value?: string;
  defVal?: string;
  autoComplete?: boolean;
  type?: "text" | "password" | "email" | "number";
  regexp?: string;
  placeholdingText?: string;
  onInput?: (args: string) => void;
  onPaste?: (args: { val: string; file?: File }) => void;
  onHover?: () => void;
  onFocus?: (args: string) => void;
  onFocusLoose?: (args: string) => void;
};

const useTextform = (props: useTextformType) => {
  const {
    value,
    defVal,
    autoComplete = false,
    type = "text",
    regexp,
    placeholdingText,
    onInput,
    onPaste,
    onHover,
    onFocus,
    onFocusLoose,
  } = props;
  const uncontrolledText = useRef("");
  const textform = useRef<HTMLInputElement>(null);

  function changeText(ev: React.FormEvent) {
    const target = ev.currentTarget as HTMLInputElement;
    const val = target?.value;
    uncontrolledText.current = val;
    onInput?.(val);
  }
  function handlePasting(ev: React.ClipboardEvent) {
    const val = ev.clipboardData?.getData("text") ?? "";
    const file = ev.clipboardData?.files?.[0];
    uncontrolledText.current = val;
    onPaste?.({ val, file });
  }
  useEffect(() => {
    if (!defVal) return;
    uncontrolledText.current = defVal;
    const form = textform.current;
    if (!form) return;
    form.value = defVal;
    onInput?.(defVal);
  }, [defVal]);

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
    autoComplete: autoComplete ? "on" : "off",
    type,
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
