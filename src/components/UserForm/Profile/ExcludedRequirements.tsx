import React from 'react';

import InputBucket from '../../Inputs/InputBucket/InputBucket';
import { FormComponents } from '../userForm';

function ExcludedRequirements({ setExcludedRequirements }: FormComponents<unknown>) {
  return (
    <InputBucket
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
