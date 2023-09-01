import { useEffect, useState } from "react";

export default function useDebounce(text: string, time: number) {
  const [debounceData, setDebounceData] = useState(text);
  useEffect(() => {
    const handle = setTimeout(() => {
      setDebounceData(text);
    }, time);
    return () => {
      clearTimeout(handle);
    };
  }, [text, time]);
  return debounceData;
}
