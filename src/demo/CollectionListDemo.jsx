import { Button } from '../../lib/button/button/components/Button'

import { GridCollection } from '../../lib/collection/grid_collection/components/GridCollection'
import MenuDemo from '../../lib/collection/menu/test/MenuDemo'

export default function CollectionListDemo() {
  return (
    <>
      <MenuDemo />
      <GridCollection columnNumber={2}>
        <Button onPush={() => console.log('test')}>😗</Button>
        <Button>😗</Button>
        <Button>😗</Button>
        <Button>{() => '😗'}</Button>
      </GridCollection>
    </>
  )
}
