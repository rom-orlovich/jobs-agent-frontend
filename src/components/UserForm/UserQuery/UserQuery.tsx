import Autocomplete from '@/components/Inputs/Autocomplete/Autocomplete';
import SelectInput from '@/components/Inputs/SelectInput/SelectInput';
import { Option, SelectInputProps } from '@/components/Inputs/SelectInput/selectInput';
import React from 'react';
import { FormComponents } from '../useUserForm/useUserForm';
import useSwr from 'swr';
// Import Autocomplete from '../Inputs/Autocomplete/Autocomplete';
import { DISTANCE_OPTIONS, EXPERIENCE_OPTIONS, JOB_TYPES_OPTIONS, SCOPES_OPTIONS } from './options';

const userQueryStyle = {
  selectInputsContainer: 'flex gap-2',
  optionContainer: 'text-right',
  label: 'text-right'
};
function UserQuery({ setSelectionInput, formValues }: FormComponents<unknown>) {
  const { data: locationData } = useSwr<{ data: { locationID: string; locationName: string }[] }>(
    `http://localhost:3000/api/locations?name=${formValues.userQuery.location}`
  );
  const { data: positionData } = useSwr<{ data: { positionID: string; positionName: string }[] }>(
    `http://localhost:3000/api/positions?name=${formValues.userQuery.position}`
  );

  const selectInputProps: (
    title: string,
    options: Option<string>[],
    id: string
  ) => SelectInputProps<string> = (title, options, id) => ({
    labelProps: {
      title: title,
      className: userQueryStyle.label
    },
    options: options,
    optionsElProps: {
      className: userQueryStyle.optionContainer
    },
    setValue: setSelectionInput(id)
  });

  return (
    <div className="flex flex-col gap-2">
      <div className={userQueryStyle.selectInputsContainer}>
        <Autocomplete
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
          setValue={setSelectionInput('location')}
          label="עיר"
          options={(locationData?.data || []).map((el) => ({
            id: el.locationID,
            title: el.locationName,
            value: el.locationName
          }))}
        />
        {/* <SelectInput /> */}
        <SelectInput {...selectInputProps('מרחק מהבית', DISTANCE_OPTIONS, 'distance')} />
      </div>
      <div className={userQueryStyle.selectInputsContainer}>
        <SelectInput {...selectInputProps('סוג עבודה', JOB_TYPES_OPTIONS, 'jobType')} />
        <SelectInput {...selectInputProps('סוג משרה', SCOPES_OPTIONS, 'scope')} />
      </div>
    </div>
  );
}

export default UserQuery;
