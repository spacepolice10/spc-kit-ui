import { usePushType } from "../../push/hook/usePush";

export type useLongPushType = usePushType & {
  delay?: number;
};
