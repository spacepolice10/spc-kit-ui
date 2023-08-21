import { useState } from "react";
import { RadioGroup } from "./RadioGroup";
import { Radio } from "./Radio";

export default function RadioDemo() {
  const variants = [
    { id: "carrot", name: "carrot 🥕" },
    { id: "cabbage", name: "cabbage 🥬" },
    { id: "cat", name: "meow 😽" },
    { id: "loaf", name: "loaf 🥯" },
  ];
  const [selected, setSelected] = useState<string | null>("cabbage");
  return (
    <RadioGroup
      items={variants}
      selected={selected}
      setSelected={setSelected}
      onChange={(x) => console.log(x)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        gap: 10,
      }}
    >
      {variants.map((x) => (
        <Radio key={x?.id} {...x}>
          {(isSelected) => (
            <>
              {isSelected ? "🔲 " : "🔳 "}
              {x.name}
            </>
          )}
        </Radio>
      ))}
    </RadioGroup>
  );
}
