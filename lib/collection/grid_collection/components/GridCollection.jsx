import { useGridCollection } from './useGridCollection'

/**
 * @typedef {import('./useGridCollection').useGridCollectionType &
 * {children: ReactNode[]}} GridCollectionType
 */

/**
 *
 * @param {GridCollectionType} props
 * @returns
 */
const GridCollection = (props) => {
  const { className, children, ...restPropList } = props
  const { gridCollectionPropList } = useGridCollection(restPropList)
  return (
    <div className={className} {...gridCollectionPropList}>
      {children}
    </div>
  )
}

export { GridCollection }
