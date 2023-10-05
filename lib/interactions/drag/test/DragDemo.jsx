import { useDrag } from '../components/useDrag'

export default function DragDemo({ colour }) {
  const { dragPropList } = useDrag({
    dataTransfer: colour ?? 'transparent',
  })
  const dragStyles =
    'p-0 w-full h-5 rounded-sm shadow-sm cursor-grab'
  return (
    <>
      <div
        className={dragStyles}
        {...dragPropList}
        style={{
          backgroundColor: colour,
        }}
      ></div>
    </>
  )
}
