import SelectInput from '@/components/Inputs/SelectInput/SelectInput';

import React from 'react';
import { FormComponents } from '../../../hooks/useUserProfileForm/useUserProfileForm';
import {
  DISTANCE_OPTIONS,
  EXPERIENCE_OPTIONS,
  JOB_TYPES_OPTIONS,
  SCOPES_OPTIONS
} from './userQueryOptions';
import { Option, SelectInputProps } from '@/components/Inputs/SelectInput/selectInput.types';

import PositionsAutocomplete from './PositionsAutocomplete';
import LocationsAutocomplete from './LocationsAutocomplete';
import { UserQuery } from '@/lib/types/api.types';

const userQueryStyle = {
  selectInputsContainer: 'flex gap-2',
  optionContainer: '',
  selectInputWrapper: '',
  'input-label-wrapper': 'flex flex-col font-lg'
};
function UserQuery(formComponentsProps: FormComponents<unknown>) {
  const { handleSelectionInput, formValues } = formComponentsProps;
  const selectInputProps: (
    title: string,
    options: Option<string>[],
    id: keyof UserQuery
  ) => SelectInputProps<string> = (title, options, id) => ({
    selectInputWrapper: {
      className: userQueryStyle.selectInputWrapper
    },
    labelProps: {
      title: title
    },
    multiple: true,
    options: options,

    setValue: handleSelectionInput(id),
    defaultValue: Array.isArray(formValues?.userQuery[id])
      ? options.filter((el) => formValues.userQuery[id].includes(el.value))
      : {
          id: id,
          title: title,
          value: formValues?.userQuery[id][0]
        }
  });

  return (
    <div className="flex flex-col gap-2">
      <div className={userQueryStyle.selectInputsContainer}>
        <PositionsAutocomplete
          {...formComponentsProps}
          inputLabelProps={{
            wrapperInputLabel: {
              className: userQueryStyle['input-label-wrapper']
            }
          }}
        />
        <SelectInput {...selectInputProps('שנות ניסיון', EXPERIENCE_OPTIONS, 'experience')} />
      </div>

      <div className={userQueryStyle.selectInputsContainer}>
        <LocationsAutocomplete
          inputLabelProps={{
            wrapperInputLabel: {
              className: userQueryStyle['input-label-wrapper']
            }
          }}
          {...formComponentsProps}
        />
        <SelectInput
          {...selectInputProps('מרחק מהבית', DISTANCE_OPTIONS, 'distance')}
          multiple={false}
        />
      </div>
      <div className={userQueryStyle.selectInputsContainer}>
        <SelectInput {...selectInputProps('סוג עבודה', JOB_TYPES_OPTIONS, 'jobType')} />
        <SelectInput {...selectInputProps('סוג משרה', SCOPES_OPTIONS, 'scope')} />
      </div>
    </div>
  );
}

export default UserQuery;