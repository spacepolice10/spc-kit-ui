import { CSSProperties } from "react";
import { useMove } from "../hook/useMove";

export default function MoveDemo() {
  const { coords, movePropList } = useMove();
  return (
    <div>
      <div
        style={{
          height: 200,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
          boxSizing: "border-box",
          border: "4px solid white",
        }}
      >
        <p
          style={{
            fontWeight: "bold",
            opacity: "20%",
            fontSize: 48,
            position: "absolute",
            pointerEvents: "none",
          }}
        >
          movable zone
        </p>
        <button
          {...movePropList}
          style={
            {
              position: "absolute",
              left: coords.x,
              top: coords.y,
              width: 52,
              height: 52,
              opacity: "92%",
              backgroundColor: "orangered",
              transitionDuration: "0ms",
            } as CSSProperties
          }
        ></button>
      </div>
    </div>
  );
}
