import React, { MouseEventHandler } from 'react';

import InputBucket from '../Inputs/InputBucket/InputBucket';
import { ProfileFormComponentsProps } from '../../hooks/useProfileForm/useProfileForm';
import SuccessButton from '../Buttons/SuccessButton';
function ExcludedRequirements({
  handleExcludedRequirements,
  formValues
}: ProfileFormComponentsProps<unknown>) {
  const handleConfirmExcludedRequirements: (
    bucketValues: string[]
  ) => MouseEventHandler<HTMLButtonElement> = (bucketValues) => (e) => {
    e.preventDefault();
    handleExcludedRequirements(bucketValues);
  };
  return (
    <InputBucket defaultValues={formValues.excludedRequirements}>
      {(bucketValues) => {
        return (
          <div className="flex w-full justify-end">
            <SuccessButton className="mt-4" onClick={handleConfirmExcludedRequirements(bucketValues)} />
          </div>
        );
      }}
    </InputBucket>
  );
}

export default ExcludedRequirements;
