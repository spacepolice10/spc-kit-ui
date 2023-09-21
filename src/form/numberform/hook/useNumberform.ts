import { useState } from "react";
import { useTextform } from "../../textform/hook/useTextform";

export type useNumberformType = {
  defVal?: string;
  step: number;
};

const useNumberform = (props: useNumberformType) => {
  const { defVal, step } = props;
  const [number, setNumber] = useState(defVal ?? "0");

  function increm() {
    setNumber((state) => `${+state + step}`);
  }
  function decrem() {
    setNumber((state) => `${+state - step}`);
  }

  const { textformPropList, isHovered, isFocused } = useTextform({
    onInput: (text) => setNumber(text),
  });
  const numberformPropList = {
    ...textformPropList,
    type: "number",
    value: number,
  };
  return {
    number,
    increm,
    decrem,
    numberformPropList,
    isHovered,
    isFocused,
  };
};

export { useNumberform };
