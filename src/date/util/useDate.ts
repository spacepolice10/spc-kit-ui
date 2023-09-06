import { useMemo } from "react";
import createDate, { createDateType } from "./createDate";

const useDate = (props?: createDateType) => {
  const date = useMemo(() => createDate(props), [props]);
  return date;
};

export { useDate };
