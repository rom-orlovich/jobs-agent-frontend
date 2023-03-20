import React from 'react';

import UserQuery from './UserQuery/UserQuery';

import useProfileForm from '../../hooks/useProfileForm/useProfileForm';
import ExcludedRequirements from './ExcludedRequirements';
import Requirements from './Requirements/Requirements';
import ToggleTopic from '../ToggleTopic/ToggleTopic';
import { useAuthContext } from '@/context/AuthContext';
import ScannerControlButtons from './ScannerControlButtons/ScannerControlButtons';
import Autocomplete from '../Inputs/Autocomplete/Autocomplete';
import { YEARS_EXPERIENCE_WORDS } from '@/hooks/useProfileForm/utils';
import ExcludedRequirementsInfo from './InfoTexts/ExcludedRequirementsInfo';
import RequirementsInfo from './InfoTexts/RequirementsInfo';
import UserQueryInfo from './InfoTexts/UserQueryInfo';
import OverallExInfo from './InfoTexts/OverallExInfo';
const userProfileFormStyle = {
  form: 'sm:max-w-[32rem]  sm:min-w-[27rem] sm:min-h-[27rem] xs:min-w-[25rem] min-w-[18rem] min-h-[25rem]  max-h-fit flex flex-col justify-between p-6 card gap-4',
  inputsContainer: 'flex flex-col gap-6 sm:max-w-[23rem]',
  heading: 'text-2xl font-[500]',
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
            title: 'כמה שנות ניסיון יש לך?'
          }}
          infoTopicProps={{
            popOverProps: {
              className: 'min-h-[7rem]'
            },
            children: <OverallExInfo />
          }}
        >
          <div className="px-3 py-2">
            <Autocomplete
              setValue={userForm.handleOverallExperience('overallEx')}
              options={YEARS_EXPERIENCE_WORDS.filter((el) => {
                if (userForm.formValues.overallEx) return el.includes(userForm.formValues.overallEx);
                else return true;
              })}
              defaultValue={userForm.formValues.overallEx}
              optionsProps={{
                className: '!overflow-y-hidden'
              }}
              inputLabelProps={{
                wrapperInputLabel: {
                  className: 'xs:max-w-[50%] max-w-[75%]'
                }
              }}
            />
          </div>
        </ToggleTopic>

        <ToggleTopic
          headingProps={{
            className: userProfileFormStyle.heading,
            title: 'מה הדרישות שלך?'
          }}
          infoTopicProps={{
            popOverProps: {
              className: 'min-w-[24rem] p-3'
            },
            children: <RequirementsInfo />
          }}
        >
          <Requirements {...userForm} />
        </ToggleTopic>
        <ToggleTopic
          headingProps={{
            className: userProfileFormStyle.heading,
            title: 'במה אינך מעוניינ/ת?'
          }}
          infoTopicProps={{
            children: <ExcludedRequirementsInfo />
          }}
        >
          <ExcludedRequirements {...userForm} />
        </ToggleTopic>
        <ToggleTopic
          headingProps={{
            className: userProfileFormStyle.heading,
            title: 'מה הינך מחפש?'
          }}
          infoTopicProps={{
            popOverProps: {
              className: 'min-h-[6rem]'
            },
            children: <UserQueryInfo />
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
