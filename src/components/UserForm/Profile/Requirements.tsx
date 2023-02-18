import React from 'react';
import MinMaxSelect from './MinMaxSelect';
import DynamicInputs from '../../Inputs/DynamicInputs/DynamicInputs';
import { FormComponents } from '../userForm';

function ProfileRequirements({ setRequirements }: FormComponents<unknown>) {
  return (
    <DynamicInputs
      firstElement={{
        min: 0,
        max: 1,
        title: 'javascript'
      }}
      Render={({ setValue }) => (
        <>
          <MinMaxSelect
            // AutocompleteProps={{
            //   Label: 'Requirement'
            // }}
            // Options={['javascript', 'react', 'typescript']}
            inputLabelProps={{
              labelProps: {
                title: 'דרישה'
              }
            }}
            setValue={setValue}
          />
        </>
      )}
    >
      {(values) => {
        return (
          <button
            onClick={(e) => {
              e.preventDefault();
              setRequirements(values);
            }}
          >
            אשר
          </button>
        );
      }}
    </DynamicInputs>
  );
}

export default ProfileRequirements;
