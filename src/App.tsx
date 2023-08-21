import "./App.css";
import ButtonListDemo from "./button/ButtonListDemo";
import FormDemo from "./form/FormDemo";

import InteractionsDemo from "./interactions/InteractionsDemo";
import { OverlaysDemo } from "./overlays/OverlaysDemo";

function App() {
  return (
    <>
      <h1>spc-kit</h1>
      <OverlaysDemo />
      <InteractionsDemo />
      <ButtonListDemo />
      <FormDemo />
    </>
  );
}

export default App;
