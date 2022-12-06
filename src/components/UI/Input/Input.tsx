import React from 'react'

type InputProps = React.ComponentPropsWithoutRef<'input'>

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, ...rest }, ref): JSX.Element => {
    return <input ref={ref} value={value} onInput={onChange} {...rest} />
  }
)
