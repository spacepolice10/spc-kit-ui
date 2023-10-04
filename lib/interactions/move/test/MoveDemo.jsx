import { useMove } from '../components/useMove'

export default function MoveDemo() {
  const { coords, movePropList } = useMove()
  return (
    <div>
      <div className="h-20 p-2 border rounded-md relative flex flex-col justify-end items-end">
        <div className="text-textSecond font-bold opacity-20">
          MOVE THAT PINK SQUARE AROUND
        </div>
        <button
          className="bg-pastelPink rounded-xl absolute w-10 h-10 opacity-80"
          {...movePropList}
          style={{
            left: coords.x ?? 0,
            top: coords.y ?? 0,
          }}
        ></button>
      </div>
    </div>
  )
}
