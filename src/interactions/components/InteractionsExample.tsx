import DragExample from "./DragExample";
import DropExample from "./DropExample";
import FocusExample from "./FocusExample";
import FocusScopeExample from "./FocusScopeExample";
import HoverExample from "./HoverExample";
import KeyboardExample from "./KeyboardExample";
import MoveExample from "./MoveExample";
import PushExample from "./PushExample";

export default function InteractionsExample() {
  return (
    <section style={{ padding: 0, margin: 0 }}>
      <h2 style={{ textAlign: "left" }}>Interactions</h2>
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <PushExample />
          <HoverExample />
          <FocusExample />
        </div>
        <KeyboardExample />
      </div>
      <div style={{ display: "flex" }}>
        <DragExample />
        <DropExample />
      </div>
      <FocusScopeExample />

      <MoveExample />
    </section>
  );
}
