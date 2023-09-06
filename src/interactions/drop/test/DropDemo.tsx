import { useState } from "react";
import { useDrop } from "../hook/useDrop";

export default function DropDemo() {
  const [dataTransfer, setDataTransfer] = useState("black");
  const { isDragOver, dropPropList } = useDrop({
    onDrop: (dataTransfer) => {
      setDataTransfer(dataTransfer);
    },
  });

  return (
    <div className="demo_section w-full">
      <div
        className="text-white flex w-full justify-center items-center"
        style={{
          color: "white",
          backgroundColor: dataTransfer ?? "black",
          filter: isDragOver ? "brightness(0.8)" : "",
        }}
        {...dropPropList}
      >
        <p
          style={{
            fontWeight: "bold",
            opacity: "60%",
            fontSize: 48,
            position: "absolute",
          }}
        >
          droppable zone
        </p>
      </div>
      <p className="w-40">selected colour: {dataTransfer}</p>
    </div>
  );
}
