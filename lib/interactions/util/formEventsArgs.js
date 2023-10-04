export default function formEventsArgs(ev) {
  function checkTypes(key) {
    return Object.prototype.hasOwnProperty.call(ev, key)
  }
  const args = {
    ev,
    ...(checkTypes('metaKey') && { keys: 'meta' }),
    ...(checkTypes('ctrlKey') && { keys: 'ctrl' }),
    ...(checkTypes('altKey') && { keys: 'option' }),
  }
  return { ...args }
}
