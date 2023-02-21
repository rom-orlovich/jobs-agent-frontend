import Autocomplete from '@/components/Inputs/Autocomplete/Autocomplete';
import SelectInput from '@/components/Inputs/SelectInput/SelectInput';

import React from 'react';
import { FormComponents } from '../../../hooks/useUserDetailsForm/useUserDetailsForm';
import useSwr from 'swr';

import {
  DISTANCE_OPTIONS,
  EXPERIENCE_OPTIONS,
  JOB_TYPES_OPTIONS,
  SCOPES_OPTIONS
} from './userQueryOptions';

import { API_ENDPOINTS } from '@/lib/endpoints';
import { Option, SelectInputProps } from '@/components/Inputs/SelectInput/selectInput.types';
import { Location, Position, UserQuery } from '@/lib/types/api.types';

const userQueryStyle = {
  selectInputsContainer: 'flex gap-2',
  optionContainer: 'text-right',
  label: 'text-right'
};
function UserQuery({ handleSelectionInput, formValues }: FormComponents<unknown>) {
  const { data: locationData } = useSwr<{ data: Location[] }>(
    `/${API_ENDPOINTS.LOCATIONS}?name=${formValues.userQuery.location}`
  );
  const { data: positionData } = useSwr<{ data: Position[] }>(
    `/${API_ENDPOINTS.POSITIONS}?name=${formValues.userQuery.position}`
  );

  const selectInputProps: (
    title: string,
    options: Option<string>[],
    id: keyof UserQuery
  ) => SelectInputProps<string> = (title, options, id) => ({
    labelProps: {
      title: title,
      className: userQueryStyle.label
    },
    multiple: true,
    options: options,
    optionsElProps: {
      className: userQueryStyle.optionContainer
    },
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
        <Autocomplete
          defaultValue={{
            id: `default-position`,
            title: formValues.userQuery.position,
            value: formValues.userQuery.position
          }}
          setValue={handleSelectionInput('position')}
          label="תפקיד"
          options={(positionData?.data || []).map((el) => ({
            id: el.positionID,
            title: el.positionName,
            value: el.positionName
          }))}
        />
        <SelectInput {...selectInputProps('ניסיון מקצועי', EXPERIENCE_OPTIONS, 'experience')} />
      </div>

      <div className={userQueryStyle.selectInputsContainer}>
        <Autocomplete
          defaultValue={{
            id: `default-location`,
            title: formValues.userQuery.location,
            value: formValues.userQuery.location
          }}
          setValue={handleSelectionInput('location')}
          label="עיר"
          options={(locationData?.data || []).map((el) => ({
            id: el.locationID,
            title: el.locationName,
            value: el.locationName
          }))}
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
