import { useEffect, useRef } from "react";
import { useHover } from "../../../interactions/hover/hook/useHover";
import { useFocus } from "../../../interactions/focus/hook/useFocus";

export type useTextformType = {
  val?: string;
  defVal?: string;
  autoComplete?: boolean;
  type?: "text" | "password" | "email" | "number";
  onInput?: (args: string) => void;
  onPaste?: (args: { val: string; file?: File }) => void;
  onHover?: () => void;
  onFocus?: (args: string) => void;
};

const useTextform = (props: useTextformType) => {
  const {
    val,
    defVal,
    autoComplete = true,
    type = "text",
    onInput,
    onPaste,
    onHover,
    onFocus,
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
    onFocus: () => onFocus?.(val ?? uncontrolledText.current),
  });

  const textformPropList = {
    autoComplete: autoComplete ? "on" : "off",
    type,
    onInput: changeText,
    onPaste: handlePasting,
    ...focusPropList,
    ...hoverPropList,
  };
  return {
    value: val ?? uncontrolledText.current,
    textformPropList,
    isHovered,
    isFocused,
  };
};

export { useTextform };
