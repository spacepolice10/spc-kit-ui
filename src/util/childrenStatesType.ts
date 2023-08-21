import { ReactNode } from "react";

export type childrenStatesType<T> = ReactNode | ((args: T) => ReactNode);
