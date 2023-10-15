import { Numberform } from '../components/Numberform.jsx'

export default function NumberformDemo() {
  return (
    <>
      <Numberform defVal="40" step={80}>
        {({ increm, decrem }) => (
          <>
            <button onClick={increm}>UP</button>
            <button onClick={decrem}>DOWN</button>
          </>
        )}
      </Numberform>
    </>
  )
}
