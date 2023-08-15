import { CSSProperties, ReactNode } from "react";

type buttonStatesType<T> = ({
  isPushed,
  isToggle,
  isHovered,
  isFocused,
}: {
  isPushed?: boolean;
  isToggle?: boolean;
  isHovered?: boolean;
  isFocused?: boolean;
}) => T | T;

type ButtonElemType = {
  styles?: CSSProperties;
  classStyle?: buttonStatesType<string>;
  id?: string;
  children?: buttonStatesType<ReactNode> | ReactNode;
};

export type { buttonStatesType, ButtonElemType };
