import React, { MouseEventHandler, useState } from 'react';
import { DynamicInputRenderProps, DynamicInputsProps, RenderElement } from './dynmicInputs';

/**
 * This component create dynamic array of inputs.
 * Each time the user execute the addMoreInput function which pass as props to the Render element,a new input is created.
 * This component return the array of inputs and children function that get the values of the inputs as parameter.
 */
function DynamicInput<T extends DynamicInputRenderProps>({
  firstElement,
  Render,
  children
}: DynamicInputsProps<T>) {
  const firstElementWithID = {
    ...firstElement,
    id: `input-${1}`
  };
  const [inputs, setInputState] = useState<RenderElement<T>[]>([firstElementWithID]);

  // Set a new value in the input that placed in the provided index.
  // Slice until the index, add the value, slice until the length of the inputs and concat the arrays.
  const setInputValue = (index: number, value: string) => {
    return (inputs: RenderElement<T>[]) => {
      const curInput = inputs[index];
      const firstPart = inputs.slice(0, index);
      const secPart = inputs.slice(index + 1);
      firstPart.push({
        ...curInput,
        value
      });
      return firstPart.concat(secPart);
    };
  };

  // Active setInputValue with the index and the value.
  const setValue = (index: number) => {
    return (value: string) => setInputState(setInputValue(index, value));
  };

  // Add new index in the inputs array.
  const addNewInput = (pre: RenderElement<T>[]) => {
    return [
      ...pre,
      {
        ...pre[0],
        id: `input-${pre.length + 1}`,
        value: ''
      }
    ];
  };

  // The function that execute the adding of a new input in the array.
  const addMoreInput: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setInputState(addNewInput);
  };
  return (
    <>
      {inputs?.map((input, i) => {
        return <Render key={input?.id} {...input} onClick={addMoreInput} setValue={setValue(i)} />;
      })}
      {children ? children(inputs.map((input) => input.value)) : <></>}
    </>
  );
}

export default DynamicInput;
