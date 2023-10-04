const mergeProps = (props) => {
  //styles
  function stylesFunc() {
    const styleLists = props?.map((prop) => prop.style)
    const filterUndefined = styleLists.filter((s) => s != undefined)
    const styles = filterUndefined.reduce((styles, prop) => {
      return Object.assign(styles, { [prop?.key]: prop?.value }, {})
    })
    return { ...styles }
  }
  const styles = stylesFunc()

  //refs
  function refs(elem) {
    const refs = props.map((prop) => prop.ref)
    refs.forEach((r) => {
      r.current = elem
    })
  }

  //keyboard action list
  function keys(ev) {
    props.forEach((prop) => prop.onKeyDown?.(ev))
  }

  //tabindex
  const tabIndex = props?.[props.length - 1].tabIndex

  return {
    tabIndex,
    ref: refs,
    onKeyDown: keys,
    style: styles,
  }
}

export { mergeProps }
