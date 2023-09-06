import { Popover, Trigger } from "./Popover";

export function PopoverDemo() {
  return (
    <div style={{ position: "relative", width: 200 }}>
      <Popover offset={4} focusTrapsOnTrigger={true} focusTrapsOnPopover={true}>
        <Trigger classStyle="border p-2">Popover</Trigger>
        <div className="bg-blue-400 w-40 h-40">
          <button onClick={() => alert("YO")}>SOMETHING</button>
        </div>
      </Popover>
    </div>
  );
}
