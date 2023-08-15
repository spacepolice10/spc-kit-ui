import { usePushType } from "../usePush/usePushType";

export type useLongPushType = usePushType & {
  delay?: number;
};
