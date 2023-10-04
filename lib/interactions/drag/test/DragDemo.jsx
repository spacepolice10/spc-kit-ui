import { useDrag } from '../components/useDrag'

export default function DragDemo({ colour }) {
  const { dragPropList } = useDrag({
    dataTransfer: colour ?? 'transparent',
  })

  return (
    <>
      <div
        className="drag"
        {...dragPropList}
        style={{
          backgroundColor: colour,
        }}
      ></div>
    </>
  )
}
