import React, { MouseEventHandler } from 'react';

import InputBucket from '../Inputs/InputBucket/InputBucket';
import { FormComponents } from '../../hooks/useUserProfileForm/useUserProfileForm';
import ConfirmButton from '../Buttons/ConfirmButton';
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
            <ConfirmButton className="mt-2" onClick={handleConfirmExcludedRequirements(bucketValues)} />
          </div>
        );
      }}
    </InputBucket>
  );
}

export default ExcludedRequirements;
