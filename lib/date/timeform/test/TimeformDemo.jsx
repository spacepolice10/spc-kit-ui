import { useState } from "react";
import { Timeform } from "../components/Timeform";

export default function TimeformDemo() {
  const [date, setDate] = useState();
  return (
    <>
      <Timeform
        className="border border-gray-400 w-16 text-center m-[4px] rounded-md"
        date={date}
        onChange={(date) => setDate(date)}
      />
    </>
  );
}
