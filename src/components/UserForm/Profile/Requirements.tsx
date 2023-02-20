import React from 'react';

import DynamicInputs from '../../Inputs/DynamicInputs/DynamicInputs';
import { FormComponents } from '../useUserForm/useUserForm';
import MinMaxInputs from './MinMaxSelect';
function ProfileRequirements({ setRequirements, formValues }: FormComponents<unknown>) {
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
