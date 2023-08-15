import { FormEvent } from "react";

export default function formEventsArgs(
  ev: React.MouseEvent | KeyboardEvent | React.TouchEvent | FormEvent<Element>
) {
  function checkTypes(key: string) {
    return Object.prototype.hasOwnProperty.call(ev, key);
  }
  const args = {
    ev,
    ...(checkTypes("metaKey") && { keys: "meta" as const }),
    ...(checkTypes("ctrlKey") && { keys: "ctrl" as const }),
    ...(checkTypes("altKey") && { keys: "option" as const }),
  };
  return { ...args };
}
