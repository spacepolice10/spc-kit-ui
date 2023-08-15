import { useDrag } from "../hooks/useDrag/useDrag";

export default function DragExample() {
  const { dragPropList } = useDrag({
    dataTransfer: "orangered",
  });
  const { dragPropList: second } = useDrag({
    dataTransfer: "hotpink",
  });
  const { dragPropList: third } = useDrag({
    dataTransfer: "lightseagreen",
  });
  const { dragPropList: fourth } = useDrag({
    dataTransfer: "black",
  });

  return (
    <div style={{ width: 120 }}>
      <h3>drag</h3>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          border: "none",
          boxSizing: "border-box",
          padding: 0,
          margin: 0,
        }}
      >
        <div
          {...dragPropList}
          style={{
            padding: 0,
            width: 20,
            height: 20,
            borderRadius: 9999,
            backgroundColor: "orangered",
            cursor: "grab",
          }}
        ></div>
        <div
          {...second}
          style={{
            padding: 0,
            width: 20,
            height: 20,
            borderRadius: 9999,
            backgroundColor: "hotpink",
            cursor: "grab",
          }}
        ></div>
        <div
          {...third}
          style={{
            padding: 0,
            width: 20,
            height: 20,
            borderRadius: 9999,
            backgroundColor: "lightseagreen",
            cursor: "grab",
          }}
        ></div>
        <div
          {...fourth}
          style={{
            padding: 0,
            width: 20,
            height: 20,
            borderRadius: 9999,
            backgroundColor: "black",
            cursor: "grab",
          }}
        ></div>
      </div>
    </div>
  );
}
