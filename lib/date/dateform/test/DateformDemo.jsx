import { useState } from 'react'
import { Dateform } from '../components/Dateform'

export default function DateformDemo() {
  const [date, setDate] = useState()
  return (
    <>
      <Dateform
        className="border border-gray-400 w-16 text-center m-[4px] rounded-md"
        date={date}
        onChange={(date) => setDate(date)}
      />
    </>
  )
}
