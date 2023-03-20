/* eslint-disable @typescript-eslint/no-unused-vars */
import { updateUser } from '@/lib/api/users.utils';

import { UserProfileWithOneUserQuery } from '@/lib/types/user.types';
import { getResMessage } from '@/lib/utils';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import { MinMaxInputsOption } from '../../components/UserProfileForm/Requirements/MinMaxInputs';
import useForm from '../useForm';

import {
  getOverallExYearNum,
  getOverallExYearWords,
  transformDefaultFormValues,
  transformExcludedRequirements,
  transformRequirements
} from './utils';

/**
 * Manage the user details form state.
 * @param {UserProfile} user The current login user.
 */
function useProfileForm(user: UserProfileWithOneUserQuery) {
  const router = useRouter();

  const formInitialValue: UserProfileWithOneUserQuery = user;
  // Initializes the form state and get the utils functions from useForm hook.
  const { formValues, onSubmit, setFormValues, formState, handleSetValue, onChange } = useForm<
    UserProfileWithOneUserQuery,
    { message: string }
  >(formInitialValue);

  // Handles the overallExperience on change event.
  const handleOverallExperience = (id: keyof typeof formValues) => (value: string) => {
    //If value is not undefined use the current input's value.
    //Else use the last user's years experience default value from DB.
    handleSetValue(id)(value !== undefined ? value : getOverallExYearWords(formValues.overallEx || ''));
  };

  // Handles the transform of requirements values to be valid before form's submitting.
  const handleRequirements = (minMaxValues: MinMaxInputsOption[]) => {
    const requirements = transformRequirements(minMaxValues);
    setFormValues((pre) => {
      return {
        ...pre,
        requirements: requirements
      };
    });
  };

  // Handles the transform of excludedRequirements values to be valid before form's submitting.
  const handleExcludedRequirements = (values: string[]) => {
    const excludedRequirements = transformExcludedRequirements(values);
    setFormValues((pre) => {
      return {
        ...pre,
        excludedRequirements: excludedRequirements
      };
    });
  };
  // Handles the transform of userQuery values to be valid before form's submitting.
  const handleSelectionInput: <V extends string>(id: string) => (value: V | V[]) => void =
    (id) => (value) => {
      const extractValue = Array.isArray(value) ? value.join(',') : value;

      setFormValues((pre) => {
        return {
          ...pre,
          userQuery: {
            ...pre.userQuery,
            [id]: extractValue
          }
        };
      });
    };

  // Pass the callback that execute during the submit event and execute the submit event.
  const handleUserProfileFormSubmit = onSubmit(async (values) => {
    const { hash, ...restValue } = values.userQuery;
    let response;

    //Check for valid location and position fields that their values are not empty.
    if (!restValue.location) {
      response = getResMessage('USER_PROFILE_FORM_LOCATION_IS_EMPTY');
      toast(response.message);
      return response;
    }
    if (!restValue.position) {
      response = getResMessage('USER_PROFILE_FORM_POSITION_IS_EMPTY');
      toast(response.message);
      return response;
    }

    //Set the current input's years experience by the words of overallEx.
    values['overallEx'] = getOverallExYearNum(values.overallEx || '');

    //If url hash query exist,the current submitting is for editing. Else the current submitting is for adding a new query.
    const curValues = router.query.hash
      ? values
      : {
          ...values,
          userQuery: restValue
        };
    const result = await updateUser(user?.userID || '', curValues);
    await mutate(`/api/users/${user?.userID}`);
    toast(result.message);
    return result;
  });

  return {
    formValues: transformDefaultFormValues(formValues),
    formState,
    handleOverallExperience,
    handleUserProfileFormSubmit,
    handleRequirements,
    handleExcludedRequirements,
    handleSelectionInput,
    onChange
  };
}

export default useProfileForm;

export type ProfileFormComponentsProps<T> = T & ReturnType<typeof useProfileForm>;
