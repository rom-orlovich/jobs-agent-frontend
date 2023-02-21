import React, { MouseEventHandler, useState } from 'react';
import { IoMdRemoveCircle } from 'react-icons/io';
import { AiFillPlusCircle } from 'react-icons/ai';
import { DynamicInputRenderProps, DynamicInputsProps, RenderElement } from './dynamicInputs.types';

/**
 * This component create dynamic array of inputs.
 * Each time the user execute the addMoreInput function which pass as props to the Render element,a new input is created.
 * This component return the array of inputs and children function that get the values of the inputs as parameter.
 */
function DynamicInputs<T extends DynamicInputRenderProps>({
  defaultValues,
  Render,
  children
}: DynamicInputsProps<T>) {
  const defaultValuesWithID = defaultValues.map((el, i) => ({
    ...el,
    id: `input-${i + 1}`
  }));

  const [inputs, setInputState] = useState<RenderElement<T>[]>(defaultValuesWithID);

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
      return firstPart.concat(secPart);
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
      {inputs?.map((input, i) => {
        return (
          <span key={input?.id} className="relative">
            <Render {...input} setValue={setValue(i)} />

            <button className="absolute left-0 top-[50%]  text-red-400" onClick={removeExistInput(i)}>
              <IoMdRemoveCircle className="h-[1.5rem] w-[1.5rem]" />
            </button>
          </span>
        );
      })}
      <div className="mt-2 flex w-full justify-center">
        <button className="text-green-400" onClick={addMoreInput}>
          <AiFillPlusCircle className="h-[1.5rem] w-[1.5rem]" />
        </button>
      </div>

      {children ? children(inputs) : <></>}
    </>
  );
}

export default DynamicInputs;
