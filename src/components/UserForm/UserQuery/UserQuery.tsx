import Autocomplete from '@/components/Inputs/Autocomplete/Autocomplete';
import SelectInput from '@/components/Inputs/SelectInput/SelectInput';
import { Option, SelectInputProps } from '@/components/Inputs/SelectInput/selectInput';
import React from 'react';
import { FormComponents } from '../useUserForm/useUserForm';
// Import Autocomplete from '../Inputs/Autocomplete/Autocomplete';
import { DISTANCE_OPTIONS, EXPERIENCE_OPTIONS, JOB_TYPES_OPTIONS, SCOPES_OPTIONS } from './options';

const userQueryStyle = {
  selectInputsContainer: 'flex gap-2',
  optionContainer: 'text-right',
  label: 'text-right'
};
function UserQuery({ setSelectionInput }: FormComponents<unknown>) {
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
          options={['full stack', 'frontend'].map((el) => ({
            id: el,
            title: el,
            value: el
          }))}
        />
        <SelectInput {...selectInputProps('ניסיון מקצועי', EXPERIENCE_OPTIONS, 'experience')} />
      </div>

      <div className={userQueryStyle.selectInputsContainer}>
        <Autocomplete
          setValue={setSelectionInput('location')}
          label="עיר"
          options={['תל אביב', 'קרית אונו'].map((el) => ({
            id: el,
            title: el,
            value: el
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
