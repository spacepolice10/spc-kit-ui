import { useMemo } from 'react'
import createDate from './createDate'

const useDate = (props) => {
  const date = useMemo(() => createDate(props), [props])
  return date
}

export { useDate }
