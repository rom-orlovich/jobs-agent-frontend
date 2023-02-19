import React from 'react';

import InputBucket from '../../Inputs/InputBucket/InputBucket';
import { FormComponents } from '../useUserForm/useUserForm';
function ExcludedRequirements({ setExcludedRequirements, formValues }: FormComponents<unknown>) {
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
              setExcludedRequirements(bucketValues);
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
