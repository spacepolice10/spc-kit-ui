import { useState } from 'react'
import { useDrop } from '../components/useDrop'

export default function DropDemo() {
  const [dataTransfer, setDataTransfer] = useState('transparent')
  const [dropCount, setDropCount] = useState(0)
  const { isDragOver, dropPropList } = useDrop({
    onDrop: (dataTransfer) => {
      setDropCount((prev) => ++prev)
      setDataTransfer(dataTransfer)
    },
  })

  return (
    <>
      <div
        className="text-white flex w-full justify-center rounded-sm items-center border relative"
        style={{
          color: 'white',
          backgroundColor: dataTransfer ?? 'transparent',
          filter: isDragOver ? 'brightness(0.8)' : '',
        }}
        {...dropPropList}
      >
        <ul className="absolute top-2 right-2">
          <li className="text-textSecond text-xs font-mono">
            colour: {dataTransfer}
          </li>
          <li className="text-textSecond text-xs font-mono">
            drop_count: {dropCount}
          </li>
        </ul>
      </div>
    </>
  )
}
