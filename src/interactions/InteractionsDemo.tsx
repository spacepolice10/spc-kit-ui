import DragExample from "./drag/components/DragDemo";
import DropExample from "./drop/components/DropDemo";
import FocusExample from "./focus/components/FocusDemo";
import FocusScopeExample from "./focus_scope/components/FocusScopeDemo";
import HoverExample from "./hover/components/HoverDemo";
import KeyboardExample from "./keyboard/components/KeyboardDemo";
import MoveExample from "./move/components/MoveDemo";
import PushExample from "./push/components/PushDemo";

export default function InteractionsDemo() {
  return (
    <section style={{ padding: 0, margin: 0 }}>
      <h2 style={{ textAlign: "left", fontStyle: "italic" }}>Interactions:</h2>
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
