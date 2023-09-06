import OverlayDemo from "../overlay/test/OverlayDemo";
import { PopoverDemo } from "../popover/test/PopoverDemo";
import TooltipDemo from "../tooltip/test/TooltipDemo";

export function OverlaysDemo() {
  return (
    <>
      <PopoverDemo />
      <OverlayDemo />
      <TooltipDemo />
    </>
  );
}
