import React from 'react';
import MinMaxSelect, { MinMaxSelectOption, MinMaxSelectProps } from './MinMaxSelect';
import DynamicInputs from '../Inputs/DynamicInputs/DynamicInputs';

function MyStack() {
  return (
    <DynamicInputs<MinMaxSelectProps, MinMaxSelectOption>
      firstElement={{
        min: 0,
        max: 1,
        title: 'javascript'
      }}
      Render={({ setValue }) => (
        <>
          <MinMaxSelect options={['javascript', 'react', 'typescript']} setValue={setValue} />
        </>
      )}
    >
      {(values) => {
        return (
          <button
            onClick={(e) => {
              e.preventDefault();
              console.log(values);
            }}
          >
            Submit
          </button>
        );
      }}
    </DynamicInputs>
  );
}

export default MyStack;
