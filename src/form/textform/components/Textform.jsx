import { useTextform } from './useTextform'

/**
 * @typedef TextformType
 * @type {import("./useTextform").useTextformType}
 */

/**
 *
 * @param {TextformType} props
 * @returns
 */
const Textform = (props) => {
  const { className } = props
  const { textformPropList, isFocused, isHovered, isValid } =
    useTextform(props)
  return (
    <input
      {...textformPropList}
      className={
        typeof className != 'function'
          ? className
          : className?.({ isHovered, isFocused, isValid })
      }
      style={{
        width: '100%',
        outline: 'none',
      }}
    />
  )
}

export { Textform }
