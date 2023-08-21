import { useState } from "react";
import { Textform } from "./Textform";

export default function TextformDemo() {
  const [val, setVal] = useState("");
  return (
    <>
      <Textform
        style={{
          width: 200,
        }}
        classStyle={({ isFocused }) =>
          isFocused ? "textform_focusing" : "textform"
        }
      />
      <div style={{ display: "flex" }}>
        <p>{val}</p>
        <Textform
          val={val}
          onInput={setVal}
          style={{
            width: 200,
          }}
          classStyle={({ isFocused }) =>
            isFocused ? "textform_focusing" : "textform"
          }
        />
      </div>
    </>
  );
}
