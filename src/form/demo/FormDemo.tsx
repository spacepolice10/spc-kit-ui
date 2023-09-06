import { useState } from "react";
import { Checkbox } from "../checkbox/components/Checkbox";
import { CheckboxCollection } from "../checkbox/components/CheckboxCollection";
import { Switch } from "../switch/components/Switch";
import TextformDemo from "../textform/test/TextformDemo";
import RadioDemo from "../radio_group/test/RadioDemo";
import { SliderDemo } from "../slider/test/SliderDemo";
import { useCheckboxType } from "../checkbox/hook/useCheckbox";
import SearchformDemo from "../searchform/test/SearchFormDemo";
import NumberformDemo from "../numberform/test/NumberformDemo";
import MailformDemo from "../mailform/test/MailformDemo";

export default function FormDemo() {
  const [checkboxData, setCheckboxData] = useState<useCheckboxType[]>([
    { id: "test", isToggle: true, name: "something" },
    { id: "test2", isToggle: false, name: "hm..." },
    { id: "test4", isToggle: false, name: "test it" },
  ]);

  const [tog, setTog] = useState(false);
  return (
    <section style={{ padding: 0, margin: 0 }}>
      <h2 style={{ textAlign: "left", fontStyle: "italic" }}>Form:</h2>
      <Switch
        isToggle={tog}
        onChange={(x) => setTog(x)}
        isVertical={false}
        style={{ width: 52 }}
      >
        <div
          style={{
            display: "block",
            width: 4,
            height: 4,
            flexShrink: 0,
            backgroundColor: "black",
            borderRadius: 9999,
          }}
        ></div>
      </Switch>
      <Switch
        // isToggle={tog}
        // onChange={(x) => setTog(x)}
        initIsToggle={true}
        isVertical={false}
        style={{ width: 52 }}
      >
        <span
          style={{
            display: "block",
            width: 4,
            height: 4,
            flexShrink: 0,
            backgroundColor: "black",
            borderRadius: 9999,
          }}
        ></span>
      </Switch>

      <Checkbox id={"yo!"}>
        {(isToggle) => (isToggle ? "✅" : "🔳") + "Checkbox"}
      </Checkbox>
      <CheckboxCollection
        style={{ display: "flex" }}
        onChange={setCheckboxData}
        items={checkboxData}
      >
        {checkboxData.map((checkbox) => (
          <Checkbox
            key={checkbox.id}
            classStyle="checkbox_wrap"
            id={checkbox.id}
          >
            {(isToggle) => (
              <div>
                {isToggle ? "✅" : "🔳"} {checkbox.name}
              </div>
            )}
          </Checkbox>
        ))}
      </CheckboxCollection>
      <RadioDemo />
      <NumberformDemo />
      <MailformDemo />
      <SearchformDemo />
      <TextformDemo />
      <SliderDemo />
    </section>
  );
}
