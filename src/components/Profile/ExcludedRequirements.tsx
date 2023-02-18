import React from 'react';

import InputBucket from '../Inputs/InputBucket/InputBucket';
import { FormComponents } from '../UserForm/userForm';

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
        setExcludedRequirements(bucketValues);
        return <></>;
      }}
    </InputBucket>
  );
}

export default ExcludedRequirements;
