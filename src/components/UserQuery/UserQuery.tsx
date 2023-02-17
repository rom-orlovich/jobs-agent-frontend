import React from 'react';
import Autocomplete from '../Autocomplete/Autocomplete';

import SelectInput from '../Inputs/SelectInput/SelectInput';
import { Option } from '../Inputs/SelectInput/selectInput';
import {
  DISTANCE_OPTIONS,
  EXPERIENCE_OPTIONS,
  JOB_TYPES_OPTIONS,
  SCOPES_OPTIONS
} from './options';

const userQueryStyle = {
  selectInputsContainer: 'flex gap-2',
  optionContainer: 'text-right',
  label: 'text-right'
};

const selectInputProps = (title: string, options: Option[]) => ({
  labelProps: {
    title: title,
    className: userQueryStyle.label
  },
  options: options,
  optionsElProps: {
    className: userQueryStyle.optionContainer
  }
});

function UserQuery() {
  return (
    <div className="flex flex-col gap-2">
      <div className={userQueryStyle.selectInputsContainer}>
        <Autocomplete />
        <SelectInput
          {...selectInputProps('ניסיון מקצועי', EXPERIENCE_OPTIONS)}
        />
      </div>

      <div className={userQueryStyle.selectInputsContainer}>
        <Autocomplete />
        {/* <SelectInput /> */}
        <SelectInput {...selectInputProps('מרחק מהבית', DISTANCE_OPTIONS)} />
      </div>
      <div className={userQueryStyle.selectInputsContainer}>
        <SelectInput {...selectInputProps('סוג עבודה', JOB_TYPES_OPTIONS)} />
        <SelectInput {...selectInputProps('סוג משרה', SCOPES_OPTIONS)} />
      </div>
    </div>
  );
}

export default UserQuery;
