import { useCollection } from './useCollection'

/**
 * @typedef CollectionType
 * @type {import('./useCollection').useCollectionType &
 * {children: ReactNode[]}}
 */

/**
 *
 * @param {CollectionType} props
 */
const Collection = (props) => {
  const { className, children, ...restPropList } = props
  const { collectionPropList } = useCollection(restPropList)
  return (
    <div className={className} {...collectionPropList}>
      {children}
    </div>
  )
}

export { Collection }
