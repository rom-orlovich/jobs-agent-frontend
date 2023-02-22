import React, { MouseEventHandler } from 'react';

import DynamicInputs from '../../Inputs/DynamicInputs/DynamicInputs';
import { FormComponents } from '../../../hooks/useUserDetailsForm/useUserDetailsForm';
import MinMaxInputs, { MinMaxInputsOption } from './MinMaxInputs';
import { RenderElement } from '@/components/Inputs/DynamicInputs/dynamicInputs.types';
import ConfirmButton from '@/components/Buttons/ConfirmButton';
function Requirements({ handleRequirements, formValues }: FormComponents<unknown>) {
  const initialRequirement = [
    {
      min: 0,
      max: 1,
      field: ''
    }
  ];

  // Handle the the user's requirements success.
  const handleConfirmRequirements: (
    values: RenderElement<MinMaxInputsOption>[]
  ) => MouseEventHandler<HTMLButtonElement> = (values) => (e) => {
    e.preventDefault();
    handleRequirements(values);
  };

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
          <div className="mt-1 flex w-full justify-end">
            <ConfirmButton onClick={handleConfirmRequirements(values)} />
          </div>
        );
      }}
    </DynamicInputs>
  );
}

export default Requirements;
