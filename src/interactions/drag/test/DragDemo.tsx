import { useDrag } from "../hook/useDrag";

export default function DragDemo() {
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
    <div className="demo_section">
      <h3>drag</h3>
      <div className="grid grid-cols-2 items-center justify-items-center w-16 p-2 border">
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
