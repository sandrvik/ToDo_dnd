import { useEffect, useRef } from 'react'

export default function useAutoFocus(property: boolean, callback: () => void) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (property) {
      inputRef.current?.focus()
      callback()
    }
  }, [inputRef, callback, property])

  return inputRef
}
