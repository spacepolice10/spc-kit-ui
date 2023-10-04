import { useDateform } from './useDateform'

/**
 *
 * @param {object} props
 * @param {Date | string} props.date — used if dateform must be controlled
 * @param {(selectedDate: string) => void} props.onChange — fire on date change
 * @param {string} props.className
 * @returns
 */
const Dateform = (props) => {
  const { ...propList } = useDateform(props)
  return (
    <>
      {Object.values(propList).map((propList) => (
        <input className={props.className} {...propList} />
      ))}
    </>
  )
}

export { Dateform }
