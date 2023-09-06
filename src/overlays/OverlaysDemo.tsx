import OverlayDemo from "./overlay/components/OverlayDemo";
import { PopoverDemo } from "./popover/components/PopoverDemo";
import TooltipDemo from "./tooltip/components/TooltipDemo";

export function OverlaysDemo() {
  return (
    <>
      <PopoverDemo />
      <OverlayDemo />
      <TooltipDemo />
    </>
  );
}
