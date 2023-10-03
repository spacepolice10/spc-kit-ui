import { useNumberform } from './useNumberform'

/**
 * @typedef NumberformType
 * @type {import('./useNumberform').useNumberformType &
 * {increm: function, decrem: function}}
 */

/**
 *
 * @param {NumberformType} props
 * @returns
 */
const Numberform = (props) => {
  const { className, children } = props
  const {
    increm,
    decrem,
    numberformPropList,
    isHovered,
    isFocused,
  } = useNumberform(props)
  return (
    <>
      <input
        {...numberformPropList}
        className={
          typeof className != 'function'
            ? className
            : className?.({ isHovered, isFocused })
        }
        style={{
          width: '100%',
          outline: 'none',
        }}
      />
      {children?.({ increm, decrem })}
    </>
  )
}

export { Numberform }
