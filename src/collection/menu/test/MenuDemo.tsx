import { Button } from "../../../button/button/components/Button";
import {
  Menu,
  Body as MenuBody,
  Button as MenuButton,
} from "../components/Menu";

export default function MenuDemo() {
  return (
    <>
      <Menu>
        <MenuButton>TEST</MenuButton>
        {/* <div tabIndex={-1} style={{ display: "flex", flexDirection: "column" }}> */}
        <MenuBody classStyle="flex-col">
          <Button>
            {({ isHovered }) => (isHovered ? "fuck this hovered" : "fuck this")}
          </Button>
          <button>fuck this 2</button>
          <button>fuck this 4</button>
          <button>fuck this 6</button>
        </MenuBody>
        {/* </div> */}
      </Menu>
    </>
  );
}
