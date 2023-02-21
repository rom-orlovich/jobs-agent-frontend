import CircleAddButton from '@/components/Buttons/CircleAddButton';
import CircleRemoveButton from '@/components/Buttons/CircleRemoveButton';
import React, { MouseEventHandler, useRef, useState } from 'react';

import InputLabel from '../InputLabel/InputLabel';
import { InputLabelProps } from '../InputLabel/inputLabel.types';

export interface InputBucketProps {
  inputLabelProps: InputLabelProps;
  children: (values: string[]) => JSX.Element;
  defaultValues?: string[];
}
/**
 * This component is for creation of input bucket values that will provide as string[] to component's children element.
 */
function InputBucket({ inputLabelProps, children, defaultValues }: InputBucketProps) {
  const defaultSet = new Set(defaultValues?.length ? defaultValues : []);

  const [curBucketValues, setNewBucketValue] = useState<globalThis.Set<string>>(defaultSet);

  const curBucketValuesArr = Array.from(curBucketValues);

  const inputRef = useRef<null | HTMLInputElement>(null);

  // Add value to data set data structure state.
  const handleAddValue: MouseEventHandler<HTMLButtonElement> = (e) => {
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

  // Remove value from the set data structure state.
  const handleRemoveValue: (value: string) => MouseEventHandler<HTMLButtonElement> = (value) => (e) => {
    e.preventDefault();
    setNewBucketValue((pre) => {
      pre.delete(value);
      const newSet = new Set(pre);
      return newSet;
    });
  };

  return (
    <div>
      <div className="relative">
        <InputLabel
          {...inputLabelProps}
          inputProps={{
            ref: inputRef
          }}
        >
          {inputLabelProps.labelProps?.title}
        </InputLabel>

        <CircleAddButton className="absolute top-[10%]" onClick={handleAddValue} />
      </div>
      <div>
        <ul>
          {curBucketValuesArr.map((el, i) => {
            return (
              <li className="relative min-w-[15rem] text-center" key={el + i}>
                {el}
                <CircleRemoveButton onClick={handleRemoveValue(el)} />
              </li>
            );
          })}
        </ul>
      </div>
      {children(curBucketValuesArr)}
    </div>
  );
}

export default InputBucket;
