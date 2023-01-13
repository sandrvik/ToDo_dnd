import { ButtonHTMLAttributes } from 'react';
import './Button.scss';

type ButtonProps = {
  width?: string;
};

export default function Button({
  children,
  width,
  className,
  style,
  ...props
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element {
  const classname = `button${className ? ` ${className}` : ''}`;

  return (
    <button
      {...props}
      style={{ width, ...style }}
      className={classname}
      type="button"
    >
      {children}
    </button>
  );
}
