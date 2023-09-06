import { useState } from "react";
import { RadioGroup } from "../components/RadioGroup";
import { Radio } from "../components/Radio";

export default function RadioDemo() {
  const variants = [
    { id: "carrot", name: "carrot 🥕" },
    { id: "cabbage", name: "cabbage 🥬" },
    { id: "cat", name: "meow 😽" },
    { id: "loaf", name: "loaf 🥯" },
  ];
  const [selected, setSelected] = useState<string | null>("cabbage");
  return (
    <div style={{ display: "flex" }}>
      <RadioGroup
        items={variants}
        selected={selected}
        setSelected={setSelected}
        selectOnFocusing={true}
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
    </div>
  );
}