import Autocomplete from '@/components/Inputs/Autocomplete/Autocomplete';
import SelectInput from '@/components/Inputs/SelectInput/SelectInput';

import React from 'react';
import { FormComponents } from '../useUserForm/useUserForm';
import useSwr from 'swr';

import {
  DISTANCE_OPTIONS,
  EXPERIENCE_OPTIONS,
  JOB_TYPES_OPTIONS,
  SCOPES_OPTIONS
} from './userQueryOptions';
import { UserQuery } from '@/lib/types/user.types';
import { API_ENDPOINTS } from '@/lib/endpoints';
import { Option, SelectInputProps } from '@/components/Inputs/SelectInput/selectInput.types';

const userQueryStyle = {
  selectInputsContainer: 'flex gap-2',
  optionContainer: 'text-right',
  label: 'text-right'
};
function UserQuery({ setSelectionInput, formValues }: FormComponents<unknown>) {
  const { data: locationData } = useSwr<{ data: { locationID: string; locationName: string }[] }>(
    `/${API_ENDPOINTS.LOCATIONS}?name=${formValues.userQuery.location}`
  );
  const { data: positionData } = useSwr<{ data: { positionID: string; positionName: string }[] }>(
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
    setValue: setSelectionInput(id),
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
          setValue={setSelectionInput('position')}
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
          setValue={setSelectionInput('location')}
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
