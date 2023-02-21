import React from 'react';

import UserQuery from './UserQuery/UserQuery';

import useUserDetailsForm from '../../hooks/useUserDetailsForm/useUserDetailsForm';
import { UserOptions } from '@/lib/types/api.types';
import InputLabel from '../Inputs/InputLabel/InputLabel';
import ExcludedRequirements from './ExcludedRequirements';
import Requirements from './Requirements/Requirements';
import ToggleTopic from './ToggleTopic';

const formStyle = {
  form: 'w-[20rem]'
};

const inputLabelStyle = {
  label: 'flex flex-col max-w-[theme(spacing.40)] text-right',
  input: '',
  labelTextArea: 'flex flex-col max-w-[theme(spacing.80)] text-right',
  icon: 'text-green-400',
  button: 'absolute right-0 top-0'
};

function UserDetailsForm({ user }: { user: UserOptions }) {
  const userForm = useUserDetailsForm(user);

  const userDetailsFormStyle = {
    heading: 'text-xl font-[500]'
  };
  return (
    <form onSubmit={userForm.handleUserDetailsFormSubmit} className={formStyle.form}>
      <div>
        <h3 className={userDetailsFormStyle.heading}> מה הניסיון הכללי שלך?</h3>
        <InputLabel
          labelProps={{
            className: inputLabelStyle.label
          }}
          inputProps={{
            value: userForm.formValues.overallEx,
            id: 'overallEx',
            className: inputLabelStyle.input,
            type: 'text',
            onChange: userForm.handleOverallExperience
          }}
        >
          שנות ניסיון
        </InputLabel>
      </div>

      <div>
        <ToggleTopic
          headingProps={{
            className: userDetailsFormStyle.heading,
            title: 'מה הדרישות שלך?'
          }}
        >
          <Requirements {...userForm} />
        </ToggleTopic>
      </div>

      <div>
        <ToggleTopic
          headingProps={{
            className: userDetailsFormStyle.heading,
            title: 'מה אתה לא מחפש?'
          }}
        >
          <ExcludedRequirements {...userForm} />
        </ToggleTopic>
      </div>
      <div>
        <ToggleTopic
          headingProps={{
            className: userDetailsFormStyle.heading,
            title: 'מה אתה מחפש?'
          }}
        >
          <UserQuery {...userForm} />
        </ToggleTopic>
      </div>

      <button type="submit">אשר</button>
      <p>{userForm.formState.data?.message}</p>
    </form>
  );
}

export default UserDetailsForm;
