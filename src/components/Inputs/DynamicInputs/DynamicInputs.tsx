import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';

import { DynamicInputRenderProps, DynamicInputsProps, RenderElement } from './dynamicInputs.types';
import CircleRemoveButton from '@/components/Buttons/CircleRemoveButton';
import CircleAddButton from '@/components/Buttons/CircleAddButton';
import Overflow from '@/components/Overflow/Overflow';
import { classNameGenerator } from '@/lib/utils';

/**
 * This component create dynamic array of inputs.
 * Each time the user execute the addMoreInput function which pass as props to the Render element,a new input is created.
 * This component return the array of inputs and children function that get the values of the inputs as parameter.
 */
function DynamicInputs<T extends DynamicInputRenderProps>({
  defaultValues,
  Render,
  children,
  addButtonProps,
  removeButtonProps,
  overflowProps,
  liProps,

  setDynamicInputState
}: DynamicInputsProps<T>) {
  const defaultValuesWithID = defaultValues.map((el, i) => ({
    ...el,
    id: `input-${i + 1}`
  }));

  const [inputs, setInputState] = useState<RenderElement<T>[]>(defaultValuesWithID);

  useEffect(() => {
    setDynamicInputState && setDynamicInputState(inputs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs]);

  // Set a new value in the input that placed in the provided index.
  // Slice until the index, add the value, slice until the length of the inputs and concat the arrays.
  const setInputValue = (index: number, value: T) => {
    return (inputs: RenderElement<T[]>) => {
      const curInput = inputs[index];
      const firstPart = inputs.slice(0, index);
      const secPart = inputs.slice(index + 1);

      firstPart.push({
        ...curInput,
        ...value
      });
      const concatResult = firstPart.concat(secPart);
      return concatResult;
    };
  };
  const removeInputValue = (index: number) => {
    return (inputs: RenderElement<T[]>) => {
      return inputs.filter((el, i) => i !== index);
    };
  };

  // Active setInputValue with the index and the value.
  const setValue = (index: number) => {
    return (value: T) => setInputState(setInputValue(index, value));
  };

  // Add new index in the inputs array.
  const addNewInput = (pre: RenderElement<T[]>) => {
    return [
      ...pre,
      {
        ...pre[0],
        id: `input-${pre.length + 1}`
      }
    ];
  };
  const ref = useRef<null | HTMLDivElement>(null);

  const overflowIsActive = inputs.length >= (overflowProps?.minChild || 5);

  // The function that execute the adding of a new input in the array.
  const addMoreInput: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setInputState(addNewInput);
  };

  // The function that execute the removing of a exist input in the array.
  const removeExistInput: (index: number) => MouseEventHandler<HTMLButtonElement> = (index) => (e) => {
    e.preventDefault();
    setInputState(removeInputValue(index));
  };
  return (
    <>
      <Overflow
        active={overflowIsActive}
        activeClassInner={overflowProps?.activeClassInner}
        activeClassOuter={overflowProps?.activeClassOuter}
        outerElementClass={classNameGenerator('h-[14rem]', overflowProps?.outerDiv?.className)}
        innerElementClass={classNameGenerator(overflowProps?.innerDiv?.className)}
      >
        <ul className="flex flex-col gap-2">
          {inputs?.map((input, i) => {
            return (
              <li key={input?.id} className={classNameGenerator('relative', liProps?.className)}>
                <Render {...input} setValue={setValue(i)} />
                <CircleRemoveButton {...removeButtonProps} onClick={removeExistInput(i)} />
              </li>
            );
          })}
        </ul>
        <div ref={ref} className="mt-2 flex w-full justify-center">
          <CircleAddButton {...addButtonProps} onClick={addMoreInput} />
        </div>
      </Overflow>
      {children ? children(inputs) : <></>}
    </>
  );
}

export default DynamicInputs;
