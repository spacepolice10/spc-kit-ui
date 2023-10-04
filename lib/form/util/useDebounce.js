import { useEffect, useState } from 'react'

/**
 *
 * @param {string} text
 * @param {number} time
 * @returns
 */
export default function useDebounce(text, time) {
  const [debounceData, setDebounceData] = useState(text)
  useEffect(() => {
    const handle = setTimeout(() => {
      setDebounceData(text)
    }, time)
    return () => {
      clearTimeout(handle)
    }
  }, [text, time])
  return debounceData
}
