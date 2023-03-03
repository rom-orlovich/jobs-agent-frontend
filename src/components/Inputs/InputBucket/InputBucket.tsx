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
  addButton: 'absolute top-[12%] mr-1',
  tagsList: 'mt-4 flex flex-wrap gap-2',
  tag: 'relative  flex xs:h-8 h-6 xs:flex-[25%] flex-[20%] xs:max-w-[30%] max-w-[20%] cursor-pointer items-center justify-center xs:text-base text-xs rounded-md bg-tag-500 text-center text-white hover:bg-tag-400',
  buttonX: 'absolute right-0 top-0 xs:text-sm text-xs'
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
            className: '!w-[90%]'
          }}
        >
          {inputLabelProps?.labelProps?.title}
        </InputLabel>

        <CircleAddButton className={inputBucketStyle.addButton} onClick={handleAddValue} />
      </div>

      <ul className={inputBucketStyle.tagsList}>
        {curBucketValuesArr.map((el, i) => {
          return (
            <li className={inputBucketStyle.tag} key={el + i}>
              {el}
              <button onClick={handleRemoveValue(el)} className={inputBucketStyle.buttonX}>
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
