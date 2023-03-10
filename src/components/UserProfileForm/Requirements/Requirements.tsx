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
    <div className="p-2">
      <DynamicInputs
        liProps={{
          className: ''
        }}
        removeButtonProps={{
          className: '!left-[0%]'
        }}
        overflowProps={{
          outerDiv: {
            className: 'h-fit'
          },
          minChild: 3,
          innerDiv: {
            className: 'h-fit'
          },
          activeClassOuter: '!h-[10rem]',
          activeClassInner: '!min-h-[12rem]'
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
            <div className="mt-4 flex w-full justify-end">
              <SuccessButton onClick={handleConfirmRequirements(values)} />
            </div>
          );
        }}
      </DynamicInputs>
    </div>
  );
}

export default Requirements;
