import React from 'react';

import UserQuery from './UserQuery/UserQuery';

import useUserDetailsForm from '../../hooks/useUserDetailsForm/useUserDetailsForm';
import { UserOptions } from '@/lib/types/api.types';
import InputLabel from '../Inputs/InputLabel/InputLabel';
import ExcludedRequirements from './ExcludedRequirements';
import Requirements from './Requirements/Requirements';
import ToggleTopic from './ToggleTopic';
import ConfirmButton from '../Buttons/ConfirmButton';
const formStyle = {
  form: 'w-[28rem]'
};

const inputLabelStyle = {
  heading: 'text-xl font-[500]',
  label: 'flex items-center text-center gap-1',
  text: '',
  inputContainer: 'max-w-[4rem]',
  input: 'text-center py-[0.3rem] text-[0.8rem]',
  labelTextArea: 'flex flex-col max-w-[theme(spacing.80)]',
  icon: 'text-green-400',

  buttonContainer: 'flex justify-end'
};

function UserDetailsForm({ user }: { user: UserOptions }) {
  const userForm = useUserDetailsForm(user);

  return (
    <form onSubmit={userForm.handleUserDetailsFormSubmit} className={formStyle.form}>
      <div>
        <h3 className={inputLabelStyle.heading}> מה הניסיון הכללי שלך?</h3>
        <InputLabel
          labelProps={{
            className: inputLabelStyle.label
          }}
          textProps={{
            className: inputLabelStyle.text
          }}
          inputProps={{
            inputContainer: {
              className: inputLabelStyle.inputContainer
            },
            value: userForm.formValues.overallEx,
            id: 'overallEx',
            className: inputLabelStyle.input,
            type: 'number',
            min: 0,
            onChange: userForm.handleOverallExperience
          }}
        >
          שנות ניסיון
        </InputLabel>
      </div>
      <ToggleTopic
        headingProps={{
          className: inputLabelStyle.heading,
          title: 'מה הדרישות שלך?'
        }}
      >
        <Requirements {...userForm} />
      </ToggleTopic>

      <div>
        <ToggleTopic
          headingProps={{
            className: inputLabelStyle.heading,
            title: 'מה אתה לא מחפש?'
          }}
        >
          <ExcludedRequirements {...userForm} />
        </ToggleTopic>
      </div>
      <div>
        <ToggleTopic
          headingProps={{
            className: inputLabelStyle.heading,
            title: 'מה אתה מחפש?'
          }}
        >
          <UserQuery {...userForm} />
        </ToggleTopic>
      </div>
      <div className={inputLabelStyle.buttonContainer}>
        <ConfirmButton type="submit">אשר</ConfirmButton>
      </div>
      <p>{userForm.formState.data?.message}</p>
    </form>
  );
}

export default UserDetailsForm;
