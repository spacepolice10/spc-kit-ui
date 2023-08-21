import { useMemo, useState } from "react";
import { useTextform, useTextformType } from "../../textform/hook/useTextform";

export type useSearchformType<T> = useTextformType & {
  data: T[];
  filter?: (args: string) => void;
};

const useSearchform = <T extends { id: string; name: string }>(
  props: useSearchformType<T>
) => {
  const { data, filter } = props;
  const [controlledText, setControlledText] = useState("");
  const { textformPropList, value, isHovered, isFocused } = useTextform({
    val: controlledText,
    onInput: setControlledText,
    ...props,
  });
  const filteredData = useMemo(() => {
    if (!controlledText) return [];
    const filtered =
      filter?.(controlledText) ??
      data?.filter((item) =>
        item.name.toUpperCase().includes(controlledText.toUpperCase())
      );
    return filtered;
  }, [controlledText, data]);

  function removeText() {
    setControlledText("");
  }

  const searchformPropList = {
    ...textformPropList,
    value,
  };

  return {
    searchformPropList,
    filteredData,
    removeText,
    isHovered,
    isFocused,
  };
};

export { useSearchform };
