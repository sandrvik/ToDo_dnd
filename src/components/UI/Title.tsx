import React, { useRef, useState } from 'react'
import { Input } from './Input/Input'

type TitleProps = {
  children: string
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  isEditable?: boolean
  onBlur: (v: string) => void
}

export const Title = ({
  children,
  level = 'h1',
  isEditable = false,
  onBlur,
}: TitleProps): JSX.Element => {
  const [isTitleEditable, setIsTitleEditable] = useState<boolean>(false)
  const [text, setText] = useState<string>(children)

  const ref = useRef<HTMLHeadingElement | null>(null)

  const H = level
  if (ref.current) {
    console.log(window.getComputedStyle(ref.current))
  }
  return (
    <>
      {isTitleEditable ? (
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={() => {
            onBlur(text)
            setIsTitleEditable(false)
          }}
        />
      ) : (
        <H ref={ref} onClick={() => setIsTitleEditable(true)}>
          {children}
        </H>
      )}
    </>
  )
  // {isTitleEditable ? (
  //     <H onClick={() => setIsTitleEditable(true)}>{children}</H>
  //   ) : null}
}
