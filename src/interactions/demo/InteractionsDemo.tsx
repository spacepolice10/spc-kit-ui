import DragExample from "../drag/test/DragDemo";
import DropExample from "../drop/test/DropDemo";
import FocusExample from "../focus/test/FocusDemo";
import FocusScopeExample from "../focus_scope/hook/FocusScopeDemo";
import HoverExample from "../hover/test/HoverDemo";
import KeyboardExample from "../keyboard/test/KeyboardDemo";
import MoveExample from "../move/test/MoveDemo";
import PushExample from "../push/test/PushDemo";

export default function InteractionsDemo() {
  return (
    <section>
      <h2>Interactions:</h2>
      <div className="flex gap-2 border p-2">
        <div className="demo_section">
          <PushExample />
          <HoverExample />
          <FocusExample />
        </div>
        <div className="demo_section">
          <KeyboardExample />
        </div>
      </div>
      <div className="flex gap-2 border p-2 h-32">
        <DragExample />
        <DropExample />
      </div>
      <MoveExample />
      <div className="flex gap-2 border p-2">
        <FocusScopeExample />
      </div>
    </section>
  );
}
