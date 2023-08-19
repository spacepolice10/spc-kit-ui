import { Children, ReactNode } from "react";
import {
  useCollection,
  useCollectionType,
} from "../../../collection/collection/hook/useCollection";
import { stylesType } from "../../../util/stylesType";

export type ButtonCollectionType = {
  children: ReactNode;
  isHorizontal?: boolean;
} & stylesType &
  useCollectionType<{ id: string }>;

const ButtonCollection = (props?: ButtonCollectionType) => {
  const { children, style, classStyle, isHorizontal } = props || {};
  const items = Children.toArray(children);
  const { collectionPropList } = useCollection({
    items: items?.map((_x, i) => ({ id: `${i}` })),
    isHorizontal,
  });
  return (
    <div style={style} className={classStyle} {...collectionPropList}>
      {children}
    </div>
  );
};

export { ButtonCollection };
