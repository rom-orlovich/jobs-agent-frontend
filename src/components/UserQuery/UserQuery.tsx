import React from 'react';

import SelectInput from '../Inputs/SelectInput/SelectInput';
import {
  DISTANCE_OPTIONS,
  EXPERIENCE_OPTIONS,
  JOB_TYPES_OPTIONS,
  SCOPES_OPTIONS
} from './options';
// Const selectBoxStyle = { selectInput: 'max-w-xs' };
const userQueryStyle = {
  selectInputsContainer: 'flex gap-2',
  optionContainer: 'text-right',
  label: 'text-right'
};
function UserQuery() {
  return (
    <div className="flex flex-col gap-2">
      <div className={userQueryStyle.selectInputsContainer}>
        {/* <SelectInput /> */}
        <SelectInput
          labelProps={{
            title: 'ניסיון מקצועי',
            className: userQueryStyle.label
          }}
          options={EXPERIENCE_OPTIONS}
          optionsElProps={{
            className: userQueryStyle.optionContainer
          }}
        />
      </div>

      <div className={userQueryStyle.selectInputsContainer}>
        {/* <SelectInput /> */}
        <SelectInput
          labelProps={{
            title: 'מרחק מהבית',
            className: userQueryStyle.label
          }}
          options={DISTANCE_OPTIONS}
          optionsElProps={{
            className: userQueryStyle.optionContainer
          }}
        />
      </div>
      <div className={userQueryStyle.selectInputsContainer}>
        <SelectInput
          labelProps={{
            title: 'סוג עבודה',
            className: userQueryStyle.label
          }}
          options={JOB_TYPES_OPTIONS}
          optionsElProps={{
            className: userQueryStyle.optionContainer
          }}
        />
        <SelectInput
          labelProps={{
            title: 'סוג משרה',
            className: userQueryStyle.label
          }}
          options={SCOPES_OPTIONS}
          optionsElProps={{
            className: userQueryStyle.optionContainer
          }}
        />
      </div>
    </div>
  );
}

export default UserQuery;
