import { FormEvent } from "react";

type pushEventsType =
  | React.MouseEvent
  | KeyboardEvent
  | React.TouchEvent
  | FormEvent<Element>;

type pushEvPropListType = ({
  ev,
  keys,
}: {
  ev: pushEventsType;
  keys?: "option" | "ctrl" | "meta";
}) => void;

type usePushType = {
  title?: string;
  hoverTitle?: string;
  onPush?: pushEvPropListType;
  onDoublePush?: pushEvPropListType;
  onPushStarts?: pushEvPropListType;
  onPushFinishes?: pushEvPropListType;
  isntSemanticPushableElem?: boolean;
  isDisabled?: boolean;
  bubble?: boolean;
};

export type { usePushType, pushEvPropListType, pushEventsType };
