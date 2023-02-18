import React, { MouseEventHandler, useRef, useState } from 'react';

import InputLabel from '../InputLabel/InputLabel';
import { InputLabelProps } from '../InputLabel/inputLabel';

export interface InputBucketProps {
  inputLabelProps: InputLabelProps;
  children: (values: string[]) => JSX.Element;
}
/**
 * This component is for creation of bucket of input values that return as array.
 */
function InputBucket({ inputLabelProps, children }: InputBucketProps) {
  const [curBucketValues, setNewBucketValue] = useState<globalThis.Set<string>>(new Set());

  const inputRef = useRef<null | HTMLInputElement>(null);

  const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (!inputRef) return;
    if (!inputRef.current?.value) return;

    //Use set as data structure in order to save to create unique inputs values array.
    setNewBucketValue((pre) => {
      if (!inputRef?.current?.value) return pre;
      const newSet = new Set(pre.add(inputRef.current.value));
      inputRef.current.value = '';
      return newSet;
    });
  };
  const curBucketValuesArr = Array.from(curBucketValues);
  return (
    <div>
      <div>
        <InputLabel
          {...inputLabelProps}
          inputProps={{
            ref: inputRef
          }}
        >
          {inputLabelProps.labelProps?.title}
        </InputLabel>
        <button onClick={onClick}>+</button>
      </div>
      <ul>
        {curBucketValuesArr.map((el, i) => {
          return <li key={el + i}>{el}</li>;
        })}
      </ul>
      {children(curBucketValuesArr)}
    </div>
  );
}

export default InputBucket;
