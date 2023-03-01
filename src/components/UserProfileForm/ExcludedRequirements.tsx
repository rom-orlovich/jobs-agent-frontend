import React, { MouseEventHandler } from 'react';

import InputBucket from '../Inputs/InputBucket/InputBucket';
import { FormComponents } from '../../hooks/useUserProfileForm/useUserProfileForm';
import SuccessButton from '../Buttons/SuccessButton';
function ExcludedRequirements({ handleExcludedRequirements, formValues }: FormComponents<unknown>) {
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
            <SuccessButton className="mt-2" onClick={handleConfirmExcludedRequirements(bucketValues)} />
          </div>
        );
      }}
    </InputBucket>
  );
}

export default ExcludedRequirements;
