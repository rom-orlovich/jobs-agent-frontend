import React from 'react';

import UserQuery from './UserQuery/UserQuery';

import useUserDetailsForm from '../../hooks/useUserDetailsForm/useUserDetailsForm';
import { UserOptions } from '@/lib/types/api.types';
import InputLabel from '../Inputs/InputLabel/InputLabel';
import ExcludedRequirements from './ExcludedRequirements';
import Requirements from './Requirements/Requirements';
import ToggleTopic from './ToggleTopic';
import ConfirmButton from '../Buttons/ConfirmButton';
import ScannerControlButtons from '../ScannerControlButtons/ScannerControlButtons';
const userDetailsFormStyle = {
  form: 'w-[28rem]',
  heading: 'text-xl font-[500]',
  label: 'flex items-center text-center gap-1',
  text: '',
  inputContainer: 'max-w-[4rem]',
  input: 'text-center py-[0.3rem] text-[0.8rem]',
  labelTextArea: 'flex flex-col max-w-[theme(spacing.80)]',
  icon: 'text-adding-primary',
  buttonContainer: 'flex justify-end mt-2'
};

function UserDetailsForm({ user }: { user: UserOptions }) {
  const userForm = useUserDetailsForm(user);

  return (
    <form onSubmit={userForm.handleUserDetailsFormSubmit} className={userDetailsFormStyle.form}>
      <ToggleTopic
        headingProps={{
          className: userDetailsFormStyle.heading,
          title: 'מה הניסיון הכללי שלך?'
        }}
      >
        <InputLabel
          labelProps={{
            className: userDetailsFormStyle.label
          }}
          textProps={{
            className: userDetailsFormStyle.text
          }}
          inputProps={{
            inputContainer: {
              className: userDetailsFormStyle.inputContainer
            },
            value: userForm.formValues.overallEx,
            id: 'overallEx',
            className: userDetailsFormStyle.input,
            type: 'number',
            min: 0,
            onChange: userForm.handleOverallExperience
          }}
        >
          שנות ניסיון
        </InputLabel>
      </ToggleTopic>

      <ToggleTopic
        headingProps={{
          className: userDetailsFormStyle.heading,
          title: 'מה הדרישות שלך?'
        }}
      >
        <Requirements {...userForm} />
      </ToggleTopic>
      <ToggleTopic
        headingProps={{
          className: userDetailsFormStyle.heading,
          title: 'מה אתה לא מחפש?'
        }}
      >
        <ExcludedRequirements {...userForm} />
      </ToggleTopic>
      <ToggleTopic
        headingProps={{
          className: userDetailsFormStyle.heading,
          title: 'מה אתה מחפש?'
        }}
      >
        <UserQuery {...userForm} />
      </ToggleTopic>

      <div className={userDetailsFormStyle.buttonContainer}>
        <ConfirmButton type="submit">שמור חיפוש</ConfirmButton>
      </div>
      <ScannerControlButtons user={user} />
    </form>
  );
}

export default UserDetailsForm;
