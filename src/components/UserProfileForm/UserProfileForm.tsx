import React from 'react';

import UserQuery from './UserQuery/UserQuery';

import useUserProfileForm from '../../hooks/useUserProfileForm/useUserProfileForm';
import { UserProfileWithOneUserQuery } from '@/lib/types/api.types';
import InputLabel from '../Inputs/InputLabel/InputLabel';
import ExcludedRequirements from './ExcludedRequirements';
import Requirements from './Requirements/Requirements';
import ToggleTopic from './ToggleTopic';
// import ConfirmButton from '../Buttons/ConfirmButton';
import ScannerControlButtons from '../ScannerControlButtons/ScannerControlButtons';
// import { MdSave } from 'react-icons/md';
const UserProfileFormStyle = {
  form: 'max-w-[35rem] min-w-[15rem] flex flex-col gap-4 shadow-lg p-4 rounded-md bg-white ',
  heading: 'text-xl font-[500]',
  label: 'flex items-center text-center gap-1',
  text: '',
  inputContainer: 'max-w-[4rem]',
  input: 'text-center py-[0.3rem] text-[0.8rem]',
  labelTextArea: 'flex flex-col max-w-[theme(spacing.80)]',
  icon: 'text-adding-primary'
};

function UserProfileForm({ user }: { user: UserProfileWithOneUserQuery }) {
  const userForm = useUserProfileForm(user);

  return (
    <form onSubmit={userForm.handleUserProfileFormSubmit} className={UserProfileFormStyle.form}>
      <ToggleTopic
        headingProps={{
          className: UserProfileFormStyle.heading,
          title: 'מה הניסיון הכללי שלך?'
        }}
      >
        <InputLabel
          labelProps={{
            className: UserProfileFormStyle.label
          }}
          textProps={{
            className: UserProfileFormStyle.text
          }}
          inputProps={{
            inputContainer: {
              className: UserProfileFormStyle.inputContainer
            },
            value: userForm.formValues.overallEx,
            id: 'overallEx',
            className: UserProfileFormStyle.input,
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
          className: UserProfileFormStyle.heading,
          title: 'מה הדרישות שלך?'
        }}
      >
        <Requirements {...userForm} />
      </ToggleTopic>
      <ToggleTopic
        headingProps={{
          className: UserProfileFormStyle.heading,
          title: 'מה אתה לא מחפש?'
        }}
      >
        <ExcludedRequirements {...userForm} />
      </ToggleTopic>
      <ToggleTopic
        headingProps={{
          className: UserProfileFormStyle.heading,
          title: 'מה אתה מחפש?'
        }}
      >
        <UserQuery {...userForm} />
      </ToggleTopic>

      <ScannerControlButtons user={user} />
    </form>
  );
}

export default UserProfileForm;
