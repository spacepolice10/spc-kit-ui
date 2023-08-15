import { useState } from "react";
import { useDrop } from "../hooks/useDrop/useDrop";

export default function DropExample() {
  const [dataTransfer, setDataTransfer] = useState("black");
  const { isDragOver, dropPropList } = useDrop({
    onDrop: (dataTransfer) => {
      setDataTransfer(dataTransfer);
    },
  });

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: 60,

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
      <p>selected colour: {dataTransfer}</p>
    </div>
  );
}
