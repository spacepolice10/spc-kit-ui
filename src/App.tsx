import ButtonListDemo from "./button/demo/ButtonListDemo";
import CollectionListDemo from "./collection/demo/CollectionListDemo";
import DateDemo from "./date/DateDemo";
import FormDemo from "./form/demo/FormDemo";

import InteractionsDemo from "./interactions/demo/InteractionsDemo";
import { OverlaysDemo } from "./overlays/OverlaysDemo";

function App() {
  return (
    <>
      <h1>spc-kit</h1>
      <OverlaysDemo />
      <DateDemo />
      <InteractionsDemo />
      <ButtonListDemo />
      <CollectionListDemo />
      <FormDemo />
    </>
  );
}

export default App;
