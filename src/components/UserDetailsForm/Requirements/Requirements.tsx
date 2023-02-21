import React from 'react';

import DynamicInputs from '../../Inputs/DynamicInputs/DynamicInputs';
import { FormComponents } from '../../../hooks/useUserDetailsForm/useUserDetailsForm';
import MinMaxInputs from './MinMaxInputs';
function Requirements({ handleRequirements, formValues }: FormComponents<unknown>) {
  const initialRequirement = [
    {
      min: 0,
      max: 1,
      field: ''
    }
  ];

  return (
    <DynamicInputs
      defaultValues={formValues.requirements.length ? formValues.requirements : initialRequirement}
      Render={({ setValue, max, min, field }) => (
        <MinMaxInputs
          inputTitle={{
            labelProps: {
              title: 'דרישה'
            }
          }}
          initialValues={{
            min,
            max,
            field
          }}
          setValue={setValue}
        />
      )}
    >
      {(values) => {
        return (
          <div className="flex w-full justify-end">
            <button
              className="rounded-lg bg-blue-500 p-1 px-4 text-cyan-50"
              onClick={(e) => {
                e.preventDefault();
                handleRequirements(values);
              }}
            >
              אשר
            </button>
          </div>
        );
      }}
    </DynamicInputs>
  );
}

export default Requirements;
