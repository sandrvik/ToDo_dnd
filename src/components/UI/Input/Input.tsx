import React, { ChangeEvent } from 'react';

type InputProps = React.ComponentPropsWithoutRef<'input'> & {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void | undefined;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, ...rest }, ref): JSX.Element => {
    return <input ref={ref} value={value} onInput={onChange} {...rest} />;
  },
);

export default Input;
