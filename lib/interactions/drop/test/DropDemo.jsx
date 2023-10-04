import { useState } from 'react'
import { useDrop } from '../components/useDrop'

export default function DropDemo() {
  const [dataTransfer, setDataTransfer] = useState('transparent')
  const { isDragOver, dropPropList } = useDrop({
    onDrop: (dataTransfer) => {
      setDataTransfer(dataTransfer)
    },
  })

  return (
    <>
      <div
        className="text-white flex w-full justify-center rounded-md items-center border"
        style={{
          color: 'white',
          backgroundColor: dataTransfer ?? 'transparent',
          filter: isDragOver ? 'brightness(0.8)' : '',
        }}
        {...dropPropList}
      >
        <p className="w-40 text-textSecond">
          colour: {dataTransfer}
        </p>
      </div>
    </>
  )
}
