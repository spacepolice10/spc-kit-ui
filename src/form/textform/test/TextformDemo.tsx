import { useState } from "react";
import { Textform } from "../components/Textform";

export default function TextformDemo() {
  const [val, setVal] = useState("");
  return (
    <>
      <Textform
        style={{
          width: 200,
        }}
        classStyle={({ isFocused }) =>
          isFocused ? "border-violet-400 border" : "border"
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
            isFocused ? "border-violet-400 border" : "border"
          }
        />
      </div>
    </>
  );
}
