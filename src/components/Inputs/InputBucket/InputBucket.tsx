import CircleAddButton from '@/components/Buttons/CircleAddButton';

import React, { MouseEventHandler, useRef, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import InputLabel from '../InputLabel/InputLabel';
import { InputLabelProps } from '../InputLabel/inputLabel.types';

export interface InputBucketProps {
  inputLabelProps?: InputLabelProps;
  children: (values: string[]) => JSX.Element;
  defaultValues?: string[];
}
const inputBucketStyle = {
  'add-button': 'absolute top-[12%] mr-1',
  'tags-list': 'mt-2 flex flex-wrap gap-2',
  tag: 'relative  flex h-8 flex-[25%] cursor-pointer items-center justify-center rounded-md bg-tag-500 text-center text-white hover:bg-tag-400',
  'button-x': 'absolute right-0 top-0'
};

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
    <div className="p-2">
      <div className="relative">
        <InputLabel
          {...inputLabelProps}
          inputProps={{
            ref: inputRef,
            className: 'max-w-[20rem]'
          }}
        >
          {inputLabelProps?.labelProps?.title}
        </InputLabel>

        <CircleAddButton className={inputBucketStyle['add-button']} onClick={handleAddValue} />
      </div>

      <ul className={inputBucketStyle['tags-list']}>
        {curBucketValuesArr.map((el, i) => {
          return (
            <li className={inputBucketStyle.tag} key={el + i}>
              {el}
              <button onClick={handleRemoveValue(el)} className={inputBucketStyle['button-x']}>
                <AiFillCloseCircle />
              </button>
            </li>
          );
        })}
      </ul>

      {children(curBucketValuesArr)}
    </div>
  );
}

export default InputBucket;
