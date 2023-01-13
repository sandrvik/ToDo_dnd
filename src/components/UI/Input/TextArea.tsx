import React, { InputHTMLAttributes, useEffect, useRef } from 'react';

export interface ITextArea extends InputHTMLAttributes<HTMLTextAreaElement> {
  props: [];
}

export function TextArea(
  props: InputHTMLAttributes<HTMLTextAreaElement>,
): JSX.Element {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    ref.current && (ref.current.style.height = '0px');
    ref.current && (ref.current.style.height = `${ref.current.scrollHeight}px`);
  }, []);

  const onInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = '0px';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <textarea
      {...props}
      spellCheck={false}
      style={{ overflow: 'hidden', resize: 'none' }}
      onInput={onInput}
      ref={ref}
    />
  );
}
