import React, { MouseEventHandler } from 'react';

import DynamicInputs from '../../Inputs/DynamicInputs/DynamicInputs';
import MinMaxInputs, { MinMaxInputsOption } from './MinMaxInputs';
import { RenderElement } from '@/components/Inputs/DynamicInputs/dynamicInputs.types';
import SuccessButton from '@/components/Buttons/SuccessButton';
import { ProfileFormComponentsProps } from '@/hooks/useProfileForm/useProfileForm';
function Requirements({ handleRequirements, formValues }: ProfileFormComponentsProps<unknown>) {
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
      overflowProps={{
        minChild: 2,
        innerDiv: {
          className: 'p-2'
        }
      }}
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
          <div className="mt-2 flex w-full justify-end">
            <SuccessButton onClick={handleConfirmRequirements(values)} />
          </div>
        );
      }}
    </DynamicInputs>
  );
}

export default Requirements;
