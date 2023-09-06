import { Button } from "../../button/button/components/Button";
import { GridButtonCollection } from "../../button/button_collection/components/GridButtonCollection";
import MenuDemo from "../menu/components/MenuDemo";

export default function CollectionListDemo() {
  return (
    <>
      <MenuDemo />
      <GridButtonCollection columnNumber={2}>
        <Button>😗</Button>
        <Button>😗</Button>
        <Button>😗</Button>
        <Button>😗</Button>
      </GridButtonCollection>
    </>
  );
}
