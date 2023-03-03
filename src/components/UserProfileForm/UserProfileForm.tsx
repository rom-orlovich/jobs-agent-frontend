import React from 'react';

import UserQuery from './UserQuery/UserQuery';

import useProfileForm from '../../hooks/useProfileForm/useProfileForm';

import InputLabel from '../Inputs/InputLabel/InputLabel';
import ExcludedRequirements from './ExcludedRequirements';
import Requirements from './Requirements/Requirements';
import ToggleTopic from './ToggleTopic';
// import SuccessButton from '../Buttons/SuccessButton';

import { useAuthContext } from '@/context/AuthContext';
import ScannerControlButtons from './ScannerControlButtons/ScannerControlButtons';
// import { MdSave } from 'react-icons/md';
const userProfileFormStyle = {
  form: 'sm:max-w-[32rem]  sm:min-w-[27rem] sm:min-h-[27rem] xs:min-w-[25rem] min-w-[20rem] min-h-[25rem]  max-h-fit flex flex-col justify-between p-6 card gap-4',
  inputsContainer: 'flex flex-col gap-5',
  heading: 'text-xl font-[500]',
  label: 'flex items-center text-center gap-1',
  text: '',
  inputContainer: 'max-w-[4rem]',
  input: 'text-center py-[0.3rem] text-[0.8rem]',
  labelTextArea: 'flex flex-col max-w-[theme(spacing.80)]',
  icon: 'text-adding-primary'
};

function UserProfileForm() {
  const { userProfileData } = useAuthContext();
  const userForm = useProfileForm(userProfileData);

  return (
    <form onSubmit={userForm.handleUserProfileFormSubmit} className={userProfileFormStyle.form}>
      <div className={userProfileFormStyle.inputsContainer}>
        <ToggleTopic
          headingProps={{
            className: userProfileFormStyle.heading,
            title: 'מה הניסיון הכללי שלך?'
          }}
        >
          <InputLabel
            labelProps={{
              className: userProfileFormStyle.label
            }}
            textProps={{
              className: userProfileFormStyle.text
            }}
            inputProps={{
              inputContainer: {
                className: userProfileFormStyle.inputContainer
              },
              value: userForm.formValues.overallEx,
              id: 'overallEx',
              className: userProfileFormStyle.input,
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
            className: userProfileFormStyle.heading,
            title: 'מה הדרישות שלך?'
          }}
        >
          <Requirements {...userForm} />
        </ToggleTopic>
        <ToggleTopic
          headingProps={{
            className: userProfileFormStyle.heading,
            title: 'מה אתה לא מחפש?'
          }}
        >
          <ExcludedRequirements {...userForm} />
        </ToggleTopic>
        <ToggleTopic
          headingProps={{
            className: userProfileFormStyle.heading,
            title: 'מה אתה מחפש?'
          }}
        >
          <UserQuery {...userForm} />
        </ToggleTopic>
      </div>
      <ScannerControlButtons {...userForm} />
    </form>
  );
}

export default UserProfileForm;
