import { Tooltip, Trigger as TooltipTrigger } from "./Tooltip";

export default function TooltipDemo() {
  return (
    <>
      <Tooltip style={{ width: "fit-content" }}>
        <TooltipTrigger style={{ width: 200 }}>TOOLTIP</TooltipTrigger>
        <div>TOOLTIP TEXT</div>
      </Tooltip>
    </>
  );
}
