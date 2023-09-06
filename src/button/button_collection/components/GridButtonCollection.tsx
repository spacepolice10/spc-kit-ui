import { ReactNode } from "react";
import { stylesType } from "../../../util/stylesType";
import {
  useGridCollection,
  useGridCollectionType,
} from "../../../collection/grid_collection/hook/useGridCollection";

export type GridButtonCollectionType = stylesType &
  useGridCollectionType & {
    children: ReactNode;
  };

const GridButtonCollection = (props: GridButtonCollectionType) => {
  const { children, classStyle, columnNumber, isInverted } = props;
  const { gridCollectionPropList } = useGridCollection({
    columnNumber,
    isInverted,
  });
  return (
    <div className={classStyle as string} {...gridCollectionPropList}>
      {children}
    </div>
  );
};

export { GridButtonCollection };
