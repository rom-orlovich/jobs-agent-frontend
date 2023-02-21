import React from 'react';

import InputBucket from '../../Inputs/InputBucket/InputBucket';
import { FormComponents } from '../../../hooks/useUserDetailsForm/useUserDetailsForm';
function ExcludedRequirements({ handleExcludedRequirements, formValues }: FormComponents<unknown>) {
  return (
    <InputBucket
      defaultValues={formValues.excludedRequirements}
      inputLabelProps={{
        labelProps: {
          title: 'מה אני לא רוצה'
        }
      }}
    >
      {(bucketValues) => {
        return (
          <button
            onClick={(e) => {
              e.preventDefault();
              handleExcludedRequirements(bucketValues);
            }}
          >
            אשר
          </button>
        );
      }}
    </InputBucket>
  );
}

export default ExcludedRequirements;
