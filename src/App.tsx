import "./App.css";
import ButtonExamples from "./button/components/ButtonExamples";
import DragExample from "./interactions/components/DragExample";
import DropExample from "./interactions/components/DropExample";
import FocusExample from "./interactions/components/FocusExample";
import FocusScopeExample from "./interactions/components/FocusScopeExample";
import HoverExample from "./interactions/components/HoverExample";
import InteractionsExample from "./interactions/components/InteractionsExample";
import KeyboardExample from "./interactions/components/KeyboardExample";
import MoveExample from "./interactions/components/MoveExample";
import PushExample from "./interactions/components/PushExample";

function App() {
  return (
    <>
      <h1>spc-kit</h1>
      <InteractionsExample />
      <ButtonExamples />
    </>
  );
}

export default App;
