import { CSSProperties } from "react";

export type stylesType<T = unknown> = {
  style?: CSSProperties;
  classStyle?:
    | string
    | ((args: T & { isHovered: boolean; isFocused: boolean }) => string);
};
